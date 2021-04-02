//import { MongoDataSource } from 'apollo-datasource-mongodb'
import Collection from '../collection';
import { ObjectId } from 'mongodb';
import { IItemDependency, IItemDependencyValues, IItemArgs, IItemModel, IItemFilter } from '@pbr-simcity/types/types';

class ItemRepository extends Collection {

  async getAll() {
    const docs = this.collection.find();
    return await docs.toArray();
  }

  async findManyByFilter(args: IItemArgs): Promise<IItemModel[]> {

    //console.log(args);
    const order = args.order == 'desc' && 1 || -1;

    const sort = { [args.orderBy]: order };

    const match: IItemFilter = {};

    if (args.filter?.level) {
      match['level'] = {$lte: args.filter.level};
    }
    //console.log(sort);

    const docs = await this.collection.aggregate(
      [
        { $match: match },
        // { $match: {
        //   _id: new ObjectId(id)
        // }},
        ...this.pipeline,
        {
          $sort: sort
        }
      ]
    ).toArray();

    // const docs = await this.collection.findOne({_id: {$eq: new ObjectId(id)}});
    //return docs;


    return docs.map((p: IItemModel): IItemModel => {
      return {
        ...p,
        depends: p.depends.filter((p: any) => p.item)
      }
    })
  }


  async findManyByBuilding(building: ObjectId) {

    const docs = await this.collection.aggregate(
      [
        { $match: { building: {$eq: new ObjectId(building)}} },
        // { $match: {
        //   _id: new ObjectId(id)
        // }},
        ...this.pipeline,
      ]
    ).toArray();

    return await docs;
  }


  pipeline =  [
    { $unwind: {path: '$depends', "preserveNullAndEmptyArrays": true}},
    { $lookup: {
      from: 'building',
      localField: 'building',
      foreignField: '_id',
      as: "building"
    }},
    { $unwind: '$building'},
    { $lookup: {
      from: 'item',
      localField: 'depends.item',
      foreignField: '_id',
      as:"depends.item"
    }},
    { $unwind: {path: '$depends.item', "preserveNullAndEmptyArrays": true}},
    { $unwind: {path: '$depends.item.depends', "preserveNullAndEmptyArrays": true}},
    { $lookup: {
      from: 'building',
      localField: 'depends.item.building',
      foreignField: '_id',
      as: "depends.item.building"
    }},
    { $unwind: {path: '$depends.item.building',  "preserveNullAndEmptyArrays": true}},
    { $lookup: {
      from: 'item',
      localField: 'depends.item.depends.item',
      foreignField: '_id',
      as:"depends.item.depends.item"
    }},
    { $unwind: {path: '$depends.item.depends.item', preserveNullAndEmptyArrays: true}},
    { $lookup: {
      from: 'building',
      localField: 'depends.item.depends.item.building',
      foreignField: '_id',
      as: "depends.item.depends.item.building"
    }},
    { $unwind: {path: '$depends.item.depends.item.building', preserveNullAndEmptyArrays: true}},
    { $group: {
      _id: "$_id",
      name: {$first: "$name"},
      building: {$first: "$building"},
      slug: {$first: "$slug"},
      productionTime: {$first: "$productionTime"},
      maxValue: {$first: "$maxValue"},
      level: {$first: "$level"},
      depends: {$addToSet: {
        item: "$depends.item._id",
        quantity: "$depends.quantity",
        billTimeLvl2: {
        $max: {
          $cond:
            {
              if: '$depends.item.building.parallel',
              then: "$depends.item.productionTime",
              else:  { $multiply: ["$depends.item.productionTime", "$depends.quantity"]}
            }
          }
        },
        billTimeLvl3: {
          $max: {
            $cond:
              {
                if: '$depends.item.depends.item.building.parallel',
                then: "$depends.item.depends.item.productionTime",
                else:  { $multiply: ["$depends.item.depends.item.productionTime", "$depends.item.depends.quantity"]}
              }
          }
        },
      }},
      //billCost: {$sum: {$multiply: ["$depends.item.maxValue", "$depends.quantity"]}},
    }},
    { $unwind: '$depends'},
    { $project: {
      name: 1,
      slug: 1,
      building: "$building._id",
      productionTime: 1,
      level: 1,
      maxValue: 1,
      depends: 1,
      billTime: {$max: {$sum: ["$depends.billTimeLvl2", "$depends.billTimeLvl3"]}}
    }},
    { $group: {
      _id: "$_id",
      name: {$first: "$name"},
      level: {$first: "$level"},
      building: {$first: "$building"},
      slug: {$first: "$slug"},
      productionTime: {$first: "$productionTime"},
      maxValue: {$first: "$maxValue"},
      depends: {$addToSet: {
        item: "$depends.item",
        quantity: "$depends.quantity",
      }},
      billTime: {$max: "$billTime"},
      //billCost: {$sum: {$multiply: ["$depends.item.maxValue", "$depends.quantity"]}},
    }},
    { $unwind: {path: '$depends', preserveNullAndEmptyArrays: true}},
    { $lookup: {
      from: 'item',
      localField: 'depends.item',
      foreignField: '_id',
      as:"depends.item"
    }},
    { $unwind: {path: '$depends.item',  preserveNullAndEmptyArrays: true}},
    { $group: {
      _id: "$_id",
      name: {$first: "$name"},
      level: {$first: "$level"},
      building: {$first: "$building"},
      slug: {$first: "$slug"},
      productionTime:  {$first: "$productionTime"},
      maxValue: {$first: "$maxValue"},
      depends: {$addToSet: {
        item: "$depends.item._id",
        quantity: "$depends.quantity"
      }},
      billTime: {$first: "$billTime"},
      billCost: {$sum: {$multiply: ["$depends.item.maxValue", "$depends.quantity"]}},
    //   depends: {$push: "$depends"},
    }},
    { $addFields: {
      profitOwnProduction: { $subtract: [ "$maxValue", "$billCost"  ] },
    }},
    { $project: {
        //dependsLvl2: "$dependsItem.depends",
        name: 1,
        slug: 1,
        productionTime: 1,
        level: 1,
        building: 1,
        maxValue: 1,
        profitOwnProduction: 1,
        profitOwnByMinute: { $divide: [ "$profitOwnProduction", "$productionTime"  ] },

        billCost: 1,
        billTime: 1,
        //billTime: {$max: {$sum: ['$billTimeLvl2', "$billTimeLvl3"]}},
        depends: 1,
      } },
      { $addFields: {
        //profitOwnProduction: { $subtract: [ "$maxValue", "$billCost"  ] },
        profitOwnByHour: { $multiply: [ "$profitOwnByMinute", 60  ] },
      }},
  ];

  // async findByIdV2(id: ObjectId) {


  //   const docs = await this.collection.aggregate(
  //     [
  //       { $match: {
  //         _id: new ObjectId(id)
  //       }},
  //       ...this.pipeline
  //     ]

  //   ).toArray();

  //   return docs[0];
  //   //return docs[0] || null;
  // }

  async findById(id: ObjectId): Promise<IItemModel | null> {
    const docs = await this.collection.aggregate(
      [
        { $match: {
          _id: new ObjectId(id)
        }},
        ...this.pipeline
      ]
    ).toArray();

    // const docs = await this.collection.findOne({_id: {$eq: new ObjectId(id)}});
    //return docs;
    const model: IItemModel | undefined = docs[0];

    if (!model) {
      return null;
    }

    return {
      ...model,
      depends: model.depends.filter((p: any) => p.item)
    }
  }


  async findOneBySlug(slug: string): Promise<IItemModel | null> {
    const docs = await this.collection.aggregate(
      [
        { $match: {
          slug
        }},
        ...this.pipeline
      ]
    ).toArray();



    // const docs = await this.collection.findOne({_id: {$eq: new ObjectId(id)}});
    //return docs;
    //return docs[0] || null;
    //const docs = await this.collection.findOne({slug: {$eq: slug}});

    const model: IItemModel | undefined = docs[0];

    if (!model) {
      return null;
    }

    return {
      ...model,
      depends: model.depends.filter((p: any) => p.item)
    }
  }

  async findItemDependsById(id: ObjectId) {


    const docs = await this.collection.find({"depends.item": {$eq: new ObjectId(id)}});

    return docs.toArray();
    //return [];
  }

  async findItemDependencyCost(items: IItemDependency[]): Promise<IItemDependencyValues> {

    const itemsPromise = items.map(async (p) => {
      return {
        item: await this.findById(p.item),
        quantity: p.quantity,
      }
    });

    const itemsDeps = await Promise.all(itemsPromise);



    const cost = itemsDeps.reduce(function(a: number, b: IItemDependency): number {
      const maxValue = b?.item?.maxValue || 0;
        return a + (maxValue * b.quantity);
    }, 0);

    const time = itemsDeps.reduce(function(a: number, b: IItemDependency): number {
      const maxTime = b?.item?.productionTime || 0;
      return a + maxTime;
    }, 0);

    return {
      cost,
      time,
    }
  }

}

export default ItemRepository;

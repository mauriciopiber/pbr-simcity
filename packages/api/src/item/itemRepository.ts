//import { MongoDataSource } from 'apollo-datasource-mongodb'
import Collection from '../collection';
import { ObjectId } from 'mongodb';
import { IItemDependency, IItemDependencyValues } from '@pbr-simcity/types/types';

class ItemRepository extends Collection {

  async getAll() {
    const docs = this.collection.find();
    return await docs.toArray();
  }


  async findByBuilding(building: ObjectId) {


    const docs = this.collection.find({ building: {$eq: new ObjectId(building)}} );
    return await docs.toArray();

  }

  async findByIdV2(id: ObjectId) {


    const docs = await this.collection.aggregate(
      [
        { $match: {
          _id: new ObjectId(id)
        }},
        { $unwind: '$depends'},
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
        { $unwind: '$depends.item'},
        { $unwind: {path: '$depends.item.depends', "preserveNullAndEmptyArrays": true}},
        // { $group : {
        //   "_id": "_id",
        //   "name": {$first: "$name"},
        //   "depends": {$push: "$depends"},
        //   "slug": {$first: "$slug"},
        //   "level": {$first: "$level"},
        //   "maxValue": {$first: "$maxValue"},
        //   "building": {$first: "$building"},
        // }},
        { $lookup: {
          from: 'building',
          localField: 'depends.item.building',
          foreignField: '_id',
          as: "depends.item.building"
        }},
        { $unwind: '$depends.item.building'},
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
          slug: {$first: "$slug"},
          productionTime: {$first: "$productionTime"},
          maxValue: {$first: "$maxValue"},
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
          productionTime: 1,
          maxValue: 1,
          depends: 1,
          billTime: {$max: {$sum: ["$depends.billTimeLvl2", "$depends.billTimeLvl3"]}}
        }},
        { $group: {
          _id: "$_id",
          name: {$first: "$name"},
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
        // { $lookup: {
        //   from: 'item',
        //   localField: 'depends.item',
        //   foreignField: '_id',
        //   as:"depends.item"
        // }},
        // { $unwind: '$depends.item'},
        // { $group: {
        //   _id: "$_id",
        //   name: {$first: "$name"},
        //   slug: {$first: "$slug"},
        //   productionTime:  {$first: "$productionTime"},
        //   maxValue: {$first: "$maxValue"},
        //   depends: {$addToSet: {
        //     item: "$depends.item._id",
        //     quantity: "$depends.quantity"
        //   }},
        //   billTimeLvl2: {$first: "$billTimeLvl2"},
        //   billTimeLvl3: {$first: "$billTimeLvl3"},
        //   billCost: {$sum: {$multiply: ["$depends.item.maxValue", "$depends.quantity"]}},
        // //   depends: {$push: "$depends"},
        // }},
        // { $project: {
        //     //dependsLvl2: "$dependsItem.depends",
        //     name: 1,
        //     slug: 1,
        //     productionTime: 1,
        //     maxValue: 1,
        //     billCost: 1,
        //     profitOwnProduction: { $subtract: [ "$maxValue", "$billCost"  ] },
        //     billTime: {$max: {$sum: ['$billTimeLvl2', "$billTimeLvl3"]}},
        //     depends: 1,
        //   } },
      ]
    ).toArray();

    return docs[0];
    //return docs[0] || null;
  }

  async findById(id: ObjectId) {


    const docs = await this.collection.aggregate(
      [
        { $match: {
          _id: new ObjectId(id)
        }},
      ]
    ).toArray();
    // console.log(id);
    // const docs = await this.collection.findOne({_id: {$eq: new ObjectId(id)}});
    //return docs;
    return docs[0] || null;
  }


  async findBySlug(slug: string) {

    const docs = await this.collection.findOne({slug: {$eq: slug}});
    return docs;
  }

  async findItemDependsById(id: ObjectId) {
    console.log(id);

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

    console.log(itemsDeps);

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

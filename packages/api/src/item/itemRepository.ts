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
        { $unwind: '$depends.item.depends'},
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
        { $unwind: '$depends.item.depends.item'},
        { $lookup: {
          from: 'building',
          localField: 'depends.item.depends.item.building',
          foreignField: '_id',
          as: "depends.item.depends.item.building"
        }},
        { $unwind: '$depends.item.depends.item.building'},
        { $group: {
          _id: "$_id",
          name: {$first: "$name"},
          slug: {$first: "$slug"},
          productionTime: {$first: "$productionTime"},
          maxValue: {$first: "$maxValue"},
          depends: {$addToSet: {
            item: "$depends.item._id",
            quantity: "$depends.quantity"
          }},
          //billCost: {$sum: {$multiply: ["$depends.item.maxValue", "$depends.quantity"]}},
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
        { $unwind: '$depends'},
        { $lookup: {
          from: 'item',
          localField: 'depends.item',
          foreignField: '_id',
          as:"depends.item"
        }},
        { $unwind: '$depends.item'},
        { $group: {
          _id: "$_id",
          name: {$first: "$name"},
          slug: {$first: "$slug"},
          productionTime:  {$first: "$productionTime"},
          maxValue: {$first: "$maxValue"},
          depends: {$addToSet: {
            item: "$depends.item._id",
            quantity: "$depends.quantity"
          }},
          billTimeLvl2: {$first: "$billTimeLvl2"},
          billTimeLvl3: {$first: "$billTimeLvl3"},
          billCost: {$sum: {$multiply: ["$depends.item.maxValue", "$depends.quantity"]}},
        //   depends: {$push: "$depends"},
        }},
        { $project: {
            //dependsLvl2: "$dependsItem.depends",
            name: 1,
            slug: 1,
            productionTime: 1,
            maxValue: 1,
            billCost: 1,
            profitOwnProduction: { $subtract: [ "$maxValue", "$billCost"  ] },
            billTime: {$max: {$sum: ['$billTimeLvl2', "$billTimeLvl3"]}},
            depends: 1,
          } },

        // { $unwind: '$depends.dependsItemLvl2.buildingList'},
        // { $lookup: {
        //   from: 'item',
        //   localField: 'depends.dependsItemLvl2.depends.item',
        //   foreignField: '_id',
        //   as:"depends.dependsItemLvl3"
        // }},
        // { $unwind: '$depends.dependsItemLvl3'},
        // { $lookup: {
        //   from: 'building',
        //   localField: 'depends.dependsItemLvl3.building',
        //   foreignField: '_id',
        //   as: "depends.dependsItemLvl3.buildingList"
        // }},
        // { $unwind: '$depends.dependsItemLvl3.buildingList'},
        // { $unwind: '$depends.dependsItemLvl2.depends'},
        // { $group: {
        //   _id: "$_id",
        // //   name: {$first: "$name"},
        // //   slug: {$first: "$slug"},
        // //   productionTime: {$first: "$productionTime"},
        // //   maxValue: {$first: "$maxValue"},
        // //   // billCost: {$sum: {$multiply: ["$depends.dependsItemLvl2.maxValue", "$depends.quantity"]}},
        // //   billTimeLvl2: {
        // //     $max: {
        // //       $cond:
        // //         {
        // //           if: '$depends.billTimeLvl2.buildingList.parallel',
        // //           then: "$depends.dependsItemLvl2.productionTime",
        // //           else:  { $multiply: ["$depends.dependsItemLvl2.productionTime", "$depends.quantity"]}
        // //         }
        // //     }
        // //   },
        //   billTimeLvl3: {
        //     $max: {
        //       $cond:
        //         {
        //           if: '$depends.billTimeLvl3.buildingList.parallel',
        //           then: "$depends.dependsItemLvl3.productionTime",
        //           else:  { $multiply: ["$depends.dependsItemLvl3.productionTime", "$depends.dependsItemLvl2.depends.quantity"]}
        //         }
        //     }
        //   },
        // //   depends: {$push: "$depends"},
        // }},
        //{ $unwind: '$depends.dependsItemLvl3.buildingList'},


        // { $addFields: {
        //   ['depends.dependsItemLvl2.billTime']: {
            //$max: }
        // }},
        // { $group: {
        //   _id: "$_id",
        //   name: {$first: "$name"},
        //   slug: {$first: "$slug"},
        //   productionTime: {$first: "$productionTime"},
        //   maxValue: {$first: "$maxValue"},
        //   billCost: {$sum: {$multiply: ["$depends.dependsItemLvl2.maxValue", "$depends.quantity"]}},
        //   billTimeLvl2: {$max: {$sum: ["$depends.dependsItemLvl2.productionTime", "$depends.dependsItemLvl2.billTime"]}},
        //   billTimeLvl3: {$max: {$sum: ["$depends.dependsItemLvl3.productionTime", "$depends.dependsItemLvl3.billTime"]}},
        //   depends: {$push: "$depends"},
        // }},
        // { $project: {
        //   //dependsLvl2: "$dependsItem.depends",
        //   name: 1,
        //   slug: 1,
        //   productionTime: 1,
        //   maxValue: 1,
        //   billCost: 1,
        //   profitOwnProduction: { $subtract: [ "$maxValue", "$billCost"  ] },
        //   //billTime: 1,
        //   billTime: {$max: {$sum: ['$billTimeLvl2', "$billTimeLvl3"]}},
        //   //billTimeLvl2: 1,
        //   //billTimeLvl3: 1,
        //   depends: 1,
        // } },
        // { $project: {
        //   profitOwnProduction: { $subtract: [ "$maxValue", "$billCost"  ] },
        //   name: 1,
        //   slug: 1,
        //   productionTime: 1,
        //   maxValue: 1,
        //   billCost: 1,
        //   billTime: 1,
        //   depends: 1,
        //   building: 1,
        // }}
        // { $unwind: "$dependsLvl2" },
        // //{ $unwind: '$depends'},
        // { $group: {
        //   _id: "$_id",
        //   name: {$first: "$name"},
        //   slug: {$first: "$slug"},
        //   productionTime: {$first: "$productionTime"},
        //   maxValue: {$first: "$maxValue"},
        //   billCost: {$sum: {$multiply: ["$dependsItem.maxValue", "$depends.quantity"]}},
        //   billTime: {$max: "$dependsItem.productionTime"},
        //   depends: {$push: "$depends"},
        //   dependsLvl2: {$push: "$dependsLvl2"},
        // }},

      ]
    ).toArray();
    // console.log(id);
    // const docs = await this.collection.findOne({_id: {$eq: new ObjectId(id)}});
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

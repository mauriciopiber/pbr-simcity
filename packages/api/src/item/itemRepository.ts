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
          from: 'item',
          localField: 'depends.item',
          foreignField: '_id',
          as:"depends.dependsItemLvl2"
        }},
        { $unwind: '$depends.dependsItemLvl2'},
        { $lookup: {
          from: 'item',
          localField: 'depends.dependsItemLvl2.depends.item',
          foreignField: '_id',
          as:"depends.dependsItemLvl3"
        }},
        { $addFields: {
          ['depends.dependsItemLvl2.billTime']: {$max: ['$depends.dependsItemLvl3.productionTime']}
        }},
        { $group: {
          _id: "$_id",
          name: {$first: "$name"},
          slug: {$first: "$slug"},
          productionTime: {$first: "$productionTime"},
          maxValue: {$first: "$maxValue"},
          billCost: {$sum: {$multiply: ["$depends.dependsItemLvl2.maxValue", "$depends.quantity"]}},
          billTimeLvl2: {$max: {$sum: ["$depends.dependsItemLvl2.productionTime", "$depends.dependsItemLvl2.billTime"]}},
          billTimeLvl3: {$max: {$sum: ["$depends.dependsItemLvl3.productionTime", "$depends.dependsItemLvl3.billTime"]}},
          depends: {$push: "$depends"},
        }},
        { $project: {
          //dependsLvl2: "$dependsItem.depends",
          name: 1,
          slug: 1,
          productionTime: 1,
          maxValue: 1,
          billCost: 1,
          profitOwnProduction: { $subtract: [ "$maxValue", "$billCost"  ] },
          //billTime: 1,
          billTime: {$max: {$sum: ['$billTimeLvl2', "$billTimeLvl3"]}},
          //billTimeLvl2: 1,
          //billTimeLvl3: 1,
          depends: 1,
        } },
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

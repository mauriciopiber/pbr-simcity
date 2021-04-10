// import { MongoDataSource } from 'apollo-datasource-mongodb'
import { ObjectId } from 'mongodb';
import Collection from '@pbr-simcity/api/src/collection';

class ProfitRepository extends Collection {
  aggregate = [
    {
      $lookup: {
        from: 'profitItem',
        localField: '_id',
        foreignField: 'profit',
        as: 'items',
      },
    },
    { $unwind: { path: '$items', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'item',
        localField: 'items.item',
        foreignField: '_id',
        as: 'items.itemObj',
      },
    },
    { $unwind: { path: '$items.itemObj', preserveNullAndEmptyArrays: true } },
    {
      $project: {
        name: 1,
        items: {
          _id: '$items._id',
          item: '$items.itemObj',
        },
      },
    },
    {
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        items: { $push: '$items' },
      },
    },
  ];

  async getAll() {
    const docs = this.collection.aggregate(
      [...this.aggregate],
    );

    const data = await docs.toArray();

    return data;
  }

  async findById(id: ObjectId) {
    const docs = await this.collection.aggregate(
      [
        ...this.aggregate,
        { $match: { _id: new ObjectId(id) } },
      ],
    ).toArray();

    console.log(docs, id);
    return docs[0];
  }

  async addProfit(args: any) {
    const docs = await this.collection.insertOne(args);

    const { ops } = docs;

    const [doc] = ops;
    return doc;
  }

  async editProfit(args: any) {
    const { _id, ...rest } = args;

    const filter = { _id: { $eq: new ObjectId(_id) } };
    const data = {
      $set: rest,
    };

    await this.collection.updateOne(filter, data);

    return {
      _id,
      ...rest,
    };
  }

  async delProfit(id: ObjectId) {
    const filter = { _id: { $eq: new ObjectId(id) } };
    await this.collection.deleteOne(filter);
    return id;
  }
}

export default ProfitRepository;

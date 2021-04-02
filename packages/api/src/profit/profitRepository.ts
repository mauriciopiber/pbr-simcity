// import { MongoDataSource } from 'apollo-datasource-mongodb'
import { ObjectId } from 'mongodb';
import Collection from '../collection';

class ProfitRepository extends Collection {
  async getAll() {
    const docs = this.collection.find();
    return await docs.toArray();
  }

  async findById(id: ObjectId) {
    const docs = await this.collection.findOne({
      _id: { $eq: new ObjectId(id) },
    });
    return docs;
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

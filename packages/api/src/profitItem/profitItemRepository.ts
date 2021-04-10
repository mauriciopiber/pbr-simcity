// import { MongoDataSource } from 'apollo-datasource-mongodb'
import { ObjectId } from 'mongodb';
import Collection from '@pbr-simcity/api/src/collection';

class ProfitItemRepository extends Collection {
  async getAll() {
    const docs = this.collection.find();
    return docs.toArray();
  }

  async findById(id: ObjectId) {
    const docs = await this.collection.findOne({
      _id: { $eq: new ObjectId(id) },
    });
    return docs;
  }

  async addProfitItem(profit: string, item: string) {
    //    console.log(args);
    const docs = await this.collection.insertOne({
      profit: new ObjectId(profit),
      item: new ObjectId(item),
      // profit,
      // item,
    });

    const { ops } = docs;

    const [doc] = ops;
    return doc;
  }

  async removeById(_id: string) {
    const docs = await this.collection.deleteOne({
      _id: { $eq: new ObjectId(_id) },
    });

    console.log(docs);
    return _id;
  }
}

export default ProfitItemRepository;

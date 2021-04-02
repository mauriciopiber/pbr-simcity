//import { MongoDataSource } from 'apollo-datasource-mongodb'
import Collection from '../collection';
import { ObjectId } from 'mongodb';

class BuildingRepository extends Collection {
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

  async findOneBySlug(slug: string) {
    const docs = await this.collection.findOne({ slug: { $eq: slug } });
    return docs;
  }
}

export default BuildingRepository;

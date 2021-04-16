// import { MongoDataSource } from 'apollo-datasource-mongodb'
import { ObjectId } from 'mongodb';
import Collection from '@pbr-simcity/api/src/collection';
import { IBuildingModel } from '@pbr-simcity/types/types';

class BuildingRepository extends Collection {
  async getAll(): Promise<IBuildingModel[]> {
    const docs = this.collection.find();
    return docs.toArray();
  }

  async findById(id: ObjectId): Promise<IBuildingModel> {
    const docs = await this.collection.findOne({
      _id: { $eq: new ObjectId(id) },
    });
    return docs;
  }

  async findOneBySlug(slug: string): Promise<IBuildingModel> {
    const docs = await this.collection.findOne({ slug: { $eq: slug } });
    return docs;
  }
}

export default BuildingRepository;

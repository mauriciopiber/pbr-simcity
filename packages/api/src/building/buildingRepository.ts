// import { MongoDataSource } from 'apollo-datasource-mongodb'
import { ObjectId } from 'mongodb';
import Collection from '@pbr-simcity/api/src/collection';
import { IBuildingModel, IBuildingRepository } from '@pbr-simcity/types/types';

class BuildingRepository extends Collection implements IBuildingRepository {
  async findAll(): Promise<IBuildingModel[]> {
    const docs = this.collection.find();
    return docs.toArray();
  }

  async findOneById(id: string): Promise<IBuildingModel> {
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

// import { MongoDataSource } from 'apollo-datasource-mongodb'
import { ObjectId } from 'mongodb';
import Collection from '@pbr-simcity/api/src/collection';
import { IBuildingModel, IBuildingDoc } from '@pbr-simcity/types/types';

class BuildingRepository extends Collection {
  /**
   * Model
   */
  async findAll(): Promise<IBuildingModel[]> {
    const docs = this.collection.find();
    return docs.toArray();
  }

  async findOneBySlug(slug: string): Promise<IBuildingModel> {
    const docs = await this.collection.findOne({ slug: { $eq: slug } });
    return docs;
  }

  async findOneById(id: ObjectId): Promise<IBuildingModel> {
    const docs = await this.collection.findOne({
      _id: { $eq: new ObjectId(id) },
    });
    return docs;
  }

  /** Docs */

  async findOneDocBySlug(slug: string): Promise<IBuildingDoc | null> {
    const docs = await this.collection.findOne({ slug });
    return docs;
  }

  async findAllDocs(): Promise<IBuildingDoc[]> {
    const docs = this.collection.find();
    return docs.toArray();
  }
}

export default BuildingRepository;

//import { MongoDataSource } from 'apollo-datasource-mongodb'
import Collection from '../collection';
import { ObjectId } from 'mongodb';

class ItemRepository extends Collection {

  async getAll() {
    const docs = this.collection.find();
    return await docs.toArray();
  }

  async findByBuilding(building: ObjectId) {


    const docs = this.collection.find({ building: {$eq: new ObjectId(building)}} );
    return await docs.toArray();

  }

  async findById(id: ObjectId) {
    console.log(id);
    const docs = await this.collection.findOne({_id: {$eq: new ObjectId(id)}});
    return docs;
  }

  async findItemDependsById(id: ObjectId) {
    console.log(id);

    const docs = await this.collection.find({"depends.item": {$eq: new ObjectId(id)}});

    return docs.toArray();
    //return [];

  }
}

export default ItemRepository;

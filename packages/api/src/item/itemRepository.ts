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

  async findById(id: ObjectId) {
    console.log(id);
    const docs = await this.collection.findOne({_id: {$eq: new ObjectId(id)}});
    return docs;
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

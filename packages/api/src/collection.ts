import { MongoDataSource } from 'apollo-datasource-mongodb';

class Collection extends MongoDataSource<any> {
  constructor(collection: any) {
    super(collection);

    this.collection = collection;
  }
}

export default Collection;

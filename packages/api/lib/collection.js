"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_datasource_mongodb_1 = require("apollo-datasource-mongodb");
class Collection extends apollo_datasource_mongodb_1.MongoDataSource {
    constructor(collection) {
        super(collection);
        this.collection = collection;
    }
}
exports.default = Collection;

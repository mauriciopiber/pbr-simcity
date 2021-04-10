"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { MongoDataSource } from 'apollo-datasource-mongodb'
const mongodb_1 = require("mongodb");
const collection_1 = __importDefault(require("../collection"));
class ProfitItemRepository extends collection_1.default {
    async getAll() {
        const docs = this.collection.find();
        return docs.toArray();
    }
    async findById(id) {
        const docs = await this.collection.findOne({
            _id: { $eq: new mongodb_1.ObjectId(id) },
        });
        return docs;
    }
    async addProfitItem(profit, item) {
        //    console.log(args);
        const docs = await this.collection.insertOne({
            profit: new mongodb_1.ObjectId(profit),
            item: new mongodb_1.ObjectId(item),
            // profit,
            // item,
        });
        const { ops } = docs;
        const [doc] = ops;
        return doc;
    }
    async removeById(_id) {
        const docs = await this.collection.deleteOne({
            _id: { $eq: new mongodb_1.ObjectId(_id) },
        });
        console.log(docs);
        return _id;
    }
}
exports.default = ProfitItemRepository;

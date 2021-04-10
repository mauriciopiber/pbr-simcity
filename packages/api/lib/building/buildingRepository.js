"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { MongoDataSource } from 'apollo-datasource-mongodb'
const mongodb_1 = require("mongodb");
const collection_1 = __importDefault(require("../collection"));
class BuildingRepository extends collection_1.default {
    async getAll() {
        const docs = this.collection.find();
        return await docs.toArray();
    }
    async findById(id) {
        const docs = await this.collection.findOne({
            _id: { $eq: new mongodb_1.ObjectId(id) },
        });
        return docs;
    }
    async findOneBySlug(slug) {
        const docs = await this.collection.findOne({ slug: { $eq: slug } });
        return docs;
    }
}
exports.default = BuildingRepository;

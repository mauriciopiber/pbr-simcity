"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { MongoDataSource } from 'apollo-datasource-mongodb'
const mongodb_1 = require("mongodb");
const collection_1 = __importDefault(require("../collection"));
class ProfitRepository extends collection_1.default {
    constructor() {
        super(...arguments);
        this.aggregate = [
            {
                $lookup: {
                    from: 'profitItem',
                    localField: '_id',
                    foreignField: 'profit',
                    as: 'items',
                },
            },
            { $unwind: { path: '$items', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'item',
                    localField: 'items.item',
                    foreignField: '_id',
                    as: 'items.itemObj',
                },
            },
            { $unwind: { path: '$items.itemObj', preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    name: 1,
                    items: {
                        _id: '$items._id',
                        item: '$items.itemObj',
                    },
                },
            },
            {
                $group: {
                    _id: '$_id',
                    name: { $first: '$name' },
                    items: { $push: '$items' },
                },
            },
        ];
    }
    async getAll() {
        const docs = this.collection.aggregate([...this.aggregate]);
        const data = await docs.toArray();
        return data;
    }
    async findById(id) {
        const docs = await this.collection.aggregate([
            ...this.aggregate,
            { $match: { _id: new mongodb_1.ObjectId(id) } },
        ]).toArray();
        console.log(docs, id);
        return docs[0];
    }
    async addProfit(args) {
        const docs = await this.collection.insertOne(args);
        const { ops } = docs;
        const [doc] = ops;
        return doc;
    }
    async editProfit(args) {
        const { _id } = args, rest = __rest(args, ["_id"]);
        const filter = { _id: { $eq: new mongodb_1.ObjectId(_id) } };
        const data = {
            $set: rest,
        };
        await this.collection.updateOne(filter, data);
        return Object.assign({ _id }, rest);
    }
    async delProfit(id) {
        const filter = { _id: { $eq: new mongodb_1.ObjectId(id) } };
        await this.collection.deleteOne(filter);
        return id;
    }
}
exports.default = ProfitRepository;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const typeDefs = graphql_tag_1.default `
  type Profit {
    _id: ObjectID!
    name: String!
    items: [ProfitItem]
  }

  type ProfitItem {
    _id: ObjectID
    item: Item
  }

  type Query {
    profits: [Profit]
    profit(_id: ObjectID!): Profit!
  }


  type Mutation {
    addProfit(name: String!): Profit!
    addItemToProfit(profit: ObjectID! item: ObjectID): ProfitItem!
    delItemFromProfit(_id: ObjectID!): ObjectID!
    editProfit(_id: ObjectID!, name: String!): Profit!
    delProfit(_id: ObjectID!): ObjectID!
  }
`;
exports.default = typeDefs;

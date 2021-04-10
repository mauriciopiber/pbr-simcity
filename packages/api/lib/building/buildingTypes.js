"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const typeDefs = graphql_tag_1.default `
  type Building {
    _id: ObjectID!
    name: String!
    slots: Int!
    parallel: Boolean!
    slug: String!
    nextSlot: Int
    items: [Item]!
  }

  type Query {
    buildings: [Building]
    building(_id: ObjectID, slug: String): Building!
  }
`;
exports.default = typeDefs;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const typeDefs = graphql_tag_1.default `
  type ItemDepends {
    item: Item!
    quantity: PositiveInt!
  }

  type ItemProfit {
    cost: Int!
    profit: Int!
    profitByMinute: PositiveFloat!
    profitByHour: PositiveFloat!
  }

  type Item {
    _id: ObjectID!
    name: String!
    productionTime: PositiveInt!
    maxValue: PositiveInt!
    building: Building!
    level: PositiveInt!
    billCost: Int!
    profitOwnProduction: Int!
    profitOwnByMinute: Float!
    profitOwnByHour: Float!
    profit: ItemProfit!
    slug: String!
    usedIn: [Item]
    depends: [ItemDepends]
  }

  input ItemFilter {
    level: Int!
  }

  type Query {
    items(order: String, orderBy: String, filter: ItemFilter): [Item]
    item(_id: ObjectID, slug: String): Item!
  }
`;
exports.default = typeDefs;

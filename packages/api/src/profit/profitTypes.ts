import gql from 'graphql-tag';

const typeDefs = gql`
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
    addItemToProfit(profit: ObjectID!, item: ObjectID): ProfitItem!
    delItemFromProfit(_id: ObjectID!): ObjectID!
    editProfit(_id: ObjectID!, name: String!): Profit!
    delProfit(_id: ObjectID!): ObjectID!
  }
`;

export default typeDefs;

import gql from 'graphql-tag';

const typeDefs = gql`

  type Profit {
    _id: ObjectID!
    name: String!
  }

  type Query {
    profits: [Profit]
    profit(_id: ObjectID!): Profit!
  }

  type Mutation {
    addProfit(name: String!): Profit!
    editProfit(_id: ObjectID!, name: String!): Profit!
    delProfit(_id: ObjectID!): ObjectID!
  }
`;

export default typeDefs;

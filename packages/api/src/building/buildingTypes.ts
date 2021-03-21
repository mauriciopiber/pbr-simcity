import gql from 'graphql-tag';

const typeDefs = gql`

  type Building {
    _id: ObjectID!
    name: String!
    slots: Int!
    parallel: Boolean!
    nextSlot: Int
    items: [Item]!
  }

  type Query {
    buildings: [Building]
    building(_id: ObjectID!): Building!
  }
`;

export default typeDefs;

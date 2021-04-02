import gql from 'graphql-tag';

const typeDefs = gql`

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

export default typeDefs;

import gql from 'graphql-tag';

const typeDefs = gql`


  type ItemDepends {
    item: Item!
    quantity: PositiveInt!
  }

  type Item {
    _id: ObjectID!
    name: String!
    productionTime: PositiveInt!
    maxValue: PositiveInt!
    building: Building!
    level: PositiveInt!
    usedIn: [Item]
    depends: [ItemDepends],
  }

  type Query {
    items: [Item]
    item(_id: ObjectID!): Item!
  }
`;

export default typeDefs;

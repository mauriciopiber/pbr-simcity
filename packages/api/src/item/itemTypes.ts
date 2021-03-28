import gql from 'graphql-tag';

const typeDefs = gql`


  type ItemDepends {
    item : Item!
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
    profit: ItemProfit!
    costMongo: Int!
    profitMongo: PositiveInt!
    slug: String!
    usedIn: [Item]
    depends: [ItemDepends],
  }

  type Query {
    items: [Item]
    item(_id: ObjectID, slug: String): Item!
  }
`;

export default typeDefs;

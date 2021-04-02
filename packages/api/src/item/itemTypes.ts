import gql from 'graphql-tag';

const typeDefs = gql`
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

export default typeDefs;

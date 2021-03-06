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
    billCost: Int!
    profitOwnProduction: Int!
    profitOwnByMinute: Float!
    profitOwnByHour: Float!
    billTime: Int!
    totalTime: Int!
    profitTotalByMinute: Float!
    profitTotalByHour: Float!
    slug: String!
    usedIn: [Item]
    depends: [ItemDepends]
  }

  input ItemFilter {
    level: Int!
  }

  type BuildingProfitSlot {
    slot: Int!
    item: Item!
    schedule: Int!
    start: Int!
    complete: Int!
  }

  type BuildingProfit {
    slug: String!
    name: String!
    slots: [BuildingProfitSlot]
  }

  type CycleProfit {
    startProduction: Int!
    endProduction: Int!
    slots: [BuildingProfitSlot]
    cycle: Int!
  }

  type ItemProfit {
    slug: String!
    buildings: [BuildingProfit]
    cycles: [CycleProfit]
  }

  type Query {
    items(order: String, orderBy: String, filter: ItemFilter): [Item]
    itemsByBuilding(
      building: String!
      order: String
      orderBy: String
      filter: ItemFilter
    ): [Item]
    itemsDependsByBuilding(
      building: String!
      order: String
      orderBy: String
      filter: ItemFilter
    ): [Item]
    itemsDependsByItems(
      slugs: [String]!
      order: String
      orderBy: String
      filter: ItemFilter
    ): [Item]
    itemsUsedByBuilding(
      building: String!
      order: String
      orderBy: String
      filter: ItemFilter
    ): [Item]
    itemsUsedByItems(
      slugs: [String]!
      order: String
      orderBy: String
      filter: ItemFilter
    ): [Item]
    item(
      _id: ObjectID,
      slug: String
      order: String
      orderBy: String
      filter: ItemFilter
    ): Item!
    itemProfit(slug: String!): ItemProfit!
  }
`;

export default typeDefs;

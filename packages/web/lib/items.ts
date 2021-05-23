import gql from 'graphql-tag';

export const QUERY_ITEMS_BY_BUILDING = gql`
  query(
    $building: String!
    $order: String!
    $orderBy: String!
    $filter: ItemFilter!
  ) {
    itemsByBuilding(
    building: $building
    order: $order
    orderBy: $orderBy
    filter: $filter
  ) {
    _id
    name
    maxValue
    productionTime
    level
    slug
    profitOwnProduction
    profitOwnByMinute
    profitOwnByHour
    billCost
    depends {
      item {
        _id
        name
        slug
      }
      quantity
    }
    usedIn {
      _id
      name
      slug
    }
    building {
      _id
      name
      slug
      items {
        _id
        name
        maxValue
      }
    }

  }}
`


export const QUERY_ITEMS_DEPEND_BY_BUILDING = gql`
  query(
    $building: String!
    $order: String!
    $orderBy: String!
    $filter: ItemFilter!
  ) {
    itemsDependsByBuilding(
    building: $building
    order: $order
    orderBy: $orderBy
    filter: $filter
  ) {
    _id
    name
    maxValue
    productionTime
    level
    slug
    profitOwnProduction
    profitOwnByMinute
    profitOwnByHour
    billCost
    depends {
      item {
        _id
        name
        slug
      }
      quantity
    }
    usedIn {
      _id
      name
      slug
    }
    building {
      _id
      name
      slug
      items {
        _id
        name
        maxValue
      }
    }

  }}
`

export const QUERY_ITEM_PROFIT = gql`
query(
  $slug: String!
) {
  itemProfit(slug: $slug) {
    slug
    buildings {
      slug
      name
      slots {
        slot
        item {
          _id
          slug
          name
        }
        schedule
        start
        complete
      }
    }
    cycles {
      startProduction
      endProduction
      slots {
        slot
        item {
          _id
          slug
          name
          building {
            _id
            slug
          }
        }
        schedule
        start
        complete
      }
      cycle
    }
  }
}
`


export const QUERY_ITEMS_USED_BY_BUILDING = gql`
  query(
    $building: String!
    $order: String!
    $orderBy: String!
    $filter: ItemFilter!
  ) {
    itemsUsedByBuilding(
    building: $building
    order: $order
    orderBy: $orderBy
    filter: $filter
  ) {
    _id
    name
    maxValue
    productionTime
    level
    slug
    profitOwnProduction
    profitOwnByMinute
    profitOwnByHour
    billCost
    usedIn {
      _id
      name
      slug
    }
    depends {
      item {
        _id
        name
        slug
      }
      quantity
    }
    building {
      _id
      name
      slug
      items {
        _id
        name
        maxValue
      }
    }

  }}
`


export const QUERY_ITEMS_USED_IN_ITEMS = gql`
query(
  $slugs: [String]!
  $order: String!
  $orderBy: String!
  $filter: ItemFilter!
) {
  itemsDependsByItems(
  slugs: $slugs
  order: $order
  orderBy: $orderBy
  filter: $filter
) {
  _id
  name
  maxValue
  productionTime
  level
  slug
  profitOwnProduction
  profitOwnByMinute
  profitOwnByHour
  billCost
  usedIn {
    _id
    name
    slug
  }
  depends {
    item {
      _id
      name
      slug
    }
    quantity
  }
  building {
    _id
    name
    slug
    items {
      _id
      name
      maxValue
    }
  }

}}
`


export const QUERY_ITEMS_USED_BY_ITEMS = gql`
query(
  $slugs: [String]!
  $order: String!
  $orderBy: String!
  $filter: ItemFilter!
) {
  itemsUsedByItems(
  slugs: $slugs
  order: $order
  orderBy: $orderBy
  filter: $filter
) {
  _id
  name
  maxValue
  productionTime
  level
  slug
  profitOwnProduction
  profitOwnByMinute
  profitOwnByHour
  billCost
  usedIn {
    _id
    name
    slug
  }
  depends {
    item {
      _id
      name
      slug
    }
    quantity
  }
  building {
    _id
    name
    slug
    items {
      _id
      name
      maxValue
    }
  }

}}
`

export const QUERY_ITEMS = gql`
  query(
    $order: String!
    $orderBy: String!
    $filter: ItemFilter!
  ) {
    items(
      order: $order
      orderBy: $orderBy
      filter: $filter
    ) {
      _id
      name
      maxValue
      productionTime
      level
      slug
      profitOwnProduction
      profitOwnByMinute
      profitOwnByHour
      billCost
      usedIn {
        _id
        name
        slug
      }
      depends {
        item {
          _id
          name
          slug
        }
        quantity
      }
      building {
        _id
        name
        slug
        items {
          _id
          name
          maxValue
        }
      }

    }
  }
`;

export const QUERY_ITEM = gql`
fragment itemDepends on Item {
  _id
  name
  maxValue
  slug
  productionTime
  building {
    _id
    name
    parallel
  }
}
  query Item(
    $slug: String
  ) {
    item(slug: $slug) {
      _id
      name
      maxValue
      slug
      productionTime
      level
      billTime
      billCost
      totalTime
      profitTotalByHour
      profitTotalByMinute
      depends {
        quantity
        item {
          ...itemDepends
        }
      }
      usedIn {
        ...itemDepends
      }
      building {
        _id
        name
        slug
        parallel
        items {
          _id
          name
          maxValue
        }
      }
    }
  }

`;

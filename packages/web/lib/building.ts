import gql from 'graphql-tag';


export const QUERY_BUILDINGS = gql`
query {
  buildings {
    _id
    name
    slots
    slug
    nextSlot
    parallel
    items {
      _id
      name
      slug
      maxValue
      productionTime
    }
  }
}
`

export const QUERY_BUILDING = gql`
  query Building(
    $slug: String!
  ) {
    building(slug: $slug) {
      _id,
      name
      slots
      nextSlot
      parallel
      items {
        _id
        name
        maxValue,
        slug,
        productionTime
        level
        billCost
        profitOwnProduction
        profitOwnByMinute
        profitOwnByHour
        usedIn {
          _id
          name
        }
      }
    }
  }
`

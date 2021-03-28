import gql from 'graphql-tag';


export const QUERY_BUILDINGS = gql`
query {
  buildings {
    _id
    name
    slots
    nextSlot
    parallel
    items {
      _id
      name
      slug
      maxValue,
      productionTime
    }
  }
}
`

export const QUERY_BUILDING = gql`
  query Building(
    $_id: ObjectID!
  ) {
    building(_id: $_id) {
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
      }
    }
  }
`

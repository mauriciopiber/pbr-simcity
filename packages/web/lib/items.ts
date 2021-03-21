import gql from 'graphql-tag';


export const QUERY_ITEMS = gql`
  query {
    items {
      _id
      name
      maxValue
      productionTime
      level
      building {
        _id
        name
        items {
          _id
          name
          maxValue
        }
      }

    }
  }
`

export const QUERY_ITEM = gql`
  query Item(
    $_id: ObjectID!
  ) {
    item(_id: $_id) {
      _id
      name
      maxValue,
      productionTime,
      level,
      usedIn {
        name
        maxValue
        productionTime
        level
      }
      building {
        _id
        name
        items {
          _id
          name
          maxValue
        }
      }
    }
  }

`

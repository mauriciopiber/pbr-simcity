import gql from 'graphql-tag';


export const QUERY_PROFITS = gql`
  query {
    profits {
      _id
      name
    }
  }
`

export const QUERY_PROFIT = gql`
  query Item(
    $_id: ObjectID!
  ) {
    profit(_id: $_id) {
      _id
      name
    }
  }

`

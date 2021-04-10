import gql from 'graphql-tag';

export const QUERY_PROFITS = gql`
  query {
    profits {
      _id
      name
    }
  }
`;

export const QUERY_PROFIT = gql`
  query Item(
    $_id: ObjectID!
  ) {
    profit(_id: $_id) {
      _id
      name
      items {
        _id
        item {
           _id
          slug
          name
        }

      }
    }
  }

`;

export const QUERY_PROFITS_PATHS = gql`
  query {
    profits {
      _id
    }
  }
`;


export const ADD_PROFIT = gql`
  mutation addProfit($name: String!) {
    addProfit(name: $name) {
      _id
      name
    }
  }
`



export const UPDATE_PROFIT = gql`
  mutation updateProfit($_id: String!, $name: String!) {
    updateProfit(_id: $_id, name: $name) {
      _id
      name
    }
  }
`



export const DEL_PROFIT = gql`
  mutation delProfit($_id: ObjectID!) {
    delProfit(_id: $_id)
  }
`
// export const DELETE_PROFIT = gql`

// `

export const QUERY_PROFIT_BUILDINGS = gql`
  query {
    buildings {
      name
      slug
      slots
    }
  }
`

export const QUERY_PROFIT_ITEMS = gql`

 query {
    buildings {
      _id
      name
      slug
      items {
        _id
        slug
        name
      }
    }
 }
`

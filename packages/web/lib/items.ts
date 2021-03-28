import gql from 'graphql-tag';


export const QUERY_ITEMS = gql`
  query {
    items {
      _id
      name
      maxValue
      productionTime
      level
      slug
      profit {
        cost
        profit
        profitByMinute
        profitByHour
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
      profit {
        cost
        profit
        profitByMinute
        profitByHour
      }
      depends {
        quantity
        item {
          ...itemDepends
           depends {
            quantity
            item {
              ...itemDepends
              depends {
                quantity
                item {
                    ...itemDepends
                    depends {
                      quantity
                      item {
                          ...itemDepends
                          depends {
                            item {
                              ...itemDepends
                            }
                            quantity
                          }
                      }
                    }
                }
              }
            }
          }
        }

      }
      usedIn {

        ...itemDepends
        usedIn {
          ...itemDepends
            usedIn {
          ...itemDepends
        }
        }


      }
      building {
        _id
        name
        parallel
        items {
          _id
          name
          maxValue
        }
      }
    }
  }

`

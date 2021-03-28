import gql from 'graphql-tag';


export const calculateDependsTime = (depends: any[]) => {

  if (depends.length <= 0) {
    return 0;
  }

  const dependsBuildTime: any[] = depends.map((b: any) => {
    const productionTime = b.item.building.parallel && b.item.productionTime || (b.item.productionTime * b.quantity);
    const productionDepends = calculateDependsTime(b.item.depends);
    return productionTime + productionDepends;
  });

  const billTime = dependsBuildTime.length > 0 && Math.max(...dependsBuildTime) || 0;
  return billTime;
}

export const calculateDependsCostByMaxValue = (depends: any[]): number => {
  if (depends.length <= 0) {
    return 0;
  }

  const dependsBuildCost: number = depends.map((b: any) => {
    const cost = b.item.maxValue * b.quantity;
    //const costDepends = calculateDependsCostByMaxValue(b.item.depends);
    return cost;// + costDepends;
  }).reduce((a: number, b: any) => {
    console.log('reduce', a, b);
    return a+b;
  }, 0);

  console.log('reduce final', dependsBuildCost);

  return dependsBuildCost;
}




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
  profit {
    cost
    profit
    profitByMinute
    profitByHour
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

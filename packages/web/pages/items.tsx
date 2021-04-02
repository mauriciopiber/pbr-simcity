import React from 'react';
import { QUERY_ITEMS } from "../lib/items";
import { useQuery } from "@apollo/react-hooks";
import Link from 'next/link';
import ItemTable from './../components/Item/ItemTable/ItemTable';
import ItemFilter from './../components/Item/ItemFilter/ItemFilter'

function Page() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('level');

  const defaultFilter = {
    level: 29,
  };

  const [filter, setFilter] = React.useState(defaultFilter)

  console.log(order, orderBy);

  const { loading, error, data } = useQuery(
    QUERY_ITEMS,
    {variables: {
      order,
      orderBy,
      filter,
    }}
  );

  const setColumnOrder = React.useCallback((column) => {
    setOrderBy(column);
    setOrder(order === 'asc' && 'desc' || 'asc');
  }, [order, orderBy]);

  if (loading) {
    return (
      <div>Loading</div>
    )
  }

  if (error) {
    return (
      <div>Error {JSON.stringify(error)}</div>
    )
  }

  const {
    items
  } = data;

  //console.log(items);

  return (
    <>
      <ItemFilter defaultValues={filter} setFilter={setFilter}/>
      <ItemTable setOrder={setColumnOrder} items={items}/>
    </>
  )
}

export default Page;

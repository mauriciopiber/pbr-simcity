import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ITEMS } from '@pbr-simcity/web/lib/items';
import ItemTable from '@pbr-simcity/web/components/Item/ItemTable/ItemTable';
import ItemFilter from '@pbr-simcity/web/components/Item/ItemFilter/ItemFilter';

function Page() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('level');

  const defaultFilter = {
    level: 43,
  };

  const [filter, setFilter] = React.useState(defaultFilter);

  const { loading, error, data } = useQuery(
    QUERY_ITEMS,
    {
      variables: {
        order,
        orderBy,
        filter,
      },
    },
  );

  const setColumnOrder = React.useCallback((column) => {
    setOrderBy(column);
    setOrder((order === 'asc' && 'desc') || 'asc');
  }, [order, orderBy]);

  if (loading) {
    return (
      <div>Loading</div>
    );
  }

  if (error) {
    return (
      <div>
        Error
        {JSON.stringify(error)}
      </div>
    );
  }

  const {
    items,
  } = data;

  // console.log(items);

  return (
    <>
      <ItemFilter defaultValues={filter} setFilter={setFilter} />
      <ItemTable setOrder={setColumnOrder} items={items} />
    </>
  );
}

export default Page;

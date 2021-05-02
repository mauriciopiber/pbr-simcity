import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ITEMS_USED_BY_ITEMS } from '@pbr-simcity/web/lib/items';
import ItemTable from '@pbr-simcity/web/components/Item/ItemTable/ItemTable';

interface ItemProps {
  slug: string;
}

const Page: FC<ItemProps> = ({ slug }) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('level');

  const setColumnOrder = React.useCallback(
    (column) => {
      setOrderBy(column);
      setOrder((order === 'asc' && 'desc') || 'asc');
    },
    [order, orderBy],
  );

  const { loading, error, data } = useQuery(QUERY_ITEMS_USED_BY_ITEMS, {
    variables: {
      slugs: [slug],
      order,
      orderBy,
      filter: {
        level: 43,
      },
    },
  });

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return (
      <div>
        Error
        {JSON.stringify(error)}
      </div>
    );
  }


  const { itemsUsedByItems } = data;

  if (itemsUsedByItems.length === 0) {
    return (
      <div>Not used in Any Item</div>
    )
  }

  return (
    <>
      <h3>Used In</h3>
      <ItemTable setOrder={setColumnOrder} items={itemsUsedByItems} />
    </>
  );
}

export default Page;

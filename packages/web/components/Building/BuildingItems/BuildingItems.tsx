import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ITEMS_BY_BUILDING } from '@pbr-simcity/web/lib/items';
import ItemTable from '@pbr-simcity/web/components/Item/ItemTable/ItemTable';

interface BuildingProps {
  slug: string;
}

const Page: FC<BuildingProps> = ({ slug }) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('level');

  const setColumnOrder = React.useCallback(
    (column) => {
      setOrderBy(column);
      setOrder((order === 'asc' && 'desc') || 'asc');
    },
    [order, orderBy],
  );

  const { loading, error, data } = useQuery(QUERY_ITEMS_BY_BUILDING, {
    variables: {
      building: slug,
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


  const { itemsByBuilding } = data;

  return <ItemTable setOrder={setColumnOrder} items={itemsByBuilding} />;
}

export default Page;

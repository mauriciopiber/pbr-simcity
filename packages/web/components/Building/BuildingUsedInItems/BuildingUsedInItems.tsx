import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ITEMS_DEPEND_BY_BUILDING } from '@pbr-simcity/web/lib/items';
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

  const { loading, error, data } = useQuery(QUERY_ITEMS_DEPEND_BY_BUILDING, {
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


  const { itemsDependsByBuilding } = data;

  if (itemsDependsByBuilding.length === 0) {
    return (
      <div>Not need Any Item to build</div>
    )
  }

  return (
    <>
      <h3>Dependency</h3>
      <ItemTable setOrder={setColumnOrder} items={itemsDependsByBuilding} />
    </>
  );
}

export default Page;

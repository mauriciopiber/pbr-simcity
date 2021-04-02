import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_BUILDINGS } from '@pbr-simcity/web/lib/building';
import BuildingTable from '@pbr-simcity/web/components/Building/BuildingTable/BuildingTable';

function Page() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('level');

  const setColumnOrder = React.useCallback((column) => {
    setOrderBy(column);
    setOrder((order === 'asc' && 'desc') || 'asc');
  }, [order, orderBy]);

  const { loading, error, data } = useQuery(
    QUERY_BUILDINGS,
  );

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
    buildings,
  } = data;

  return (
    <BuildingTable setOrder={setColumnOrder} buildings={buildings} />
  );
}

export default Page;

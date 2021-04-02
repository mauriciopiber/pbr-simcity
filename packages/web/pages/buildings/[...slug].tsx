import React from 'react';
import { request, gql } from 'graphql-request'
import { QUERY_BUILDING } from '../../lib/building';
import { useQuery } from "@apollo/react-hooks";
import ItemTable from '../../components/Item/ItemTable/ItemTable';

const QUERY_PATHS = gql`
  query {
    buildings {
      slug
    }
  }
`


interface BuildingProps {
  slug: string;
}

function Page({ slug }: BuildingProps) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('level');

  const setColumnOrder = React.useCallback((column) => {
    setOrderBy(column);
    setOrder(order === 'asc' && 'desc' || 'asc');
  }, [order, orderBy]);

  const { loading, error, data } = useQuery(
    QUERY_BUILDING,
    {variables:
      { slug: slug }
    }
  );


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
    building
  } = data;

  const {
    name,
    items
  } = building;

  return (
    <ItemTable setOrder={setColumnOrder} items={items}/>
  )
}

export async function getStaticPaths() {

  const data = await request('http://localhost:4000', QUERY_PATHS);

  const { buildings } = data;

  const paths = buildings.map((b: any) => {
    return {
      params: { slug: [b.slug]}
    }
  })


  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(ctx: any) {

  const { params } = ctx;

  const { slug } = params;

  return {
    props: {
      slug: slug[0],

    }
  }
}

export default Page;
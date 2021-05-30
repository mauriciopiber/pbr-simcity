import React from 'react';
import { request, gql } from 'graphql-request';
import ItemPanel from '@pbr-simcity/web/components/Item/ItemPanel/ItemPanel';

const QUERY_PATHS = gql`
  query {
    items {
      slug
    }
  }
`;

interface ItemProps {
  slug: string;
}

function Page({ slug }: ItemProps) {
  return (
    <ItemPanel slug={slug}/>
  )
}

export async function getStaticPaths() {
  const GRAPHQL_API: string | undefined = process.env.GRAPHQL_API;
  if (!GRAPHQL_API) {
    throw new Error('Missing GRAPHQL_API environment');
  }

  const data = await request(GRAPHQL_API, QUERY_PATHS);

  const { items } = data;

  const paths = items.map((b: any) => ({
    params: { slug: [b.slug] },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(ctx: any) {
  const { params } = ctx;

  const { slug } = params;

  return {
    props: {
      slug: slug[0],
    },
  };
}

export default Page;

import React, { FC } from 'react';
import { request, gql } from 'graphql-request';
import BuildingItems from '@pbr-simcity/web/components/Building/BuildingItems/BuildingItems';
import BuildingUsedInItems from '@pbr-simcity/web/components/Building/BuildingUsedInItems/BuildingUsedInItems';
import BuildingUsedByItems from '@pbr-simcity/web/components/Building/BuildingUsedByItems/BuildingUsedByItems';


const QUERY_PATHS = gql`
  query {
    buildings {
      slug
    }
  }
`;

interface BuildingProps {
  slug: string;
}

const Page: FC<BuildingProps> = ({ slug }) => {


  return (
    <>
    <h1>Buildings</h1>
    <h2>{slug}</h2>
      <BuildingItems slug={slug} />
      <BuildingUsedInItems slug={slug}/>
      <BuildingUsedByItems slug={slug}/>
    </>
  );
}

export async function getStaticPaths() {
  const GRAPHQL_API: string | undefined = process.env.GRAPHQL_API;
  if (!GRAPHQL_API) {
    throw new Error('Missing GRAPHQL_API environment');
  }
  const data = await request(GRAPHQL_API, QUERY_PATHS);

  const { buildings } = data;

  const paths = buildings.map((b: any) => ({
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

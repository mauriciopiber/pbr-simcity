import React, { FC } from 'react';
import { request, gql } from 'graphql-request';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_PROFIT, QUERY_PROFITS_PATHS } from '@pbr-simcity/web/lib/profits';
import BuildingsProfit from '@pbr-simcity/web/components/Profit/BuildingsProfit/BuildingsProfit';
import ItemsProfit from '@pbr-simcity/web/components/Profit/ItemsProfit/ItemsProfit';
import FlowProfit from '@pbr-simcity/web/components/Profit/FlowProfit/FlowProfit'


interface BuildingProps {
  id: string;
}


interface ProfitsProps {
  props: BuildingProps;
}

interface ProfitsCtx {
  params: {
    id: string
  }
}


interface ProfitItem {
  _id: string;
}

interface PathParams {
  params: {
    id: string[]
  }
}

interface IStaticPaths {
  fallback: boolean;
  paths: PathParams[]
}

const Page: FC<BuildingProps> = ({ id }) => {
  const { loading, error, data } = useQuery(QUERY_PROFIT, {
    variables: { _id: id },
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

  const { profit } = data;

  console.log(profit);

  return (
    <div className="panel">
      <div className="panel__title">{profit.name}</div>
      <ItemsProfit profit={id} />
      {/* {profit.items.map((p: any) => {
        return (
          <div key={p._id}>{p.item.name}</div>
        )
      })} */}
      <div className="row">
        <BuildingsProfit profit={id} />
        <FlowProfit profit={id}/>
      </div>
      <div>
        <Link href="/items">
          <a>Items</a>
        </Link>
      </div>
      <style jsx>
        {`
          .row {
            display: flex;
          }
        `}
      </style>

    </div>
  );
}

// interface ProfitsStaticPaths {
//   paths: PathParams
// }

export async function getStaticPaths(): Promise<IStaticPaths> {
  const GRAPHQL_API: string | undefined = process.env.GRAPHQL_API;
  if (!GRAPHQL_API) {
    throw new Error('Missing GRAPHQL_API environment');
  }
  const data = await request(GRAPHQL_API, QUERY_PROFITS_PATHS);

  const { profits } = data;

  const paths: PathParams[] = profits.map((b: ProfitItem): PathParams => ({
    params: { id: [b._id] },
  }));

  return {
    paths,
    fallback: false,
  };
}


export async function getStaticProps(ctx: ProfitsCtx) : Promise<ProfitsProps> {
  const { params } = ctx;

  const { id } = params;

  return {
    props: {
      id: id[0],
    },
  };
}

export default Page;

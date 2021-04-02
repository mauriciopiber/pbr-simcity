import React from 'react';
import { request, gql } from 'graphql-request';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_PROFIT } from '@pbr-simcity/web/lib/profits';

const QUERY_PATHS = gql`
  query {
    profits {
      _id
    }
  }
`;

interface BuildingProps {
  id: string;
}

function Page({ id }: BuildingProps) {
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

  return (
    <div className="panel">
      <div className="panel__title">{profit.name}</div>

      <div>
        <Link href="/items">
          <a>Items</a>
        </Link>
      </div>
      <style jsx>
        {`
          .panel {
            padding: 25px;
          }

          .panel__title {
            padding: 5px;
            font-size: 20px;
            line-height: 20px;
            color: #ffffff;
          }
          .link {
            color: #ffffff;
          }
        `}
      </style>
    </div>
  );
}

export async function getStaticPaths() {
  const data = await request('http://localhost:4000', QUERY_PATHS);

  const { profits } = data;

  const paths = profits.map((b: any) => ({
    params: { id: [b._id] },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(ctx: any) {
  const { params } = ctx;

  const { id } = params;

  return {
    props: {
      id: id[0],
    },
  };
}

export default Page;

import React from 'react';
import { request, gql } from 'graphql-request';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import {
  QUERY_ITEM,
  calculateDependsCostByMaxValue,
  calculateDependsTime,
} from '@pbr-simcity/web/lib/items';
import ItemMap from '@pbr-simcity/web/components/Item/ItemMap';
import BuildingFlow from '@pbr-simcity/web/components/Item/BuildingFlow';
import DependencyGraph from '@pbr-simcity/web/components/Item/DependencyGraph';

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
  const { loading, error, data } = useQuery(
    QUERY_ITEM,
    {
      variables:
      { slug },
    },
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
    item,
  } = data;

  const dependsTime = calculateDependsTime(item.depends);
  const dependsCost = calculateDependsCostByMaxValue(item.depends);

  return (
    <div className="panel">
      <div className="panel__title">
        {item.name}
      </div>
      <div className="panel__building">
        <Link href={`/buildings/${item.building._id}`}>
          <a className="link">
            {item.building.name}
            {' '}
            -
            {' '}
            {(item.building.parallel && 'Parallel') || 'Sequential'}
          </a>
        </Link>
      </div>
      <table>
        <tr>
          <th>
            Dependency Graph
          </th>
          <td>
            <DependencyGraph items={item.depends} />
          </td>
        </tr>
        <tr>
          <th>
            Buildings Flow
          </th>
          <td>
            <BuildingFlow item={item} />
          </td>
        </tr>
        <tr>
          <th>
            Production Time Min
          </th>
          <td>
            {item.productionTime}
            m
          </td>
        </tr>
        <tr>
          <th>
            Bill Cost
          </th>
          <td>
            {dependsCost}
          </td>
        </tr>
        <tr>
          <th>
            Bill Time
          </th>
          <td>
            {dependsTime}
            {' '}
            (
            {dependsTime / 60}
            h)
          </td>
        </tr>
        <tr>
          <th>
            Total Production
          </th>
          <td>
            {dependsTime + item.productionTime}
            m (
            {(dependsTime + item.productionTime) / 60}
            h)
          </td>
        </tr>
        <tr>
          <th>
            Max Value
          </th>
          <td>
            {item.maxValue}
          </td>
        </tr>
        <tr>
          <th>
            Profit From Own Production
          </th>
          <td>
            {item.maxValue - dependsCost}
            {' '}
            = (
            {item.maxValue}
            ) - (
            {dependsCost}
            )
          </td>
        </tr>
        <tr>
          <th>
            Profit/H From Own Production
          </th>
          <td>
            {(item.maxValue - dependsCost) / item.productionTime}
          </td>
        </tr>

      </table>
      <div>
        <img alt={item.name} src={`/img/${item.slug}.png`} />
        <ItemMap name={item.name} depends={item.depends} usedIn={item.usedIn} />
      </div>
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

import { request, gql } from 'graphql-request'
import Link from 'next/link';
import { QUERY_ITEM } from '../../lib/items';
import { useQuery } from "@apollo/react-hooks";
import MaterialMap from '../../components/Material/MaterialMap';
import BuildingFlow from '../../components/Material/BuildingFlow';
import DependencyGraph from '../../components/Material/DependencyGraph';
import {
  calculateDependsCostByMaxValue,
  calculateDependsTime
} from '../../lib/items';


const QUERY_PATHS = gql`
  query {
    items {
      slug
    }
  }
`


interface ItemProps {
  slug: string;
}

function Page({ slug }: ItemProps) {

  const { loading, error, data } = useQuery(
    QUERY_ITEM,
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
    item
  } = data;

  const dependsTime = calculateDependsTime(item.depends);
  const dependsCost = calculateDependsCostByMaxValue(item.depends);


  console.log(item);

  return (
    <div className="panel">
      <div className="panel__title">
        {item.name}
      </div>
      <div className="panel__building">
        <Link href={`/buildings/${item.building._id}`}>
          <a className="link">{item.building.name} - {item.building.parallel && 'Parallel' || 'Sequential'}</a>
        </Link>
      </div>
      <table>
        <tr>
          <th>
            Dependency Graph
          </th>
          <td>
            <DependencyGraph items={item.depends}/>
          </td>
        </tr>
        <tr>
          <th>
            Buildings Flow
          </th>
          <td>
            <BuildingFlow item={item}/>
          </td>
        </tr>
        <tr>
          <th>
            Production Time Min
          </th>
          <td>{item.productionTime}m</td>
        </tr>
{/*
        <tr>
          <th>
            Production Time Hour.
          </th>
          <td>{item.productionTime / 60}</td>
        </tr> */}
        {/* <tr>
          <th>
            Cost
          </th>
          <td>
            {item.profit.cost} - {item.costMongo}
          </td>
        </tr> */}
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
            {dependsTime} ({dependsTime/60}h)
          </td>
        </tr>
        <tr>
          <th>
            Total Production
          </th>
          <td>
            {dependsTime+item.productionTime}m ({(dependsTime+item.productionTime)/60}h)
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
            {item.maxValue - dependsCost} = ({item.maxValue}) - ({dependsCost})
          </td>
        </tr>
        <tr>
          <th>
            Profit/H From Own Production
          </th>
          <td>
            {(item.maxValue - dependsCost)/item.productionTime}
          </td>
        </tr>
        {/* <tr>
          <th>
            Total Production Time
          </th>
          <td>
            {item.productionTime + dependsTime} = ({item.productionTime}) + ({dependsTime})
          </td>
        </tr> */}

        {/* <tr>
          <th>
            Max Production / H
          </th>
          <td>
            {60 / (item.productionTime + dependsTime)}
          </td>
        </tr>
        <tr>
          <th>
            Max Production / D
          </th>
          <td>
            {(60*24) / (item.productionTime + dependsTime)}
          </td>
        </tr> */}

      </table>
      <div>
        <img src={`/img/${item.slug}.png`}/>
        <MaterialMap name={item.name} depends={item.depends} usedIn={item.usedIn }/>
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
  )
}

export async function getStaticPaths() {

  const data = await request('http://localhost:4000', QUERY_PATHS);

  const { items } = data;

  const paths = items.map((b: any) => {
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

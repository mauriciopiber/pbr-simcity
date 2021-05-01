import React, { FC } from 'react';
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
import ItemProfit from '@pbr-simcity/web/components/Item/ItemProfit/ItemProfit';

interface IItemPanelProps {
  slug: string;
}

const ItemPanel: FC<IItemPanelProps> = ({ slug }) => {

  const { loading, error, data } = useQuery(QUERY_ITEM, {
    variables: { slug },
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

  const { item } = data;

  const dependsTime = calculateDependsTime(item.depends);
  const dependsCost = calculateDependsCostByMaxValue(item.depends);

  return (
    <div className="panel">
      <div className="panel__title"><h1>{item.name}</h1></div>
      <table>
        <tr>
          <th>Dependency Graph</th>
          <td>
            <DependencyGraph items={item.depends} />
          </td>
        </tr>
        <tr>
          <th>Buildings Flow</th>
          <td>
            <BuildingFlow item={item} />
          </td>
        </tr>
        <tr>
          <th><Link href={`/buildings/${item.building.slug}`}><a>{item.building.name}</a></Link></th>
        </tr>
        <tr>
          <th>Production Time Min</th>
          <td>{item.productionTime}m</td>
        </tr>
        <tr>
          <th>Bill Cost</th>
          <td>{dependsCost}</td>
        </tr>
        <tr>
          <th>Bill Time</th>
          <td>
            {dependsTime} ({dependsTime / 60}
            h)
          </td>
        </tr>
        <tr>
          <th>Total Production</th>
          <td>
            {dependsTime + item.productionTime}m (
            {(dependsTime + item.productionTime) / 60}
            h)
          </td>
        </tr>
        <tr>
          <th>Max Value</th>
          <td>{item.maxValue}</td>
        </tr>
        <tr>
          <th>Profit From Own Production</th>
          <td>
            {item.maxValue - dependsCost} = ({item.maxValue}) - ({dependsCost})
          </td>
        </tr>
        <tr>
          <th>Profit/H From Own Production</th>
          <td>{(item.maxValue - dependsCost) / item.productionTime}</td>
        </tr>
      </table>
      <ItemProfit item={item.slug}/>
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
          }
          .link {
            color: #ffffff;
          }
        `}
      </style>
    </div>
  );
};

export default ItemPanel;

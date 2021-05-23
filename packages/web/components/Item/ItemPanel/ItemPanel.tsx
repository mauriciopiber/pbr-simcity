import React, { FC } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import {
  QUERY_ITEM,
  calculateDependsCostByMaxValue,
  calculateDependsTime,
} from '@pbr-simcity/web/lib/items';
// import BuildingFlow from '@pbr-simcity/web/components/Item/BuildingFlow';
import DependencyGraph from '@pbr-simcity/web/components/Item/DependencyGraph';
import ItemProfit from '@pbr-simcity/web/components/Item/ItemProfit/ItemProfit';
import ItemIcon from '@pbr-simcity/web/components/Item/ItemIcon/ItemIcon';
import ItemsUsedInItems from '@pbr-simcity/web/components/Item/ItemsUsedInItems/ItemsUsedInItems';
import ItemsUsedByItems from '@pbr-simcity/web/components/Item/ItemsUsedByItems/ItemsUsedByItems';

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
      <div className="panel__title">
        <span className="panel__title__icon">
          <ItemIcon slug={item.slug} name={item.name} size="sm"/>
        </span>
        <h1 className="panel__title__text">{item.name}</h1>
      </div>
      <table>
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
      <ItemsUsedByItems slug={item.slug}/>
      <ItemsUsedInItems slug={item.slug}/>
      <ItemProfit item={item.slug}/>
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
            display: flex;
            align-items: center;
          }

          .panel__title__icon {
            margin-right: 10px;
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

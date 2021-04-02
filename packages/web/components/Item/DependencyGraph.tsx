import React, { FC } from 'react';
import Link from 'next/link';
import { IItem } from '@pbr-simcity/types/types';
import cx from 'classnames';
import {
  calculateDependsCostByMaxValue,
  calculateDependsTime,
} from '../../lib/items';

export interface DependencyGraphProps {
  items: any[];
  parentSlug?: string;
}

const DependencyGraph: FC<DependencyGraphProps> = ({
  items,
  parentSlug = '',
}) => (
  <table className="dependency-graph">
    <tr>
      <th>I.</th>
      <th>Q.</th>
      <th>PT.</th>
      <th>DPT.</th>
      <th>TT.</th>
      <th>MV.</th>
      <th>DC.</th>
    </tr>
    <>
      {items.map((item) => {
        const billTime = calculateDependsTime(item.item.depends);
        const billCostMaxValue = calculateDependsCostByMaxValue(
          item.item.depends,
        );

        const dependencyQuantityTime = (item.item.building.parallel && item.item.productionTime)
            || item.item.productionTime * item.quantity;
        return (
          <>
            <tr data-testid={`dependency-${parentSlug + item.item.slug}`}>
              <th
                data-testid={`dependency-name-${parentSlug + item.item.slug}`}
              >
                <Link href={`/items/${item.item.slug}`}>
                  <a>{item.item.name}</a>
                </Link>
              </th>
              <td
                data-testid={`dependency-quantity-${
                  parentSlug + item.item.slug
                }`}
              >
                {item.quantity}
              </td>
              <td
                data-testid={`dependency-time-${parentSlug + item.item.slug}`}
                className={cx(
                  { parallel: item.item.building.parallel },
                  { sequential: !item.item.building.parallel },
                )}
              >
                {item.item.productionTime}
              </td>
              <td
                data-testid={`dependency-quantity-time-${
                  parentSlug + item.item.slug
                }`}
              >
                {dependencyQuantityTime}
              </td>
              <td
                className="time-bill"
                data-testid={`dependency-time-bill-${
                  parentSlug + item.item.slug
                }`}
              >
                {dependencyQuantityTime + billTime}
              </td>
              <td
                className="max-value"
                data-testid={`dependency-max-value-${
                  parentSlug + item.item.slug
                }`}
              >
                {item.item.maxValue}
              </td>
              <td
                className="cost-bill"
                data-testid={`dependency-cost-bill-${
                  parentSlug + item.item.slug
                }`}
              >
                {billCostMaxValue}
              </td>
              {item?.item?.depends?.length > 0 && (
              <td>
                <DependencyGraph
                  parentSlug={`${item.item.slug}-`}
                  items={item.item.depends}
                />
              </td>
              )}
            </tr>
          </>
        );
      })}
    </>
    <style jsx>
      {`
          .dependency-graph {
            border: 1px solid black;
            background-color: #ffffff;
            color: #000000;
            border-collapse: collapse;
            box-sizing: border-box;
          }

          .time-bill {
            background-color: #3474eb;
          }

          .cost-bill {
            background-color: #246cbf;
          }

          .max-value {
            background-color: #0b59b3;
          }

          tr,
          th,
          td {
            border: 1px solid black;
          }

          .parallel {
            background-color: orange;
          }

          .sequential {
            background-color: green;
          }
        `}
    </style>
  </table>
);

export default DependencyGraph;

import React, { FC } from 'react';
import Link from 'next/link';
import {
  IItem
} from '@pbr-simcity/types/types';
import cx from 'classnames'

export interface DependencyGraphProps {
  items: any[]
}

const DependencyGraph: FC<DependencyGraphProps> = ({items}) => {


  // const billTime = items.map(p => {
  //   return p.item.depends.reduce((a: any, b: any) => {
  //     return a + (b.item.building.parallel && b.item.productionTime || b.item.productionTime * b.item.quantity);
  //   }, 0);
  // }).reduce((a: any ,b: any) => {
  //   return a + b;
  // }, 0);
  console.log(items);

  return (
    <table className="dependency-graph">
      <>
      {items.map((item) => {
//        const billTime = 0;

        //console.log(item);
        const billTime = item.item.depends.reduce((a: any, b: any) => {
          return a + (b.item.building.parallel && b.item.productionTime || (b.item.productionTime * b.item.quantity));
        }, 0);

        const dependencyQuantityTime = item.item.building.parallel && item.item.productionTime || item.item.productionTime*item.quantity;
        return (
          <tr data-testid={`dependency-${item.item.slug}`}>
            <th data-testid={`dependency-name-${item.item.slug}`}>
              {item.item.name}
            </th>
            <td data-testid={`dependency-quantity-${item.item.slug}`}>
              {item.quantity}
            </td>
            <td data-testid={`dependency-time-${item.item.slug}`} className={cx({['parallel']: item.item.building.parallel}, {['sequential']: !item.item.building.parallel})}>
              {item.item.productionTime}
            </td>
            <td  data-testid={`dependency-quantity-time-${item.item.slug}`}>
              {dependencyQuantityTime}
            </td>
            <td  data-testid={`dependency-time-bill-${item.item.slug}`}>
              {dependencyQuantityTime + billTime}
            </td>
            {item?.item?.depends?.length > 0 && (
              <td>
                <DependencyGraph items={item.item.depends}/>
              </td>

            )}

          </tr>
        )

      })}
      </>
      <style jsx>
        {`
          .dependency-graph {
            border: 1px solid black;
            background-color: #FFFFFF;
            color: #000000;
          }

          tr, th, td {
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

  )
}



export default DependencyGraph;

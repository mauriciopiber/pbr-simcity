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

  return (
    <table className="dependency-graph">

      <>
      {items.map((item) => {
        return (
          <tr>
            <th>
              {item.item.name}
            </th>
            <td>
              {item.quantity}
            </td>
            <td>
              {item.item.productionTime}
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
        `}
      </style>

    </table>

  )
}



export default DependencyGraph;

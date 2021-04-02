import React, { FC } from 'react';
import cx from 'classnames';
import { IItemModel } from '@pbr-simcity/types/types';
import Link from 'next/link';

export interface ItemTableProps {
  items: IItemModel[];
  setOrder: Function;
}

const ItemTable: FC<ItemTableProps> = ({ items, setOrder }) => (
  <table className="table">
    <thead>
      <tr>
        <th />
        <th className="header--order" onClick={() => setOrder('name')}>
          Name
        </th>
        <th>Building</th>
        <th className="header--order" onClick={() => setOrder('level')}>
          Level
        </th>
        <th
          className="header--order"
          onClick={() => setOrder('productionTime')}
        >
          Pr. Time
        </th>
        <th className="header--order" onClick={() => setOrder('maxValue')}>
          M. Value
        </th>
        <th className="header--order" onClick={() => setOrder('billCost')}>
          B. Cost
        </th>
        {/* <th>B. Time</th> */}
        <th
          className="header--order"
          onClick={() => setOrder('profitOwnProduction')}
        >
          P. Profit
        </th>
        <th
          className="header--order"
          onClick={() => setOrder('profitOwnByMinute')}
        >
          OPPBM
        </th>
        <th
          className="header--order"
          onClick={() => setOrder('profitOwnByHour')}
        >
          OPPBH
        </th>
        <th>FP</th>
      </tr>
    </thead>
    <tbody>
      {items.map((p: IItemModel) => (
        <tr key={p.slug}>
          <td>
            <img className="icon" src={`/img/${p.slug}.png`} />
          </td>
          <td>
            <Link href={`/items/${p.slug}`}>
              <a className="link">{p.name}</a>
            </Link>
          </td>
          {(p.building && <td>{p.building.name}</td>) || <td>-</td>}
          <td>{p.level}</td>
          <td>{p.productionTime}</td>
          <td>{p.maxValue}</td>
          <td>{p.billCost}</td>
          {/* <td>
                {p.billTime}
              </td> */}
          <td>{p.profitOwnProduction}</td>
          <td>{p.profitOwnByMinute}</td>
          <td>{p.profitOwnByHour}</td>
          <td
            className={cx(
              { 'item--used-in': p.usedIn?.length > 0 },
              { 'item--endline': p.usedIn?.length <= 0 },
            )}
          />
        </tr>
      ))}
    </tbody>
    <style jsx>
      {`
        .table {
          width: 100%;
          padding: 0 20px;
          border-collapse: collapse;
        }

        .item--used-in {
          background-color: green;
        }

        .item--endline {
          background-color: red;
        }

        .header--order {
          text-decoration: underline;
        }

        tr,
        th,
        td {
          border: 1px solid black;
        }

        td {
          padding: 0 5px;
        }

        .icon {
          width: 48.5px;
          height: 53.5px;
        }
      `}
    </style>
  </table>
);

export default ItemTable;

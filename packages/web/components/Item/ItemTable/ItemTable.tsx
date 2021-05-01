import React, { FC } from 'react';
import cx from 'classnames';
import { IItemModel } from '@pbr-simcity/types/types';
import ItemIcon from '@pbr-simcity/web/components/Item/ItemIcon/ItemIcon';
import Link from 'next/link';

export interface ItemTableProps {
  items: IItemModel[];
  setOrder: Function;
}

const ItemTable: FC<ItemTableProps> = ({ items, setOrder }) => {

  console.log(items);
  return (
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
          <th>Depends</th>
          <th>Used In</th>
          <th>FP</th>
        </tr>
      </thead>
      <tbody>
        {items.map((p: IItemModel) => (
          <tr key={p.slug} className={`building-${p.building.slug}`}>
            <td>
              <ItemIcon size="xs" key={p.slug} name={p.name} slug={p.slug} />
            </td>
            <td>
              <Link href={`/items/${p.slug}`}>
                <a className="link">{p.name}</a>
              </Link>
            </td>
            {(p.building && <td>
              <Link href={`/buildings/${p.building.slug}`}>
                <a className="link">{p.building.name}</a>
              </Link>
            </td>) || <td>-</td>}
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
            <td>{p && p.depends && p.depends.map((p: any) => <ItemIcon size="xs" key={p.item.slug} name={p.item.name} slug={p.item.slug} />)}</td>
            <td>{p && p.usedIn && p.usedIn.map((p: any) => <ItemIcon size="xs" key={p.slug} name={p.name} slug={p.slug} />)}</td>

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
}
export default ItemTable;

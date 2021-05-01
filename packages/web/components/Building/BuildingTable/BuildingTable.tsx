import React, { FC } from 'react';
// import cx from 'classnames';
import { IBuildingModel } from '@pbr-simcity/types/types';
import Link from 'next/link';

export interface BuildingTableProps {
  buildings: IBuildingModel[];
  setOrder: Function;
}

const BuildingTable: FC<BuildingTableProps> = ({ buildings, setOrder }) => (
  <table className="table">
    <thead>
      <tr>
        <th className="header--order" onClick={() => setOrder('name')}>
          Name
        </th>
        <th>Items</th>
        <th className="header--order" onClick={() => setOrder('slots')}>
          Slots
        </th>
        <th className="header--order" onClick={() => setOrder('nextSlot')}>
          Next Slot
        </th>
        <th className="header--order" onClick={() => setOrder('parallel')}>
          Parallel
        </th>
      </tr>
    </thead>
    <tbody>
      {buildings.map((p: IBuildingModel) => (
        <tr key={p.slug} className={`building-${p.slug}`}>
          <td>
            <Link href={`/buildings/${p.slug}`}>
              <a>{p.name}</a>
            </Link>
          </td>
          <td>{p.items.length}</td>
          <td>{p.slots}</td>
          <td>{p.nextSlot}</td>
          <td>{(p.parallel && 'Sim') || 'Não'}</td>
        </tr>
      ))}
    </tbody>
    <style jsx>
      {`
        .table {
          width: 100%;
        }
      `}
    </style>
  </table>
);

export default BuildingTable;

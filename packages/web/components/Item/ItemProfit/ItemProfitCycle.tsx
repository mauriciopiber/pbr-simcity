import React, { FC } from "react";
import {
  IItemProfitBuildingSlots,
  IProfitCycle
} from '@pbr-simcity/types/types';
import ItemProfitCycleSlot from './ItemProfitCycleSlot';
import dayjs from 'dayjs';

const ItemProfitCycle: FC<IProfitCycle> = ({startProduction, endProduction, slots, cycle}) => {

  const startHour = dayjs('2000-01-01 00:00:00').add(startProduction, 'minute');
  const endHour =  dayjs('2000-01-01 00:00:00').add(endProduction, 'minute');

  return (
    <div className="profit-cicle">
      <div>Cycle {cycle+1} with {slots.length} items - {startHour.format('HH:mm')} to {endHour.format('HH:mm')}</div>
      <div className="profit-cicle__production">
        {slots.map((a: IItemProfitBuildingSlots) => {
          return (
            <ItemProfitCycleSlot
              key={`${a.item.slug}-${a.slot}`}
              complete={a.complete}
              start={a.start}
              schedule={a.schedule}
              item={a.item}
              slot={a.slot}
            />
          )
        })}
      </div>
      <style jsx>
        {`
          .profit-cicle {

          }

          .profit-cicle__production {
            display: flex;
          }
        `}
      </style>
    </div>
  )
}

export default ItemProfitCycle;

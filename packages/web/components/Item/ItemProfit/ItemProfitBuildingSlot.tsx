import React, { FC } from 'react';
import {
  IItemProfitBuildingSlots,
  BuildingSlugs,
} from '@pbr-simcity/types/types';
import ItemIcon from '@pbr-simcity/web/components/Item/ItemIcon/ItemIcon';

interface ItemProfitBuildingSlotProps {
  slot: IItemProfitBuildingSlots;
  building: BuildingSlugs;
}

const ItemProfitBuildingSlot: FC<ItemProfitBuildingSlotProps> = ({ slot, building }) => {

  const testId = `${building}-${slot.slot}-${slot.item.slug}`;
  return (
    <div data-testid={`${testId}`} className="slot" key={slot.slot}>
      [{slot.slot}]
      <ItemIcon name={slot.item.name} size="xs" slug={slot.item.slug}/>
      <span data-testid={`${testId}-schedule`} className="schedule">
        {slot.schedule}
      </span>
      <span data-testid={`${testId}-start`} className="start">
        {slot.start}
      </span>
      <span data-testid={`${testId}-complete`} className="complete">
        {slot.complete}
      </span>
      <style jsx>
        {`
          .slot {
            display: flex;
            align-items: center;
          }

          .schedule {
            padding: 2px 4px;
            margin: 0 2px;
            border-radius: 2px;
            background-color: #AEAEAE;
          }

          .start {
            padding: 2px 4px;
            margin: 0 2px;
            border-radius: 2px;
            background-color: #AFAFAF;
          }

          .complete {
            padding: 2px 4px;
            margin: 0 2px;
            border-radius: 2px;
            background-color: #ABABAB;
          }
        `}
      </style>
    </div>
  )
}

export default ItemProfitBuildingSlot;

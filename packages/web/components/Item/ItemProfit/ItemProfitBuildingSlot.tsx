import React, { FC } from 'react';
import {
  IItemProfitBuildingSlots
} from '@pbr-simcity/types/types';
import ItemIcon from '@pbr-simcity/web/components/Item/ItemIcon/ItemIcon';

interface ItemProfitBuildingSlotProps {
  slot: IItemProfitBuildingSlots;
}

const ItemProfitBuildingSlot: FC<ItemProfitBuildingSlotProps> = ({ slot }) => {

  return (
    <div className="slot" key={slot.slot}>
      [{slot.slot}]
      <ItemIcon name={slot.item.name} size="xs" slug={slot.item.slug}/>
      <span className="schedule">
        {slot.schedule}
      </span>
      <span className="start">
        {slot.start}
      </span>
      <span className="complete">
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

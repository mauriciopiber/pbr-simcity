import React, { FC } from "react";
import {
  IItemProfitBuildingSlots
} from '@pbr-simcity/types/types';
import ItemIcon from '@pbr-simcity/web/components/Item/ItemIcon/ItemIcon';

const ItemProfitCycleSlot: FC<IItemProfitBuildingSlots> = ({slot, start, item}) => {
  return (
    <div className={`slot building-${item.building.slug}`}>
      <ItemIcon name={item.name} slug={item.slug} size="xs"/>
      <style jsx>
        {`
          .slot {
            margin: 0 1px;
          }
        `}
      </style>
    </div>
  )
}

export default ItemProfitCycleSlot;

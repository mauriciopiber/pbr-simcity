import React, { FC } from 'react';
import {
  IItemProfitBuildingSlots
} from '@pbr-simcity/types/types';

interface ItemProfitBuildingSlotProps {
  slot: IItemProfitBuildingSlots;
}

const ItemProfitBuildingSlot: FC<ItemProfitBuildingSlotProps> = ({ slot }) => {
  return (
    <div key={slot.slot}>
      {slot.slot} - {slot.item.name} - {slot.schedule} - {slot.start} - {slot.complete}
    </div>
  )
}

export default ItemProfitBuildingSlot;

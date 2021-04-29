import React, { FC } from 'react';
import {
  IItemProfitBuilding
} from '@pbr-simcity/types/types';

interface ItemProfitBuildingProps {
  building: IItemProfitBuilding;
}

const ItemProfitBuilding: FC<ItemProfitBuildingProps> = ({ building }) => {
  return (
    <div key={building.slug} className="building">
      <div>{building.slug}</div>
      <div className="slots">
        {building.slots.map((slotItem: any) => {
          return (
            <div key={slotItem.slot}>
              {slotItem.slot} - {slotItem.item.name} - {slotItem.schedule} - {slotItem.start} - {slotItem.complete}
            </div>
          )
        })}
      </div>
    </div>
  )
}

import React, { FC } from 'react';
import {
  IItemProfitBuilding
} from '@pbr-simcity/types/types';
import ItemProfitBuildingSlot from '@pbr-simcity/web/components/Item/ItemProfit/ItemProfitBuildingSlot';
import cx from 'classnames';

interface ItemProfitBuildingProps {
  building: IItemProfitBuilding;
}

const ItemProfitBuilding: FC<ItemProfitBuildingProps> = ({ building }) => {

  const clx = cx(
    'building',
    {[`building-${building.slug}`]: building.slug}
  )
  return (
    <div key={building.slug} className={clx}>
      <div>{building.name}</div>
      <div className="slots">
        {building.slots.map((slotItem: any) => {
          return (
            <ItemProfitBuildingSlot key={slotItem.slot} slot={slotItem}/>
          )
        })}
      </div>
      <style jsx>
        {`
          .building {
            padding: 15px;

          }


        `}
      </style>
    </div>
  )
}

export default ItemProfitBuilding;

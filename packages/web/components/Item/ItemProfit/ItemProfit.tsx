import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
// import cx from 'classnames';
// import { IItemModel } from '@pbr-simcity/types/types';
// import ItemIcon from '@pbr-simcity/web/components/Item/ItemIcon/ItemIcon';
// import Link from 'next/link';
import {
  QUERY_ITEM_PROFIT,
} from '@pbr-simcity/web/lib/items';

export interface ItemProfitProps {
  item: string;
}

const ItemProfit: FC<ItemProfitProps> = ({ item }) => {
  const { loading, error, data } = useQuery(QUERY_ITEM_PROFIT, {
    variables: { slug: item },
  });

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return (
      <div>
        Error
        {JSON.stringify(error)}
      </div>
    );
  }

  const { itemProfit } = data;

  const { buildings } = itemProfit;

  return (
    <div>
      <div className="buildings">
        {buildings.map(((a: any) => {
          if (a.slots.length <= 0) {
            return null;
          }
          return (
            <div key={a.slug} className="building">
              <div>{a.slug}</div>
              <div className="slots">
                {a.slots.map((slotItem: any) => {
                  return (
                    <div key={slotItem.slot}>
                      {slotItem.slot} - {slotItem.item.name} - {slotItem.schedule} - {slotItem.start} - {slotItem.complete}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        }))}

      </div>
      <style jsx>
        {`
          .buildings {
            display: flex;
            padding: 15px;
            flex-wrap: wrap;
          }
          .building {
            padding: 15px;
          }
        `}
      </style>
    </div>
  )
}


export default ItemProfit;

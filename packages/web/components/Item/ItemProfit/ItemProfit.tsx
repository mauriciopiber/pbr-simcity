import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
// import cx from 'classnames';
// import { IItemModel } from '@pbr-simcity/types/types';
// import ItemIcon from '@pbr-simcity/web/components/Item/ItemIcon/ItemIcon';
// import Link from 'next/link';
import {
  QUERY_ITEM_PROFIT,
} from '@pbr-simcity/web/lib/items';
import ItemProfitBuilding from '@pbr-simcity/web/components/Item/ItemProfit/ItemProfitBuilding';

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
            <ItemProfitBuilding key={a.slug} building={a}/>
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
                 `}
      </style>
    </div>
  )
}


export default ItemProfit;

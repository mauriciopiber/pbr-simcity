import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_PROFIT_ITEMS } from '@pbr-simcity/web/lib/profits';

interface ItemsProfitProps {
  profit: string;
}

const ItemsProfit: FC<ItemsProfitProps> = ({ profit }) => {
  const { loading, error, data } = useQuery(QUERY_PROFIT_ITEMS);

  if (loading) {
    return <div>Loading</div>;
  }

  const {
    buildings
  } = data;

  if (error) {
    return (
      <div>
        Error
        {JSON.stringify(error)}
      </div>
    );
  }

  return (
    <div>
      <h2>Items</h2>
      <div className="items__list">
      {buildings.map((a: any) => {
        const { items } = a;
        return (
          <div className="building" key={a.slug}>
            <div>
              {a.name}
            </div>
            <div className="building__items">
              {items.map((b: any) => {
                return (
                  <div key={b.slug}>
                    <img title={b.name} alt={b.name} className="icon" src={`/img/${b.slug}.png`} />
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
      </div>
      <style jsx>
        {`
          .icon {
            width: 33.95px;
            height: 37.45px;
            margin: 2px;
            cursor: pointer;
          }

          .items__list {
            display: flex;
            flex-wrap: wrap;
          }

          .building__items {
            display: flex;
          }

          .building {
            margin: 2px 5px;
          }
        `}
      </style>
    </div>
  )
}

export default ItemsProfit;

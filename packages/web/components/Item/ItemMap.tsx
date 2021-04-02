import React, { FC } from 'react';
import DependsItem from './DependsItem';
import UsedInItem from './UsedInItemCard';

export interface ItemMapProps {
  name: string;
  usedIn: any[];
  depends: any[];
}

const ItemMap: FC<ItemMapProps> = ({
  name = 'My Title',
  usedIn = [],
  depends = [],
}) => (
  <div>
    <h1 data-testid="material-title">Item Map</h1>
    <h2 data-testid="material-subtitle">{name}</h2>
    <div className="material__panel">
      {depends.length > 0 && (
        <div className="material__panel__item">
          <h3>Depends</h3>
          <>
            {depends.map((p) => (
              <DependsItem
                key={p.item._id}
                _id={p.item._id}
                name={p.item.name}
                quantity={p.quantity}
                productionTime={p.item.productionTime}
                slug={p.item.slug}
              />
              // <div>
              // <div>{p.item.name}</div>
              // <div>{p.quantity}</div>
              // </div>
            ))}
          </>
        </div>
      )}

      {usedIn.length > 0 && (
        <div className="material__panel__item">
          <h3>Used in</h3>
          <>
            {usedIn.map((p) => (
              <UsedInItem
                key={p._id}
                _id={p._id}
                name={p.name}
                productionTime={p.productionTime}
                slug={p.slug}
              />
            ))}
          </>
        </div>
      )}
    </div>
    <style jsx>
      {`
        .material__panel {
          display: flex;
          justify-content: center;
        }

        .material__panel__item {
          margin: 0 15px;
          padding: 25px;
          box-sizing: border-box;
          background-color: #eaeaea;
        }
      `}
    </style>
  </div>
);

export default ItemMap;

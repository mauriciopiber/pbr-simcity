import React, { FC } from 'react';
import Link from 'next/link';

export interface DependsItemProps {
  name: string;
  slug: string;
  productionTime: number;
  quantity: number;
  _id: string;
}

const DependsItem: FC<DependsItemProps> = ({
  _id,
  name,
  slug,
  productionTime,
  quantity,
}) => (
  <div className="depends__item">
    <div className="depedns__item__logo">
      <img className="depends__item__logo__image" src={`/img/${slug}.png`} />
    </div>
    <div className="depends__item__title">
      <Link href={`/items/${slug}`}>
        <a>{name}</a>
      </Link>
    </div>
    <div className="depends__item__production-time">{productionTime}</div>
    <div className="depends__item__quantity">{quantity}</div>
    <style jsx>
      {`
          .depends__item {
            background-color: #fafafa;
            display: flex;
            padding: 15px;
            width: 450px;
            align-items: center;
            justify-content: flex-start;
            box-sizing: border-box;
          }

          .depends__item__title {
            font-size: 20px;
            margin: 0 15px;
            flex: 1 0 120px;
          }

          .depends__item__logo {
            flex: 0 0 47.5px;
          }

          .depends__item__logo__image {
            width: 47.5px;
            height: 53.5px;
            transform: scale(0.8);
          }

          .depends__item__production-time {
            font-size: 20px;
            margin: 0 5px;
            flex: 0 1 40px;
          }

          .depends__item__quantity {
            font-size: 20px;
            margin: 0 5px;
            flex: 0 1 40px;
          }
        `}
    </style>
  </div>
);

export default DependsItem;

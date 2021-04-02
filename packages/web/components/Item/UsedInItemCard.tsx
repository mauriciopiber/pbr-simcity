import React, { FC } from "react";
import Link from "next/link";

export interface UsedInItemProps {
  name: string;
  slug: string;
  productionTime: number;
  _id: string;
}

const UsedInItem: FC<UsedInItemProps> = ({
  _id,
  name,
  slug,
  productionTime,
}) => {
  return (
    <div className="used__item">
      <div className="depedns__item__logo">
        <img className="used__item__logo__image" src={`/img/${slug}.png`} />
      </div>
      <div className="used__item__title">
        <Link href={`/items/${slug}`}>
          <a>{name}</a>
        </Link>
      </div>
      <div className="used__item__production-time">{productionTime}</div>
      <style jsx>
        {`
          .used__item {
            background-color: #fafafa;
            display: flex;
            width: 450px;
            padding: 10px;
            align-items: center;
            justify-content: flex-start;
          }

          .used__item__title {
            font-size: 20px;
            margin: 0 15px;
            flex: 1 0 120px;
          }

          .used__item__logo {
            flex: 0 0 47.5px;
          }

          .used__item__logo__image {
            width: 47.5px;
            height: 53.5px;
            transform: scale(0.8);
          }

          .used__item__production-time {
            font-size: 25px;
            margin: 0 5px;
            flex: 0 1 40px;
          }

          .used__item__quantity {
            font-size: 25px;
            margin: 0 5px;
            flex: 0 1 40px;
          }
        `}
      </style>
    </div>
  );
};

export default UsedInItem;

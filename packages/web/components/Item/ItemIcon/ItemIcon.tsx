import React, { FC } from 'react';
import cx from 'classnames';
import Link from 'next/link';

export interface ItemIconProps {
  slug: string;
  size: string;
  name: string;
}

const ItemMap: FC<ItemIconProps> = ({
  slug = 'My Title',
  size = '',
  name = '',
}) => {

  const clx = cx(
    'icon',
    {[`icon--${size}`]: size},
  )

  return (
    <>
      <Link href={`/items/${slug}`}>
        <a><img className={clx} alt={name} src={`/img/${slug}.png`} /></a>
      </Link>
      <style jsx>
        {`
          .icon {
            display: inline-block;
            margin: 2.5px;
            padding: 0;
          }

          .icon--xs {
            width: 24.25px;
            height: 26.75px;
          }

          .icon--sm {
            width: 48.5px;
            height: 53.5px;
          }

          .icon--md {
            width: 97px;
            height: 107px;
          }
        `}
      </style>
    </>
  )
}

export default ItemMap;

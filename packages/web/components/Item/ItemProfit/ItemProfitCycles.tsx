import React, { FC } from "react";

import ItemProfitCycle from './ItemProfitCycle';

interface ItemProfitCyclesProps {
  cycles: any[],
}

const ItemProfitCycles: FC<ItemProfitCyclesProps> = ({cycles}) => {
  return (
    <div className="cycles">
      <h3>Production Cycles</h3>
      <div className="cycles__items">
        {cycles.map((a: any, i: number) => {
          return (
            <ItemProfitCycle
              key={i}
              startProduction={a.startProduction}
              endProduction={a.endProduction}
              slots={a.slots}
              cycle={a.cycle}
            />
          )
        })}
      </div>
      <style jsx>
        {`
          .cycles__items {
            padding: 10px 20px;
          }
        `}
      </style>
    </div>
  )
}

export default ItemProfitCycles;

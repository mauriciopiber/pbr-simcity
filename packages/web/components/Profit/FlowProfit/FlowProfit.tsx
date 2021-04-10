import React, { FC } from 'react';

interface FlowProfitProps {
  profit: string;
}

const FlowProfit: FC<FlowProfitProps> = ({ profit }) => {
  return (
    <div className="flow__profit">
      <h2>Flow Profit</h2>
      <style jsx>
        {`
          .flow__profit {
            padding: 20px;
          }
        `}
      </style>
    </div>
  )
}

export default FlowProfit;

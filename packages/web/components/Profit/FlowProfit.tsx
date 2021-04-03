import React, { FC } from 'react';

interface FlowProfitProps {
  dummy?: boolean;
}

const FlowProfit: FC<FlowProfitProps> = () => {
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

import { string } from 'prop-types';
import React, { FC } from 'react';
import { DEL_PROFIT, QUERY_PROFITS } from '@pbr-simcity/web/lib/profits';
import { useMutation } from '@apollo/react-hooks'

interface DelProfitProps {
  _id: string;
}

const DelProfit: FC<DelProfitProps> = ({_id}) => {
  const [delProfit, { data, error }] = useMutation(DEL_PROFIT, {
    refetchQueries: [
      {query: QUERY_PROFITS},
    ]
  });
  const onClick = () => {
    delProfit({variables: {_id}});
  };

  return (
    <div>
      Del Profit {_id}
      <button onClick={onClick}>
        Delete
      </button>
    </div>
  )
}

export default DelProfit;

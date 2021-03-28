import { QUERY_PROFITS } from "../lib/profits";
import { useQuery } from "@apollo/react-hooks";
import Link from 'next/link';
import React from 'react';
import AddProfit from './../components/Profit/AddProfit';

function Page() {


  const [createMode, setCreateMode] = React.useState(false);

  const { loading, error, data } = useQuery(
    QUERY_PROFITS,
  );

  if (loading) {
    return (
      <div>Loading</div>
    )
  }

  if (error) {
    return (
      <div>Error {JSON.stringify(error)}</div>
    )
  }

  const {
    profits
  } = data;

  return (
    <div className="table">
      <div className="row">
        <button onClick={() => setCreateMode(true)}>Create</button>
      </div>
      {createMode && (
        <div className="modal">
          <AddProfit/>
          <button onClick={() => setCreateMode(false)}>Cancel</button>
        </div>
      )}
      <div className="row">
        <div className="header">
          <div className="info">
            Profits
          </div>
        </div>
        </div>
        {profits.map((p: any) => {
        return (
          <div className="row">
            <div className="column">
              <Link href={`/profits/${p._id}`}>
                <a className="link">{p.name}</a>
              </Link>
            </div>
          </div>
        )
      })}

        </div>
  )
}

export default Page;

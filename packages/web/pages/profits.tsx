import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';
import { QUERY_PROFITS } from '@pbr-simcity/web/lib/profits';
import AddProfit from '@pbr-simcity/web/components/Profit/AddProfit';
import DelProfit from '@pbr-simcity/web/components/Profit/DelProfit';
import Modal from '@pbr-simcity/web/components/UI/Modal/Modal';

function Page() {
  const [createMode, setCreateMode] = React.useState(false);

  const { loading, error, data } = useQuery(QUERY_PROFITS);

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return (
      <div>
        Error
        {JSON.stringify(error)}
      </div>
    );
  }

  const { profits } = data;

  return (
    <div className="table">
      <div className="row">
        <button type="button" onClick={() => setCreateMode(true)}>
          Create
        </button>
      </div>
      {createMode && (
        <Modal>
          <AddProfit />
          <button type="button" onClick={() => setCreateMode(false)}>
            Cancel
          </button>
        </Modal>
      )}
      <div className="row">
        <div className="header">
          <div className="info">Profits</div>
        </div>
      </div>
      {profits.map((p: any) => (
        <div key={p._id} className="row">
          <div className="column">
            <Link href={`/profits/${p._id}`}>
              <a className="link">{p.name}</a>
            </Link>
          </div>
          <div className="column">
            <DelProfit _id={p._id}/>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Page;

import { QUERY_ITEMS } from "../lib/items";
import { useQuery } from "@apollo/react-hooks";
import Link from 'next/link';

function Page() {

  const { loading, error, data } = useQuery(
    QUERY_ITEMS
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
    items
  } = data;


  return (
    <div className="table">
      <div className="row">
        <div className="header">
          <div className="info">
            Item
          </div>
        </div>
        <div className="header">
          <div className="info">
            Building
          </div>
        </div>
        <div className="header">
          <div className="info">
            Level
          </div>
        </div>
        <div className="header">
          <div className="info">
            Max Value
          </div>
        </div>
        <div className="header">
        <div className="info">
          Production Time
          </div>
        </div>
      </div>
      {items.map((p: any) => {
        return (
          <div className="row">
            <div className="column">
              <Link href={`/items/${p._id}`}>
                <a className="link">{p.name}</a>
              </Link>
            </div>
            <div className="column">
              <div className="info">
                <Link href={`/buildings/${p.building._id}`}>
                  <a className="link">{p.building.name}</a>
                </Link>
              </div>
            </div>
            <div className="column">
              <div className="info">
                {p.level}

              </div>
            </div>
            <div className="column">
              <div className="info">
                {p.maxValue}

              </div>
            </div>
            <div className="column">
              <div className="info">
                {p.productionTime}
              </div>
            </div>
          </div>
        )
      })}
      <style jsx>
        {`
          .table {
            padding: 25px;
          }

          .row {
            display: flex;
          }

          .row:hover {
            border: 1px solid white;
            box-sizing: border-box;
          }

          .column, .header {
            flex: 1 1 200px;
          }

          .link, .info {
            text-decoration: none;
            color: #ffffff;
          }

          .link:hover {
            text-decoration: underline;
          }
        `}
      </style>
    </div>
  )
}

export default Page;

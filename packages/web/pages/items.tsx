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
            Icon
          </div>
        </div>
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
          Production Time
          </div>
        </div>
        <div className="header">
          <div className="info">
            Cost
          </div>
        </div>
        <div className="header">
          <div className="info">
            Profit
          </div>
        </div>
        <div className="header">
          <div className="info">
            PF/Min
          </div>
        </div>
        <div className="header">
          <div className="info">
            PF/Hour
          </div>
        </div>
      </div>
      {items.map((p: any) => {
        return (
          <div className="row">
            <div className="column">
              <img className="icon" src={`/img/${p.slug}.png`}/>
            </div>
            <div className="column">
              <Link href={`/items/${p.slug}`}>
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
                {p.productionTime}
              </div>
            </div>
            <div className="column">
              <div className="info">
                {p.maxValue}
              </div>
            </div>
            <div className="column">
              <div className="info">
                {p.profit.cost}
              </div>
            </div>
            <div className="column">
              <div className="info">
                {p.profit.profit}
              </div>
            </div>
            <div className="column">
              <div className="info">
                {p.profit.profitByMinute}
              </div>
            </div>
            <div className="column">
              <div className="info">
                {p.profit.profitByHour}
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

          .icon {
            width: 48.5px;
            height: 53.5px;

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

import { QUERY_BUILDINGS } from "../lib/building";
import { useQuery } from "@apollo/react-hooks";
import Link from 'next/link';

function Page() {

  const { loading, error, data } = useQuery(
    QUERY_BUILDINGS
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
    buildings
  } = data;

  return (
    <div className="table">
      <div className="row">
        <div className="header">
          Building
        </div>
        <div className="header">
          Items
        </div>
        <div className="header">
          Slots
        </div>
        <div className="header">
          Next Slot
        </div>
        <div className="header">
          Parallel
        </div>
      </div>
      {buildings.map((p: any) => {
        return (
          <div className="row">
            <div className="column">
              <Link href={`/buildings/${p._id}`}>
                <a className="info link">{p.name}</a>
              </Link>
            </div>
            <div className="column">
              <div className="info">
                {p.items.length}
              </div>
            </div>
            <div className="column">
              <div className="info">
                {p.slots}
              </div>
            </div>
            <div className="column">
              <div className="info">
                {p.nextSlot}
              </div>
            </div>
            <div className="column">
              <div className="info">
                {p.parallel && 'Sim' || 'Não'}
              </div>
            </div>
          </div>
        )
      })}
      <style jsx>
        {`
          .table {
            padding: 25px;
            max-width: 100%;
          }

          .row {
            padding: 5px;
            display: flex;
          }

          .column, .header {
            flex: 1 1 200px;
          }

          .header {
            color: #ffffff;
            text-align: left;
            padding-left: 10px;
          }


          .info {
            color: #ffffff;
            padding-left: 10px;
          }

          .link {
            text-decoration: none;
            color: #afafaf;
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

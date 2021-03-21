import { QUERY_PROFITS } from "../lib/profits";
import { useQuery } from "@apollo/react-hooks";
import Link from 'next/link';

function Page() {

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

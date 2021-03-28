import { request, gql } from 'graphql-request'
import Link from 'next/link';
import { QUERY_BUILDING } from '../../lib/building';
import { useQuery } from "@apollo/react-hooks";
import build from 'next/dist/build';

const QUERY_PATHS = gql`
  query {
    buildings {
      _id
    }
  }
`


interface BuildingProps {
  id: string;
}

function Page({ id }: BuildingProps) {

  const { loading, error, data } = useQuery(
    QUERY_BUILDING,
    {variables:
      { _id: id }
    }
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
    building
  } = data;

  const {
    name,
    items
  } = building;

  return (
    <div className="building">
      <div className="building__title">
        {name}
      </div>
      <div className="building__items">
        {items.map((p: any) => {
          return (
            <div className="row">
              <div className="column">
                <Link href={`/items/${p.slug}`}>
                  <a className="link">{p.name}</a>
                </Link>
              </div>
              <div className="column">
                {p.productionTime}
              </div>
              <div className="column">
                {p.maxValue}
              </div>
            </div>
          )
        })}
      </div>


      <div>
        <Link href="/buildings">
          <a className="link">Buildings</a>
        </Link>
      </div>
      <style jsx>
        {`
          .building {
            padding: 25px;
          }

          .building__title {
            padding: 25px;
            font-size: 20px;
          }

          .building__items {
            padding: 10px;
          }

          .row {
            display: flex;
            padding: 5px;
          }

          .column {
            flex: 1 1 200px;
            color: #ffffff;
          }

          .link {
            color: #ffffff;
            text-decoration: none;
          }

          .link:hover {
            text-decoration: underline;
          }
        `}
      </style>
    </div>
  )
}

export async function getStaticPaths() {

  const data = await request('http://localhost:4000', QUERY_PATHS);

  const { buildings } = data;

  const paths = buildings.map(b => {
    return {
      params: { id: [b._id]}
    }
  })


  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(ctx: any) {

  const { params } = ctx;

  const { id } = params;

  return {
    props: {
      id: id[0],

    }
  }
}

export default Page;

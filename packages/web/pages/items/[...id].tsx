import { request, gql } from 'graphql-request'
import Link from 'next/link';
import { QUERY_ITEM } from '../../lib/items';
import { useQuery } from "@apollo/react-hooks";

const QUERY_PATHS = gql`
  query {
    items {
      _id
    }
  }
`


interface BuildingProps {
  id: string;
}

function Page({ id }: BuildingProps) {

  const { loading, error, data } = useQuery(
    QUERY_ITEM,
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
    item
  } = data;




  return (
    <div className="panel">
      <div className="panel__title">
        {item.name}
      </div>
      <div className="panel__building">
        <Link href={`/buildings/${item.building._id}`}>
          <a className="link">{item.building.name}</a>
        </Link>
      </div>

      <div className="panel_used">
        {item.usedIn.map((p: any) => {
          return (
            <div>{p.name}</div>
          )
        })}
      </div>
      <div>
        <Link href="/items">
          <a>Items</a>
        </Link>
      </div>
      <style jsx>
        {`
          .panel {
            padding: 25px;
          }

          .panel__title {
            padding: 5px;
            font-size: 20px;
            line-height: 20px;
            color: #ffffff;
          }
          .link {
            color: #ffffff;
          }
        `}
      </style>
    </div>
  )
}

export async function getStaticPaths() {

  const data = await request('http://localhost:4000', QUERY_PATHS);

  const { items } = data;

  const paths = items.map((b: any) => {
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

import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_PROFIT_BUILDINGS } from '@pbr-simcity/web/lib/profits';

interface BuildingsProfitProps {
  dummy?: boolean;
}

const BuildingsProfit: FC<BuildingsProfitProps> = () => {
  const { loading, error, data } = useQuery(QUERY_PROFIT_BUILDINGS);

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

  const {
    buildings
  } = data;

  return (
    <div className="buildings__profit">
      <h2>Buildings</h2>
      <div className="buildings">
      {buildings.map((a: any) => {
        return (
          <div key={a.slug} className="building">
            <div>
            {a.name}
            </div>
            <div className="building__slots">
              {Array.from(Array(a.slots).keys()).map((a: number) => {
                return (
                  <div className="slot icon" key={a}>{a}</div>
                )
              })}
            </div>
          </div>
        )
      })}
      </div>
      <style jsx>
        {`
          .buildings__profit {
            flex: 0 1 800px;
            max-width: 800px;
            padding: 20px;
          }
          .icon {
            width: 33.95px;
            height: 37.45px;
            margin: 2px;
            line-height: 37.45px;
            text-align: center;
            background-color: #000000;
            color: #ffffff;
            border-radius: 5px;
            cursor: pointer;
          }

          .building__slots {
            display: flex;
            flex-wrap: wrap;
          }

          .slot {
            flex: 0 0 33.95px;
          }




        `}
      </style>
    </div>
  )
}

export default BuildingsProfit;

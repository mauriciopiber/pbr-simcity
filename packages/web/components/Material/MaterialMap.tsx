import React, { FC } from 'react';
import DependsItem from './DependsItem';
import UsedInItem from './UsedInItemCard';

export interface MaterialMapProps {
  name: string;
  usedIn: any[],
  depends: any[]
}

const MaterialMap: FC<MaterialMapProps> = ({name="My Title", usedIn=[], depends=[]}) => {


  return (
    <div>
      <h1 data-testid="material-title">Material Map</h1>
      <h2 data-testid="material-subtitle">{name}</h2>
      <div className="material__panel">
        {depends.length > 0 && (<div className="material__panel__item">
        <h3>Depends</h3>
        <>
        {depends.map(p => {
          return (
            <DependsItem _id={p.item._id} name={p.item.name} quantity={p.quantity} productionTime={p.item.productionTime} slug={p.item.slug}/>
            // <div>
            // <div>{p.item.name}</div>
            // <div>{p.quantity}</div>
            // </div>
          )
        })}
        </>
        </div>)}

      {usedIn.length > 0 && (<div className="material__panel__item">
        <h3>Used in</h3>
        <>
        {usedIn.map(p => {
           return (
            <UsedInItem _id={p._id} name={p.name}productionTime={p.productionTime} slug={p.slug}/>
          )
        })}
        </>
      </div>)}
      </div>
      <style jsx>
        {`
          .material__panel {
            display: flex;
            justify-content: center;
          }

          .material__panel__item {
            margin: 0 15px;
            padding: 25px;
            box-sizing: border-box;
            background-color: #EAEAEA;
          }
        `}
      </style>
    </div>
  )
}




export default MaterialMap;

import React, { FC } from 'react';
//import Link from 'next/link';

export interface BuildingFlowProps {
  item: any;
}

const BuildingFlow: FC<BuildingFlowProps> = ({ item }) => {
  //const flow = [];

  //item.depends.map((p: any) => {});
  return (
    <div>
      Building Flow
      {item._id}
    </div>
  );
};

export default BuildingFlow;

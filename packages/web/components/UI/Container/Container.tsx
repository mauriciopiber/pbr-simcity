import React, { FC, ReactNode } from 'react';

interface IContainerProps {
  children: ReactNode;
}


const Container: FC<IContainerProps> = ({ children }) => {
  return <div className="container">{children}</div>;
}

export default Container;

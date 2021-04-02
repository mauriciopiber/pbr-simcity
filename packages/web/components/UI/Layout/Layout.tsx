import React, { FC, ReactNode } from 'react';
import Header from './Header';

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      {children}
      <style jsx>
        {`
          .layout {
            max-width: 1400px;
            margin: 0 auto;
          }
        `}
      </style>
    </div>
  );
};

export default Layout;

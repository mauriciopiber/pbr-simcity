import React, { FC, ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => (
  <div className="layout">
    <Header />
    {children}
    <Footer />
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

export default Layout;

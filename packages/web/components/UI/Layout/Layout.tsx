import Header from "./Header";

function Layout({ children }) {
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
}

export default Layout;

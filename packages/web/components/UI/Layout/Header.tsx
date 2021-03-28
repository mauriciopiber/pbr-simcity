import Link from 'next/link';

function Header() {
  return (
    <div className="header">
      <Link href="/buildings">
        <div data-testid="menu-buildings" className="header__item">
          <a>Buildings</a>
        </div>
      </Link>
      <Link href="/items">
        <div data-testid="menu-items" className="header__item">
          <a>Items</a>
        </div>
      </Link>
      <Link href="/profits">
        <div data-testid="menu-profits" className="header__item">
          <a>Profits</a>
        </div>
      </Link>
      <style jsx>
        {`
          .header {
            display: flex;
            background-color: #033036;
          }

          .header__item {
            margin: 5px 10px;
            border: 1px solid #ffffff;
            width: 120px;
            font-size: 20px;
            padding: 5px;
            box-sizing: border-box;
            cursor: pointer;
            color: #ffffff;
          }

        `}
      </style>
    </div>
  )
}


export default Header;

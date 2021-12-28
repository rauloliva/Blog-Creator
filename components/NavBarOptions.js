import Link from "next/link";
import { Fragment } from "react";

const NavBarOptions = ({ section }) => (
  <ul className="nav__list">
    {section === "footer" ? (
      <Fragment>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link href="/info/contact">
            <a>Contact</a>
          </Link>
        </li>
      </Fragment>
    ) : (
      <Fragment>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link href="/admin">
            <a>Admin</a>
          </Link>
        </li>
      </Fragment>
    )}
  </ul>
);

export default NavBarOptions;

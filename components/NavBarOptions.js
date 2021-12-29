import Link from "next/link";
import { Fragment } from "react";

const NavBarOptions = ({ section }) => {
  const access_token = localStorage.getItem("access_token");

  let access_option = (
    <Link href="/">
      <a>Log In</a>
    </Link>
  );
  if (access_token) {
    access_option = (
      <Link href="/admin">
        <a>Admin</a>
      </Link>
    );
  }

  return (
    <ul className="nav__list">
      {section === "footer" ? (
        <Fragment>
          <li>
            <Link href="/blog">
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
            <Link href="/blog">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>{access_option}</li>
        </Fragment>
      )}
    </ul>
  );
};
export default NavBarOptions;

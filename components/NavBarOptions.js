import Link from "next/link";
import { Fragment } from "react";

const NavBarOptions = ({ section }) => {
  const access_token = localStorage.getItem("access_token");

  let access_options = (
    <Fragment>
      <li>
        <Link href="/">
          <a>Log In</a>
        </Link>
      </li>
      <li>
        <Link href="/sign-up">
          <a>Sign Up</a>
        </Link>
      </li>
    </Fragment>
  );

  if (access_token) {
    access_options = (
      <li>
        <Link href="/admin">
          <a>Admin</a>
        </Link>
      </li>
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

          {access_options}

          <li>
            <Link href="/blog/search">
              <a>Search</a>
            </Link>
          </li>
        </Fragment>
      )}
    </ul>
  );
};
export default NavBarOptions;

import Link from "next/link";
import { useRouter } from "next/router";

const NavbarAdmin = () => {
  const router = useRouter();

  const logOutHanlder = () => {
    localStorage.removeItem("access_token");
    router.push("/");
  };

  return (
    <div className="nav__options">
      <Link href="/admin" passHref>
        <h1 className="nav__init">Welcome</h1>
      </Link>

      <Link href="/admin/profile">
        <a className="btn__link">My Profile</a>
      </Link>

      <Link href="/admin/new-blog">
        <a className="btn__link">Create New Blog</a>
      </Link>

      <Link href="/admin/my-blogs">
        <a className="btn__link">My Blogs</a>
      </Link>

      <Link href="/blog/search">
        <a className="btn__link">Search Blogs</a>
      </Link>

      <button
        className="btn__active btn__color-p-s mt2"
        onClick={logOutHanlder}
      >
        Log Out
      </button>
    </div>
  );
};

export default NavbarAdmin;

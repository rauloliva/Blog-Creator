import Link from "next/link";

const Redirect = () => {
  return (
    <div>
      <h3>You do not have access</h3>
      <Link href="/">
        <a>Log In</a>
      </Link>
    </div>
  );
};

export default Redirect;

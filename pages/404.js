import { useRouter } from "next/router";
import { Fragment } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const NotFound404 = () => {
  const router = useRouter();

  return (
    <Fragment>
      <NavBar />
      <div className="not-found">
        <h1>404 Page not Found</h1>
        <p>Sorry but we could not find the page you requested.</p>
        <p>Page requested: {router.asPath}</p>
      </div>
      <Footer />
    </Fragment>
  );
};

export default NotFound404;

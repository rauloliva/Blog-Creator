import Image from "next/image";
import { Fragment } from "react";
import Footer from "../../components/Footer";
import Metadata from "../../components/Metadata";
import NavBar from "../../components/NavBar";
const metadata = {
  pageTitle: "Access Denied",
  description: "The user does not have access to the page",
  keywords: "access denied, access, denied, access denied page",
};

const Unauthorized = () => {
  return (
    <Fragment>
      <Metadata {...metadata} />
      <NavBar />
      <div className="unauthorized">
        <h2 className="unauthorized__title">Access Denied</h2>
        <div>
          <Image
            src="https://img.icons8.com/fluency/120/000000/stop-sign.png"
            width="120"
            height="120"
            alt="Access Denied"
          />
        </div>

        <h3>You do not have access to view this page.</h3>
        <h3>Please try to Log In or Sign In to get your access.</h3>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Unauthorized;

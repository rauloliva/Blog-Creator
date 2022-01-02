import { Fragment } from "react";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import Navbar from "../components/NavBar";
import SignUpForm from "../components/SignUpForm";

const SignUp = () => {
  return (
    <Fragment>
      <Modal />
      <Navbar />
      <div className="nav__title-container">
        <h1 className="nav__title">sign up</h1>
      </div>

      <div className="form__sign-up-container">
        <SignUpForm />
      </div>
      <Footer />
    </Fragment>
  );
};

export default SignUp;

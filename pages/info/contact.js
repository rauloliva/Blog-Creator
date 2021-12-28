import { Fragment } from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import ContactCard from "../../components/ContactCard";

const Contact = () => {
  return (
    <Fragment>
      <NavBar />
      <div className="contact__title-container">
        <h1 className="contact__title">contact</h1>
      </div>
      <div className="contact">
        <div className="contact__container">
          <ContactCard
            href="mailto:oliva.raul12@gmail.com"
            icon="email"
            title="Email"
            paragraph="oliva.raul12@gmail.com"
          />

          <ContactCard
            href="https://www.facebook.com/raul.oliva.7"
            icon="facebook"
            title="Facebook"
            paragraph="raul.oliva.7"
          />

          <ContactCard
            href="https://github.com/rauloliva"
            icon="github"
            title="Github"
            paragraph="rauloliva"
          />
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Contact;

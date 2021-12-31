import { Fragment } from "react";
import Metadata from "./Metadata";
import Modal from "./Modal";
import Navbar from "./NavbarAdmin";

const LayoutAdmin = (props) => (
  <Fragment>
    <Metadata
      pageTitle={props.pageTitle}
      description={props.description}
      keywords={props.keywords}
    />

    <div className="nav__container">
      <Modal />
      <Navbar />
      {props.children}
    </div>
  </Fragment>
);

export default LayoutAdmin;

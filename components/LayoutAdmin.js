import Modal from "./Modal";
import Navbar from "./NavbarAdmin";

const LayoutAdmin = (props) => {
  return (
    <div className="nav__container">
      <Modal />
      <Navbar />
      {props.children}
    </div>
  );
};

export default LayoutAdmin;

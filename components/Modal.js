import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/actions";

const Modal = () => {
  const dispatch = useDispatch();

  const { isActive, header, body, error } = useSelector((state) => state.modal);

  const modalHandler = (e) => {
    const container = e.target.className;
    if (
      container === "modal modal--active" ||
      container.includes("btn__active")
    ) {
      dispatch(modalActions.setModal(false, { header: "", body: "" }));
    }
  };

  return (
    <div
      className={`modal ${isActive ? "modal--active" : "modal--inactive"}`}
      onClick={modalHandler}
    >
      <div className={`modal__content ${error ? "modal--error" : ""}`}>
        <div className="modal__header">
          <h2>{header}</h2>
        </div>
        <div className="modal__body">
          <p>{body}</p>
          {error && (
            <div>
              <p>Please try again later</p>
            </div>
          )}
        </div>
        <div className="modal__footer">
          <button
            className={`btn__active ${error ? "btn__error" : ""}`}
            onClick={modalHandler}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

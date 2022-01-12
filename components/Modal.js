import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/actions";
let actionCb;

const Modal = () => {
  const dispatch = useDispatch();

  const [enableAction, setEnableAction] = useState(false);

  const { isActive, header, body, error, action } = useSelector(
    (state) => state.modal
  );
  if (action) {
    actionCb = action;
  }

  const modalHandler = useCallback((e) => {
    const container = e.target.className;
    if (
      container === "modal modal--active" ||
      container.includes("btn__active")
    ) {
      dispatch(modalActions.setModal(false, { header: "", body: "" }));
    }
  }, []);

  const actionHandler = () => {
    setEnableAction(true);
  };

  if (!isActive && actionCb && enableAction) {
    actionCb();
    setEnableAction(false);
  }

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
          {action && (
            <button
              className={`btn__active not-block`}
              onClick={(e) => {
                modalHandler(e);
                actionHandler();
              }}
            >
              Proceed
            </button>
          )}
          <button
            className={`btn__active not-block ${error ? "btn__error" : ""}`}
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

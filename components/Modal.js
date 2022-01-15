import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/actions";
let actionCb;

const Modal = () => {
  const dispatch = useDispatch();

  const [enableAction, setEnableAction] = useState(false);

  const { isActive, header, body, error, actions } = useSelector(
    (state) => state.modal
  );

  const modalHandler = useCallback((e) => {
    const container = e.target.className;
    if (
      container === "modal modal--active" ||
      container.includes("btn__active")
    ) {
      dispatch(modalActions.setModal(false, { header: "", body: "" }));
    }
  }, [ dispatch ]);

  if (!isActive && actionCb && enableAction) {
    actionCb();
    setEnableAction(false);
  }

  let btnOptions;
  if (actions) {
    btnOptions = actions.map((action) => {
      const clickHandler = (e) => {
        modalHandler(e);
        if (action.onClick) {
          action.onClick();
        }
      };

      return (
        <button
          key={action.label}
          className="btn__active not-block"
          onClick={clickHandler}
        >
          {action.label}
        </button>
      );
    });
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
          { btnOptions }
        </div>
      </div>
    </div>
  );
};

export default Modal;

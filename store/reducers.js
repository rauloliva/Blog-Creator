import { combineReducers } from "redux";
import { types } from "./types";

const defaultModalState = {
  isActive: false,
  header: "",
  body: "",
  error: false,
};

const modalReducer = (state = defaultModalState, { type, payload }) => {
  switch (type) {
    case types.MODAL_ACTIVE:
      state = {
        isActive: true,
        header: payload.header,
        body: payload.body,
        error: payload.error,
        action: payload.action,
      };
      break;

    case types.MODAL_INACTIVE:
      state = {
        isActive: false,
        header: "",
        body: "",
        error: false,
      };
      break;
    default:
      return state;
  }
  return state;
};

const reducers = {
  modal: modalReducer,
};

export default combineReducers(reducers);

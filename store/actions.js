import { types } from "./types";

const setModal = (isActive, modalData) => ({
  type: isActive ? types.MODAL_ACTIVE : types.MODAL_INACTIVE,
  payload: modalData,
});

export const modalActions = {
  setModal,
};

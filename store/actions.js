import { types } from './types'

const setUser = user => ({
    type: user === null ? types.LOGGING_OUT : types.LOGGING_SUCCESS,
    payload: user
})

const setModal = (isActive, modalData) => ({
    type: isActive ? types.MODAL_ACTIVE : types.MODAL_INACTIVE,
    payload: modalData
})

export const userActions = {
    setUser
}

export const modalActions = {
    setModal
}
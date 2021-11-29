import { combineReducers } from 'redux'
import { types } from './types'

const defaultUserState = {
  isAuthenticated: false,
  user: {},
}

const defaultModalState = {
  isActive: false,
  header: '',
  body: '',
  error: false
}

const userReducer = (state = defaultUserState, { type, payload }) => {
  switch (type) {
    case types.LOGGING_SUCCESS:
      state = {
        isAuthenticated: true,
        user: payload,
      }
      break
    case types.LOGGING_OUT:
      state = defaultUserState
      break
    default:
      return state
  }
  return state
}

const modalReducer = (state = defaultModalState, { type, payload }) => {
  switch (type) {
    case types.MODAL_ACTIVE:
      state = {
        isActive: true,
        header: payload.header,
        body: payload.body,
        error: payload.error
      }
      break;
    
    case types.MODAL_INACTIVE:
      state = {
        isActive: false,
        header: '',
        body: '',
        error: false
      }
      break;
    default:
      return state
  }
  return state
}

const reducers = {
    user: userReducer,
    modal: modalReducer,
}

export default combineReducers(reducers)

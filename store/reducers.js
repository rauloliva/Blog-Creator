import { combineReducers } from 'redux'
import { types } from './types'

const defaultUserState = {
  isAuthenticated: false,
  user: {},
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

const reducers = {
    user: userReducer,
}

export default combineReducers(reducers)

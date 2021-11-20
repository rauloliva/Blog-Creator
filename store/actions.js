import { types } from './types'

const setUser = user => ({
    type: user === null ? types.LOGGING_OUT : types.LOGGING_SUCCESS,
    payload: user
})

export const userActions = {
    setUser
}
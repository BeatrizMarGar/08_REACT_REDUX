import { auth } from './reducers'
import { AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, AUTH_LOGOUT_SUCCESS, TAGS_LOADED } from './types'

// TESTEO UN REDUCER

describe('auth', () => {
    test('should manage AUTH_LOGIN_SUCCESS action', () => {
        const action = {
            type: AUTH_LOGIN_SUCCESS
        }
        expect(auth(undefined, action)).toBe(true)
    });
    test('should manage AUTH_LOGOUT_SUCCESS action', () => {
        const action = {
            type: AUTH_LOGOUT_SUCCESS
        }
        expect(auth(undefined, action)).toEqual(false)
    });
    test('should manage ANY action', () => {
        const action = {
            type: 'ANY'
        }
        const initialState = true
        expect(auth(initialState, action)).toEqual(initialState)
    });
})

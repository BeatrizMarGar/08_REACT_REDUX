import { auth } from './reducers'
import { AUTH_LOGIN, AUTH_LOGOUT, TAGS_LOADED } from './types'

// TESTEO UN REDUCER

describe('auth', () => {
    test('should manage AUTH_LOGIN action', () => {
        const action = {
            type: AUTH_LOGIN
        }
        expect(auth(undefined, action)).toEqual(true)
    });
    test('should manage AUTH_LOGOUT action', () => {
        const action = {
            type: AUTH_LOGOUT
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
/*
describe ('tags', () => {
    test('should manage tags loaded - TAGS_LOADED', () => {
        const action = {
            type: TAGS_LOADED,
            payload: ['tags']
    }
    const expectedResult = {
        data
    })
})
*/
import { authLogin, authLogout, adsLoaded, authLoginRequest } from './actions'
import { ADS_LOADED, AUTH_LOGIN, AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT } from "./types";

// TESTEO ACCIÓN SÍNCRONA

describe('authLogin y authLogout', () => {
    test('should return an action with type AUTH_LOGIN_REQUEST', () =>  {
        const expectedResult = {
            type: AUTH_LOGIN_REQUEST
        }
        const result = authLoginRequest()
        expect(result).toEqual(expectedResult)
    });
    test('should return an action with type AUTH_LOGOUT', () =>  {
        const expectedResult = {
            type: AUTH_LOGOUT
        }
        const result = authLogout()
        expect(result).toMatchObject(expectedResult)
    });
})

describe('adsLoaded', () => {
    test('should return an action whith type ADS_LOADED', () => {
        const ads = 'ads'
        const expectedResult = {
            type: ADS_LOADED,
            payload: ads
        }
        expect(adsLoaded(ads)).toEqual(expectedResult)
    })
})

/*
// TESTEO ACCIÓN ASÍNCRONA
*/

describe('authLogin', () => {
    const credentials = 'credentials';
    const action = authLogin(credentials)
    describe("when login api = resolves", () => {
        const api = {auth: {login: jest.fn().mockResolvedValue()}}
        const getState = () => {}
        const dispatch = jest.fn()
        const history = {
            location: {},
            replace: jest.fn()
        }
    test('should dispatch an auth_login_request action', () => {
        action(dispatch, getState, {api, history})
        expect(dispatch).toHaveBeenCalledWith({type: AUTH_LOGIN_REQUEST})
    })
    test('should call api.auth.login', () => {
        action(dispatch, getState, {api, history})
        expect(api.auth.login).toHaveBeenCalledWith(credentials)
    })
    test('should dispatch an auth_login_success action', async () => {
        const dispatch = jest.fn()
        await action(dispatch, getState, {api, history})
        expect(dispatch).toHaveBeenCalledWith({type: AUTH_LOGIN_SUCCESS})
    })
    test('should redirect', async () => {
        const dispatch = jest.fn()
        await action(dispatch, getState, {api, history});
        expect(history.replace).toHaveBeenCalledWith({pathname: "/"})
    })
    })

    describe("when login api = rejects", () => {
        const error = 'Unauthorized'
        const api = {auth: {login: jest.fn()}}
        const dispatch = jest.fn()
        const getState = () => {}
    test('should dispatch an auth_login_failure action', async () => {
        
        const dispatch = jest.fn()
        api.auth.login.mockRejectedValue(error)
        await action(dispatch,getState, {api})
        expect(dispatch).toHaveBeenCalledWith({
            type: AUTH_LOGIN_FAILURE,
            payload: error,
            error: true,
        })
    })
    })
})

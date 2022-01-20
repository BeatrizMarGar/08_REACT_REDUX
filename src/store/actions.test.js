import { authLogin, authLogout, adsLoaded } from './actions'
import { ADS_LOADED, AUTH_LOGIN, AUTH_LOGOUT } from "./types";

// TESTEO ACCIÓN SÍNCRONA

describe('authLogin y authLogout', () => {
    test('should return an action with type AUTH_LOGIN', () =>  {
        const expectedResult = {
            type: AUTH_LOGIN
        }
        const result = authLogin()
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

describe('', () => {
    test('', () => {
        const expectedResult = {}
        expect().toEqual(expectedResult)
    })
})

// TESTEO UN SELECTOR

describe('', () => {
    test('', () => {
        const expectedResult = {}
        expect().toEqual(expectedResult)
    })
})

// TESTEO UN COMPONENTE CON SNAPSHOT TESTING

describe('', () => {
    test('', () => {
        const expectedResult = {}
        expect().toEqual(expectedResult)
    })
})

// TESTEO UN COMPONENTE CON ACCIÓN DEL STORE MOCKEANDO LA ACCIÓN

describe('', () => {
    test('', () => {
        const expectedResult = {}
        expect().toEqual(expectedResult)
    })
})
*/
import { authLogin } from './actions'
import { AUTH_LOGIN } from "./types";

// TESTEO ACCIÓN SÍNCRONA

describe('authLogin', () => {
    test('should return an action with type AUTH_LOGIN', () =>  {
        const expectedResult = {
            type: AUTH_LOGIN
        }
        const result = authLogin()
        expect(result).toEqual(expectedResult)
    })
})

// TESTEO ACCIÓN ASÍNCRONA
// TESTEO UN REDUCER
// TESTEO UN SELECTOR
// TESTEO UN COMPONENTE CON SNAPSHOT TESTING
// TESTEO UN COMPONENTE CON ACCIÓN DEL STORE MOCKEANDO LA ACCIÓN
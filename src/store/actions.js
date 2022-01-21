import { login } from "../components/auth/service";
import { ADS_LOADED, AUTH_LOGIN, AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, TAGS_LOADED } from "./types";

export function authLogin(credentials){
    console.log(credentials + " auth")
    
    return async function (dispatch, getState){
        dispatch(authLoginRequest())
        try{
            await login(credentials)
            dispatch(authLoginSuccess())
        } catch (error) {
            dispatch(authLoginFailure(error))
        }
    };
}

export function authLogout(){
    console.log("fuera")
    return{
        type: AUTH_LOGOUT,
    }
}

export function adsLoaded (ads) {
    return {
        type: ADS_LOADED,
        payload: ads,
    }
}

export function tagsLoaded (tags) {
    return {
        type: TAGS_LOADED,
        payload: tags,
    }
}

/*
*/

export function authLoginRequest(){
    return {
        type: AUTH_LOGIN_REQUEST,
        //no necesito payload 
    };
}
export function authLoginSuccess(){
    return {
        type: AUTH_LOGIN_SUCCESS,
        //no necesito payload
    };
}
export function authLoginFailure(error){
    console.log("error " + error)
    return {
        type: AUTH_LOGIN_FAILURE,
        //añado payload con info del error
        error: true,
        payload: error,
    };
}

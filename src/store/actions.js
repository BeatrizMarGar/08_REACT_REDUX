
import { func } from "prop-types";
import { ADS_LOADED, AUTH_LOGIN, AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, TAGS_LOADED, UI_RESET_ERROR, ADS_LOADED_SUCCESS } from "./types";

export function authLogin(credentials){
    
    return async function (dispatch, getState, { api, history }){
        //return async function (dispatch, getState, { api }){
        dispatch(authLoginRequest())
        try{
            await api.auth.login(credentials)
            dispatch(authLoginSuccess())
            const { from } = history.location.state || { from: { pathname: '/' } };
            history.replace(from);
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

export function uiResetError(){
    console.log("hola")
    return {
        type: UI_RESET_ERROR
    }
}

export function loadAds(){
    //DISPATCH LOADADSREQUEST
    return async function(dispatch, getState, { api }){
        try{
            const ads = await api.ads.getAdverts()
            dispatch(adsLoaded(ads))
        } catch (error) {
            //DISPATCH LOADADSFAILURE
        }
    };
}
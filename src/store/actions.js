
import { func } from "prop-types";
import { getAd } from "./selectors";
import { AD_LOADED_SUCCESS, AD_LOADED_FAILURE, AD_LOADED_REQUEST, ADS_LOADED, AUTH_LOGIN, AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, TAGS_LOADED, UI_RESET_ERROR, ADS_LOADED_SUCCESS, ADS_LOADED_REQUEST, ADS_LOADED_FAILURE } from "./types";

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


export function adsRequest(){
    return {
        type: ADS_LOADED_REQUEST,
        //no necesito payload 
    };
}
export function adsFailure(error){
    console.log("error " + error)
    return {
        type: ADS_LOADED_FAILURE,
        //añado payload con info del error
        error: true,
        payload: error,
    };
}

export function loadAdFailure(error){
    console.log("error " + error)
    return {
        type: AD_LOADED_FAILURE,
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
        dispatch(adsRequest())
        try{
            const ads = await api.ads.getAdverts()
            dispatch(adsLoaded(ads))
        } catch (error) {
            dispatch(adsFailure(error))
            //DISPATCH LOADADSFAILURE
        }
    };
}

export function adLoaded(ad){
    
    return {
        type: AD_LOADED_SUCCESS,
        payload: ad,
    }
}

export function loadSingleAd(AdvertId){
    
        return async function (dispatch, getState, {api}){
            const ad = getAd(getState(), AdvertId)
            if (ad) {
                return;
            }
        //dispatch loadadrequ
        try{
            const ad = await api.ads.getAdvert(AdvertId)
            dispatch(adLoaded(ad))
        }
        catch (error) {
            dispatch(loadAdFailure(error))
        }
    }

}
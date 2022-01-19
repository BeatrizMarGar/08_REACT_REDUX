import { ADS_LOADED, AUTH_LOGIN, AUTH_LOGOUT, TAGS_LOADED } from "./types";

export function authLogin(){
    console.log("logeado")
    return {
        type: AUTH_LOGIN,
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

import { areAdsLoaded, getAd} from "./selectors";
import { AD_LOADED_SUCCESS, AD_LOADED_FAILURE, ADS_LOADED, AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, TAGS_LOADED, UI_RESET_ERROR, ADS_LOADED_REQUEST, ADS_LOADED_FAILURE, AD_CREATED_SUCCESS, AD_DELETED_SUCCESS, TAGS_LOADED_REQUEST, TAGS_LOADED_FAILURE, AD_LOADED_REQUEST, AD_DELETED_FAILURE, AD_DELETED_REQUEST, AD_CREATED_REQUEST, AD_CREATED_FAILURE } from "./types";

export function authLogin(credentials){
    return async function (dispatch, getState, { api, history }){
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


export function getAllTags(){
    return async function (dispatch, getState, { api, history }){
        dispatch(tagsRequest())
        try{
            const result = await api.ads.getTags()
            dispatch(tagsLoaded(result))
        } catch (error) {
            dispatch(tagsFailure(error))
        }
    };
}


export function authLogout(){
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

export function tagsRequest (tags) {
    return {
        type: TAGS_LOADED_REQUEST,
        payload: tags,
    }
}

export function tagsFailure (tags) {
    return {
        type: TAGS_LOADED_FAILURE,
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
    return {
        type: ADS_LOADED_FAILURE,
        //añado payload con info del error
        error: true,
        payload: error,
    };
}

export function loadAdFailure(error){
    return {
        type: AD_LOADED_FAILURE,
        //añado payload con info del error
        error: true,
        payload: error,
    };
}
export function uiResetError(){
    return {
        type: UI_RESET_ERROR
    }
}

export function loadAds(){
    return async function(dispatch, getState, { api }){
        const knowloadads = areAdsLoaded(getState())
        if(knowloadads){
            return;
        }
        dispatch(adsRequest())
        try{
            const ads = await api.ads.getAdverts()
            dispatch(adsLoaded(ads))
        } catch (error) {
            dispatch(adsFailure(error))
        }
    };
}

export function adLoaded(ad){
    
    return {
        type: AD_LOADED_SUCCESS,
        payload: ad,
    }
}

export function loadAdRequest(ad){
    
    return {
        type: AD_LOADED_REQUEST,
        payload: ad,
    }
}


export function loadSingleAd(AdvertId){
    
        return async function (dispatch, getState, {api, history}){
            const ad = getAd(getState(), AdvertId)
            if (ad) {
                return;
            }
        dispatch(loadAdRequest(ad))
        try{
            const ad = await api.ads.getAdvert(AdvertId)
            dispatch(adLoaded(ad))
        }
        catch (error) {
            dispatch(loadAdFailure(error))
            if(error.status === 404){
                history.push('/404')
            }
        }
    }
}

export function adCreated(ad) {
    return {
        type: AD_CREATED_SUCCESS,
        payload: ad
    }
}

export function adCreated_failure(error){
    return {
        type: AD_CREATED_FAILURE,
        error: true,
        payload: error,
    };
}

export function adCreated_request(ad) {
    return {
        type: AD_CREATED_REQUEST,
        payload: ad
    }
}

export function adRemovedRequest(ad) {
    return {
        type: AD_DELETED_REQUEST,
        payload: ad
    }
}

export function adRemoved(ad) {
    return {
        type: AD_DELETED_SUCCESS,
        payload: ad
    }
}
export function adRemovedFailure(error){
    return {
        type: AD_DELETED_FAILURE,
        error: true,
        payload: error,
    };
}


export function createAd(ad){
    return async function (dispatch, getState, {api}){
        dispatch(adCreated_request)
        try {
            const newAd = await api.ads.createAdvert(ad)
            const createdAd = await api.ads.getAdvert(newAd)
            dispatch(adCreated(createdAd))
        } catch (error) {
           dispatch(adCreated_failure)
        }
    }
    
}


export function RemoveAd(advertId){
    return async function (dispatch, getState, {api, history}){
        dispatch(adRemovedRequest)
        try {
            const newAd = await api.ads.deleteAdvert(advertId)
            dispatch(adRemoved(newAd))
            history.push('/adverts')
        } catch (error) {
            dispatch(adRemovedFailure)
        }
    }
    
}
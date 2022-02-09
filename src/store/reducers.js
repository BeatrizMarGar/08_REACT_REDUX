//saber si el user está logueado
import { ADS_LOADED, ADS_LOADED_FAILURE, AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, TAGS_LOADED, UI_RESET_ERROR, ADS_LOADED_REQUEST, AD_LOADED_SUCCESS, AD_LOADED_FAILURE, AD_LOADED_REQUEST, AD_CREATED_SUCCESS, AD_DELETED_FAILURE, AD_DELETED_SUCCESS, AD_DELETED_REQUEST, TAGS_LOADED_REQUEST, AUTH_LOGOUT_SUCCESS, AUTH_LOGOUT_REQUEST, AUTH_LOGOUT_FAILURE } from "./types"

const defaultState = {
    auth: false, //por defecto el usuario no está logeado
    ads: {
        loaded: false,
        data: []
    },
    tags: [],
    ui: {
        isLoading: false,
        error: null,
    }
}

/*
export const reducer = (state = defaultState, action) => {
    switch (action.type){
        case AUTH_LOGIN:
            return {...state, auth: true}
        case AUTH_LOGOUT:
            return {...state, auth: false}
        case ADS_LOADED:
            return {...state, ads: action.payload}
        default:
            return state;
    }
}
*/

export function auth(authstate = defaultState.auth, action){
//devolverá un true o false para el combinedreducer
    switch (action.type){
        //case AUTH_LOGIN:
        case AUTH_LOGIN_SUCCESS:
            return true;
        case AUTH_LOGOUT_SUCCESS:
            return false;
        default:
            return authstate;
    }
}


export function ads(adsState = defaultState.ads, action) {
    switch (action.type){
        case ADS_LOADED_REQUEST:
            return [adsState, action.payload];
        case AD_DELETED_SUCCESS:
                     /*   
            let allAds = adsState.data;

            function arrayRemove(arr, value) { 
            
                return arr.filter(function(ele){ 
                    if (ele.id == value){
                        return ele != value; 
                    }
                });
            }
            var result = arrayRemove(allAds, action.payload);
            return { ...adsState, data: result}*/
            return {...adsState, data: adsState.data.filter(advert => advert.id !== action.payload)};
        case AD_LOADED_SUCCESS:
        case AD_CREATED_SUCCESS:
            debugger
            return { ...adsState, data: [...adsState.data, action.payload]}
        case ADS_LOADED:
            return {loaded: true, data: action.payload};
        case ADS_LOADED_FAILURE:
        case AD_DELETED_FAILURE:
            return adsState
        default:
            return adsState;
    }
}

export function tags(tagState = defaultState.tags, action) {
    switch (action.type){
        case TAGS_LOADED_REQUEST:
            return {tagState}
        case TAGS_LOADED:
            return {tagState: action.payload};
        default:
            return tagState;
    }
}

export function ui(uiState = defaultState.ui, action){
    switch (action.type) {
        case AUTH_LOGIN_REQUEST:
        case AUTH_LOGOUT_REQUEST:
        case ADS_LOADED_REQUEST:
        case AD_LOADED_REQUEST:
        case AD_DELETED_REQUEST:
            //solo cambio en ui
            return {isLoading: true, error: null};
        case AUTH_LOGIN_SUCCESS:
        case AUTH_LOGOUT_SUCCESS:
        case ADS_LOADED:
        case AD_LOADED_SUCCESS:
            //cambio en auth y ui
            return {isLoading: false, error: null};
        case AUTH_LOGIN_FAILURE:
        case AUTH_LOGOUT_FAILURE:
        case ADS_LOADED_FAILURE:
        case AD_LOADED_FAILURE:
        case AD_DELETED_FAILURE:
            //cambio en auth y ui
            return {isLoading: false, error: action.payload};
        case UI_RESET_ERROR: 
            return { ...uiState, error: null}
        default:
            return uiState
    }
}

/* 
se puede juntar aquí, pero mejor directamente en el index para no tener el valor default

const combinedReducerWithRedux = combineReducers({auth, ads})
export default combinedReducerWithRedux

*/
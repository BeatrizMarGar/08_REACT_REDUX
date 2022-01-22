//saber si el user está logueado
import { combineReducers } from "redux"
import { ADS_LOADED, ADS_LOADED_FAILURE, AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, TAGS_LOADED, UI_RESET_ERROR, ADS_LOADED_REQUEST } from "./types"

const defaultState = {
    auth: false, //por defecto el usuario no está logeado
    ads: [],
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

export function auth(state = defaultState.auth, action){
//devolverá un true o false para el combinedreducer
    switch (action.type){
        //case AUTH_LOGIN:
        case AUTH_LOGIN_SUCCESS:
            return true;
        case AUTH_LOGOUT:
            return false;
        default:
            return state;
    }
}


export function ads(adsState = defaultState.ads, action) {
    switch (action.type){
        case ADS_LOADED_REQUEST:
            console.log("ads request")
            debugger
            return [...adsState, action.payload];
        case ADS_LOADED:
            return action.payload;
        /*case ADS_CREATED:
            return [...adsState, action.payload]
        */
        case ADS_LOADED_FAILURE:
            return ''
        default:
            return adsState;
    }
}

export function tags(tagState = defaultState.tags, action) {
    switch (action.type){
        case TAGS_LOADED:
            return action.payload;
        default:
            return tagState;
    }
}

function combinedReducer(state = defaultState, action){

    return {
        auth: auth(state.auth, action),
        ads: ads(state.ads, action)
    }
}

export function ui(uiState = defaultState.ui, action){
    switch (action.type) {
        case AUTH_LOGIN_REQUEST:
        case ADS_LOADED_REQUEST:
            //solo cambio en ui
            console.log("request")
            return {isLoading: true, error: null};
        case AUTH_LOGIN_SUCCESS:
        case ADS_LOADED:
            //cambio en auth y ui
            console.log("success")
            return {isLoading: false, error: null};
        case AUTH_LOGIN_FAILURE:
        case ADS_LOADED_FAILURE:
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
//saber si el user está logueado
import { combineReducers } from "redux"
import { ADS_LOADED, AUTH_LOGIN, AUTH_LOGOUT, TAGS_LOADED } from "./types"

const defaultState = {
    auth: false, //por defecto el usuario no está logeado
    ads: [],
    tags: [],
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
        case AUTH_LOGIN:
            return true
        case AUTH_LOGOUT:
            return false
        default:
            return state;
    }
}

export function ads(adsState = defaultState.ads, action) {
    switch (action.type){
        case ADS_LOADED:
            return action.payload;
        /*case ADS_CREATED:
            return [...adsState, action.payload]
        */
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
/* 
se puede juntar aquí, pero mejor directamente en el index para no tener el valor default

const combinedReducerWithRedux = combineReducers({auth, ads})
export default combinedReducerWithRedux

*/
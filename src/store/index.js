
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as reducers from './reducers'
import * as auth from '../components/auth/service'
import * as ads from '../components/auth/service'
import thunk from 'redux-thunk';

const rootReducer = combineReducers(reducers)

const api = {auth, ads}

//const logger = store => next => action => {}

function logger(store) {
    return function (next){
        return function (action) {
            console.log(action)
            next(action);
            console.log(store.getState())
        }
    }
}

/*
se sustituye con redux thunk npm install redux-thunk

function thunk(store){
    return function (next){
        return function (action) {
            if (typeof action === 'function') {
                return action(store.dispatch, store.getState)
            }
            return next(action)
        }
    }
}
*/ 

const configureStore = (preloadedState, {history}) => {
    const middleware = [thunk.withExtraArgument({ api, history}), logger]
    const store = createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware( ...middleware)))
    store.subscribe(() => console.log(store.getState()))
    return store;
}

//export default configureStore;
//cada reducer va a una parte concreta del estado

export default configureStore;

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as reducers from './reducers'
import * as auth from '../components/auth/service'
import * as ads from '../components/adverts/service'
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';


const api = {auth, ads}
function logger(store) {
    return function (next){
        return function (action) {
            next(action);
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
    const middleware = [routerMiddleware(history), thunk.withExtraArgument({ api, history}), logger]
    const store = createStore(combineReducers({...reducers, router: connectRouter(history)}), preloadedState, composeWithDevTools(applyMiddleware( ...middleware)))
    return store;
}

//export default configureStore;
//cada reducer va a una parte concreta del estado

export default configureStore;
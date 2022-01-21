
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as reducers from './reducers'

const rootReducer = combineReducers(reducers)

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

const configureStore = (preloadedState) => {
    const store = createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware(thunk, logger)))
    store.subscribe(() => console.log(store.getState()))
    return store;
}

//export default configureStore;
//cada reducer va a una parte concreta del estado

export default configureStore;
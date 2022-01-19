
import { createStore, combineReducers } from 'redux';
import * as reducers from './reducers'

const rootReducer = combineReducers(reducers)

const configureStore = (preloadedState) => {
    const store = createStore(rootReducer, preloadedState)
    store.subscribe(() => console.log(store.getState()))
    return store;
}

//export default configureStore;
//cada reducer va a una parte concreta del estado

export default configureStore;
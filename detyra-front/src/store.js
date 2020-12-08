import  thunk from 'redux-thunk'
import {reducer as formReducer } from 'redux-form';
import allReducers from './redux/reducers/index';
import { createStore, compose, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

// const rootReducer = combineReducers

 const initialState = {}

 const middleware = [thunk];

 const composeEnhancers = composeWithDevTools({
   trace:true
 })

 const store = createStore(
   allReducers,
   composeEnhancers(applyMiddleware(...middleware))
 );
 
 export default store;
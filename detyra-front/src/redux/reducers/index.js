//importimi i krejt reducers
import {loginReducer} from './auth';
import {productsReducer} from './products';
import {combineReducers} from 'redux';
import {connectRouter }  from 'connected-react-router';
import {history} from '../../history/history'; 

const allReducers = combineReducers({
    login: loginReducer,
    products: productsReducer,
    router: connectRouter(history),
})

export default allReducers;
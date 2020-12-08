import {
	FETCH_PRODUCTS_PENDING,
	FETCH_PRODUCTS_SUCCESS,
	FETCH_PRODUCTS_ERROR,
	ADD_PRODUCT_ERROR,
	ADD_PRODUCT_PENDING,
	ADD_PRODUCT_SUCCESS,
} from './types';
import axios from 'axios';
import { API_URL } from '../../constants/constants';

export const getAll = () => async (dispatch) => {
	dispatch({
		type: FETCH_PRODUCTS_PENDING,
	});

	axios
		.get(API_URL + '/product')
		.then((response) => {
			console.log('prods ' + JSON.stringify(response.data));

			dispatch({
				type: FETCH_PRODUCTS_SUCCESS,
				payload: response.data,
			});
			return response.data;
		})
		.catch((error) => {
			dispatch({
				type: FETCH_PRODUCTS_ERROR,
				payload: error.response.data,
			});
			console.log(error);
			return error.response.data;
		});
};

export const addProduct = (title, price, stock, publish_date) => async (dispatch) => {
	dispatch({
		type: ADD_PRODUCT_PENDING,
	});

	axios
		.post(API_URL + '/product/add', { title, price, stock, publish_date })
		.then((response) => {
			console.log('Added ' + JSON.stringify(response.data));
			dispatch({
				type: ADD_PRODUCT_SUCCESS,
				payload: response.data,
			});

			return response.data;
		})
		.catch((error) => {
			dispatch({
				type: ADD_PRODUCT_ERROR,
				payload: error.response.data,
			});
			return error.response.data;
		});
};

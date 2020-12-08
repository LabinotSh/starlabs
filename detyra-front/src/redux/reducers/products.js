import {
	FETCH_PRODUCTS_ERROR,
	FETCH_PRODUCTS_SUCCESS,
	FETCH_PRODUCTS_PENDING,
	ADD_PRODUCT_SUCCESS,
	ADD_PRODUCT_ERROR,
	ADD_PRODUCT_PENDING,
} from '../actions/types';

export const productsReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case FETCH_PRODUCTS_PENDING:
			return { ...state, added:false, loading: true, products: [] };
		case FETCH_PRODUCTS_SUCCESS:
			return { ...state, added:false, loading: false, products: action.payload };
		case FETCH_PRODUCTS_ERROR:
			return { ...state, added:false, loading: false, error: action.payload };
		case ADD_PRODUCT_PENDING:
			return {
				...state,
				added: false,
			};
		case ADD_PRODUCT_SUCCESS:
			return {
				...state,
				added: true,
				products: action.payload,
			};
		case ADD_PRODUCT_ERROR:
			return {
				...state,
				added: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

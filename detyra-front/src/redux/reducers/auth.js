import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	REGISTER_REQUEST,
} from '../actions/types';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user
	? { isLoggedIn: true, user: user }
	: { isLoggedIn: false, user: [] };

export const loginReducer = (state = initialState, action) => {
	// const {type, payload} = action;
	switch (action.type) {
		//new state based on the incoming action.type
		case REGISTER_REQUEST:
			return {
				...state,
				isLoggedIn: false,
				registering: true,
			};
		case REGISTER_SUCCESS:
			return {
				...state,
				registered: true,
				isLoggedIn: false,
				errors: null,
			};
		case REGISTER_FAIL:
			return {
				...state,
				registered: false,
				isLoggedIn: false,
				errors: action.payload,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
				user: action.payload,
				error: null,
			};
		case LOGIN_FAIL:
			return {
				...state,
				isLoggedIn: false,
				user: null,
				error: action.payload,
			};
		case LOGOUT:
			return {
				...state,
				isLoggedIn: false,
				user: null,
			};
		default:
			return state;
	}
};

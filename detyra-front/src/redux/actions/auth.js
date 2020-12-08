import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	REGISTER_FAIL,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
} from './types';
import axios from 'axios';
import { history } from '../../history/history';
import { API_URL } from '../../constants/constants'


export const register = (name, surname, email, username, password) => (dispatch) => {
	dispatch({
		type: REGISTER_REQUEST,
	});

	return axios
		.post(API_URL + '/user/register', { name, surname, email, username, password })
		.then((response) => {
			if (response.error) {
				throw response.error;
			}
			const user = JSON.stringify(response.data);
			console.log('USER ' + user);

			dispatch({
				type: REGISTER_SUCCESS,
			});
			return response;
		})
		.catch((error) => {
			console.log('Error: ' + error.response.data);

			dispatch({
				type: REGISTER_FAIL,
				payload: error.response.data,
			});
			return error.response.data;
		});
};

export const login = (username, password) => async (dispatch) => {
	return axios
		.post(API_URL + '/user/login', { username, password })
		.then((response) => {
			if (response.data.user) {
				console.log('USER ' + JSON.stringify(response.data));
				const user = response.data.user;
				localStorage.setItem('user', JSON.stringify(user));
			}
			dispatch({
				type: LOGIN_SUCCESS,
				payload: response.data.user,
			});

			setTimeout(() => {
				history.push('/');
			}, 800);
			return response.data;
		})
		.catch((error) => {
			console.log('Error: ' + error.response.data);
			dispatch({
				type: LOGIN_FAIL,
				payload: error.response.data,
			});
			return error.response.data;
		});
};

export const logout = () => (dispatch) => {
	localStorage.removeItem('user');

	dispatch({
		type: LOGOUT,
	});

	history.push('/login');
	window.location.reload(false);
};

import axios from 'axios';

import { FETCH_USER } from './types';
import { REGISTER_USER } from './types';
import { LOGIN_USER } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const registerUser = values => async dispatch => {
    const res = await axios.post('/api/registration', values);
    dispatch({ type: REGISTER_USER, payload: res.data });
};

export const loginUser = values => async dispatch => {
    const res = await axios.post('/auth/local', values);
    dispatch({ type: LOGIN_USER, payload: res.data });
};
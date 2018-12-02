import axios from 'axios';

import { FETCH_USER, REGISTER_USER, LOGIN_USER, 
        FETCH_CHILDREN, CREATE_CHILD, DELETE_CHILD } from './types';

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

export const fetchChildren = values => async dispatch => {
    const res = await axios.get('/api/children', values);
    dispatch({ type: FETCH_CHILDREN, payload: res.data });
}

export const createChild = values => async dispatch => {
    const res = await axios.post('/api/children', values);
    dispatch({ type: CREATE_CHILD, payload: res.data });
}

export const deleteChild = values => async dispatch => {
    const res = await axios.delete(`/api/children/${values.id}`);
    dispatch({ type: DELETE_CHILD, payload: res.data });
}
import axios from 'axios';

import { FETCH_USER, REGISTER_USER, LOGIN_USER, 
        FETCH_CHILDREN, CREATE_CHILD, DELETE_CHILD, UPDATE_CHILD,
        FETCH_AREAS, CREATE_AREA, DELETE_AREA, UPDATE_AREA,
        FETCH_RULES, FETCH_CURRENT_RULES, CREATE_RULE, DELETE_RULE, UPDATE_RULE,
        DELETE_ACCOUNT } from './types';
        
// LOGGING AND REGISTERING

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const registerUser = values => async dispatch => {
    const res = await axios.post('/registration/parent', values);
    dispatch({ type: REGISTER_USER, payload: res.data });
};

export const loginUser = values => async dispatch => {
    const res = await axios.post('/auth/parent/local', values);
    dispatch({ type: LOGIN_USER, payload: res.data });
};

// DELETING ACCOUNT

export const deleteAccount = () => async dispatch => {
    const res = await axios.delete('/api/parent/');
    dispatch({ type: DELETE_ACCOUNT, payload: res.data });
};

// CHILDREN ACTIONS

export const fetchChildren = values => async dispatch => {
    const res = await axios.get('/api/parent/children', values);
    dispatch({ type: FETCH_CHILDREN, payload: res.data });
}

export const createChild = values => async dispatch => {
    const res = await axios.post('/api/parent/children', values);
    dispatch({ type: CREATE_CHILD, payload: res.data });
}

export const deleteChild = values => async dispatch => {
    const res = await axios.delete(`/api/parent/children/${values.id}`);
    dispatch({ type: DELETE_CHILD, payload: res.data });
}

export const updateChild = values => async dispatch => {
    const res = await axios.put(`/api/parent/children/${values.id}`,{ name: values.name, iconColor: values.iconColor });
    dispatch({ type: UPDATE_CHILD, payload: res.data });
}

// AREAS ACTIONS

export const fetchAreas = () => async dispatch => {
    const res = await axios.get('/api/parent/areas');
    dispatch({ type: FETCH_AREAS, payload: res.data });
}

export const createArea = values => async dispatch => {
    const res = await axios.post('/api/parent/areas', values);
    dispatch({ type: CREATE_AREA, payload: res.data });
}

export const deleteArea = values => async dispatch => {
    const res = await axios.delete(`/api/parent/areas/${values.id}`);
    dispatch({ type: DELETE_AREA, payload: res.data });
}

export const updateArea = values => async dispatch => {
    const res = await axios.put(`/api/parent/areas/${values.id}`, {name: values.name, iconId: values.iconId, area: values.area, children: values.children});
    dispatch({ type: UPDATE_AREA, payload: res.data });
}

// RULES ACTIONS

export const fetchRules = (childId) => async dispatch => {
    const res = await axios.get(`/api/parent/rules/${childId}`);
    dispatch({ type: FETCH_RULES, payload: res.data });
}

export const createRule = (values) => async dispatch => {
    const res = await axios.post(`/api/parent/rules/`, values);
    dispatch({ type: CREATE_RULE, payload: res.data });
}

export const deleteRule = id => async dispatch => {
    const res = await axios.delete(`/api/parent/rules/${id}`);
    dispatch({ type: DELETE_RULE, payload: res.data });
}

export const updateRule = values => async dispatch => {
    const res = await axios.put(`/api/parent/rules/${values.id}`, values);
    dispatch({ type: UPDATE_RULE, payload: res.data });
}

export const fetchCurrentRules = () => async dispatch => {
    const res = await axios.get(`/api/parent/rules/`);
    dispatch({ type: FETCH_CURRENT_RULES, payload: res.data });
}
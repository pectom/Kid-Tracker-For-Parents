import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as reduxForm } from 'redux-form';
import childrenReducer from './childrenReducer';

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    children: childrenReducer
});
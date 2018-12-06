import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as reduxForm } from 'redux-form';
import childrenReducer from './childrenReducer';
import areasReducer from './areasReducer';
import rulesReducer from './rulesReducer';

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    children: childrenReducer,
    areas: areasReducer,
    rules: rulesReducer
});
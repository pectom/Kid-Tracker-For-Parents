import { FETCH_RULES, CREATE_RULE, DELETE_RULE, UPDATE_RULE, FETCH_CURRENT_RULES } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_RULES:
            return action.payload;
        case FETCH_CURRENT_RULES:
            return action.payload;
        case CREATE_RULE:
            return [...state, action.payload];
        case DELETE_RULE:
            return action.payload;
        case UPDATE_RULE:
            return [...state, action.payload];
        default:
            return state;
    }
}
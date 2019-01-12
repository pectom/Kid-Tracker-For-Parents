import { FETCH_RULES, CREATE_RULE, DELETE_RULE, UPDATE_RULE, FETCH_CURRENT_RULES, TOOGLE_ACTIVITY_RULE } from '../actions/types';

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
        case TOOGLE_ACTIVITY_RULE:
            const nextState = state;
            nextState.map(rule => { if(rule.id === action.payload.ruleId){ return {...rule, active: action.payload.active}; } else { return rule; }})
            return nextState;
        default:
            return state;
    }
}
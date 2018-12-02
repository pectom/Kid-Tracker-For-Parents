import { FETCH_CHILDREN, CREATE_CHILD, DELETE_CHILD } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_CHILDREN:
            return action.payload;
        case CREATE_CHILD:
            return [...state, action.payload];
        case DELETE_CHILD:
            return action.payload;
        default:
            return state;
    }
}
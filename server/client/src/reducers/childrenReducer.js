import { FETCH_CHILDREN, CREATE_CHILD, DELETE_CHILD, UPDATE_CHILD } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_CHILDREN:
            return action.payload;
        case CREATE_CHILD:
            if(!action.payload.electionId)
                return [...state, action.payload];
            else
                return [...state];
        case DELETE_CHILD:
            return action.payload;
        case UPDATE_CHILD:
            return [...state, action.payload];
        default:
            return state;
    }
}
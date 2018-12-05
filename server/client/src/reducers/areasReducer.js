import { FETCH_AREAS, CREATE_AREA, DELETE_AREA, UPDATE_AREA } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_AREAS:
            return action.payload;
        case CREATE_AREA:
            return [...state, action.payload];
        case DELETE_AREA:
            return action.payload;
        case UPDATE_AREA:
            return [...state, action.payload];
        default:
            return state;
    }
}
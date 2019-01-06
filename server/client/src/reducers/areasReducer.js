import { FETCH_AREAS, CREATE_AREA, DELETE_AREA, UPDATE_AREA } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_AREAS:
            return action.payload;
        case CREATE_AREA:
            return [...state];
        case DELETE_AREA:
            return [...state];
        case UPDATE_AREA:
            return [...state];
        default:
            return state;
    }
}
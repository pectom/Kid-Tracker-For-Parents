import { DELETE_ACCOUNT } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case DELETE_ACCOUNT:
            return action.payload;
        default:
            return state;
    }
}
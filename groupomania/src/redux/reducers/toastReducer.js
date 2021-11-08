import {
    CLEAR_TOAST,
    SET_TOAST
} from "../types";

const initialState = {
    message: ""
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_TOAST:
            return {
                ...state,
                message: action.payload
            }
        case CLEAR_TOAST:
            return {}
        default:
            return state;
    }
}
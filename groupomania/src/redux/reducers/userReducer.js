import {
    SET_REGISTERED,
    SET_UNREGISTERED,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    SET_USER,
    UPDATE_USERDATA,
    UPDATE_USERTOKEN
} from "../types";

const initialState = {
    isLoggedIn: false,
    data: {},
    token: null
};

export default function (state = initialState, action) {
    switch(action.type) {
        case SET_REGISTERED:
            return {
                ...state,
                isLoggedIn: false
            };
        case SET_UNREGISTERED:
            return {
                ...state,
                isLoggedIn: false
            };
        case SET_AUTHENTICATED:
            return {
                ...state,
                isLoggedIn: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                ...state,
                data: action.payload.user,
                token: action.payload.token
            }
        case UPDATE_USERDATA:
            return {
                ...state,
                data: action.payload
            }
        case UPDATE_USERTOKEN:
            return {
                ...state,
                token: action.payload
            }
        default:
            return state;
    }
}
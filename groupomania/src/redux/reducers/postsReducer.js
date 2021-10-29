import {
    SET_POSTS
} from "../types";

const initialState = {};

export default function postsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        default:
            return state;
    }
}
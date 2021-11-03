import {
    ADD_POST,
    REMOVE_POST,
    SET_POSTS,
    ADD_COMMENT
} from "../types";

const initialState = {};

export const contentReducer = (state=initialState, action) => {
    let copyList = [];
    switch(action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        case ADD_POST:
            copyList = state.posts.slice();
            copyList.push(action.payload);
            return {
                ...state,
                posts: copyList
            };
        case REMOVE_POST:
            copyList = state.posts.filter(post => post.id !== action.payload);
            return {
                ...state,
                posts: copyList
            };
        case ADD_COMMENT:
            //TODO : corriger store comments
            return {
                ...state,
                Comments: action.payload
            }
        default:
            return state;
    }
}
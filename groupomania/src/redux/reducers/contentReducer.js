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
            let index_comment = state.posts.findIndex(
                (posts) => posts.id == action.payload.newComment.PostId
            );
            return {
                ...state,
                posts: {
                    ...state.posts,//jusqu'ici on est bon !
                    [index_comment]: {
                        ...state.posts[index_comment],
                        Comments: [action.payload.newComment, ...state.posts[index_comment].Comments]
                    }
                }
            }
        default:
            return state;
    }
}
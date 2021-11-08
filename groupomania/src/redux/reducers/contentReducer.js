import {
    ADD_POST,
    REMOVE_POST,
    SET_POSTS,
    ADD_COMMENT
} from "../types";

const initialState = {};

export default function (state = initialState, action) {
    let copyList = [];
    switch(action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        case ADD_POST:
            copyList = state.posts.slice();
            copyList.unshift(action.payload);
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
            //TODO : essayer d'optimiser cette partie
            let index_comment = state.posts.findIndex(
                (posts) => posts.id == action.payload.newComment.PostId
            );

            copyList = state.posts.slice();
            copyList[index_comment].Comments.push(action.payload.newComment);

            return {
                ...state,
                posts: copyList
                /*{
                    copyList,
                    [index_comment]: {
                        ...state.posts[index_comment],
                        Comments: copyList
                        //[action.payload.newComment, ...state.posts[index_comment].Comments]
                    }
                }*/
            }
        default:
            return state;
    }
}
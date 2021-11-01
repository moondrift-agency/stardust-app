import {
    ADD_POST,
    REMOVE_POST,
    SET_POSTS
} from "../types";

import { getAllPosts } from "../../services/posts.service";

export const getPosts = () => (dispatch) => {
    return getAllPosts().then(
        (data) => {
            dispatch({
                type: SET_POSTS,
                payload: data
            })

            return Promise.resolve();
        },
        (error) => {
            console.log(error)
            return Promise.reject();
        }
    )
}

export const addPost = (payload) => {
    return {
        type: ADD_POST,
        payload
    };
}

export const removePost = (payload) => {
    return {
        type: REMOVE_POST,
        payload
    };
}
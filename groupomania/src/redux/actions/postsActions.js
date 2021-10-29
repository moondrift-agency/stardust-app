import {
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
import {
    SET_POSTS,
    ADD_POST,
    REMOVE_POST,
    ADD_COMMENT
} from "../types";
import axios from "axios";
import authHeader from "../../services/auth-header";

const API_URL = 'http://localhost:8081/api/posts/';

export const getPosts = () => async (dispatch) => {
    await axios
        .get(API_URL, {
            headers: {
                'Authorization': authHeader()
            }
        })
        .then((res) => {
            dispatch({ type: SET_POSTS, payload: res.data });
        })
        .catch((err) => {
            console.log(err);
        });
};

export const createPost = (postData) => async (dispatch) => {
    await axios
        .post(API_URL + "add", postData, {
            headers: {
                'Authorization': authHeader(),
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            dispatch({
                type: ADD_POST,
                payload: response.data.post
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

export const deletePost = (id) => async (dispatch) => {
    await axios
        .delete(API_URL + id, {
            headers: {
                'Authorization': authHeader(),
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            dispatch({
                type: REMOVE_POST,
                payload: id
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

export const createComment = (message, id) => async (dispatch) => {
    await axios
        .post(API_URL + id + '/comments', message, {
            headers: {
                'Authorization': authHeader()
            }
        })
        .then((response) => {
            dispatch({
                type: ADD_COMMENT,
                payload: response.data
            })
        })
}

export const likePost = async (id) => {
    await axios
        .post(API_URL + id + '/like', null, {
            headers: {
                'Authorization': authHeader()
            }
        })
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            console.log(err);
        })
}
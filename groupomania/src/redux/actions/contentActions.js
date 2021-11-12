import {
    SET_POSTS,
    ADD_POST,
    REMOVE_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
    UPDATE_POST_LIKES
} from "../types";
import axios from "axios";
import authHeader from "../../services/auth-header";
import {toast} from "react-toastify";
import history from "../../helpers/history";

const API_URL = 'http://localhost:8081/api/posts/';

export const getPosts = () => async (dispatch) => {
    await axios
        .get(API_URL, {
            headers: {
                'Authorization': authHeader()
            }
        })
        .then((response) => {
            dispatch({
                type: SET_POSTS,
                payload: response.data
            });

            return response.data.message;
        })
        .catch((error) => {
            return error.response.data;
        })
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

            toast.success(response.data.message);

            return response.data.message;
        })
        .catch((error) => {
            toast.error(error.response.data);

            return error.response.data;
        })
};

export const deletePost = (id) => async (dispatch) => {
    await axios
        .delete(API_URL + id, {
            headers: {
                'Authorization': authHeader(),
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            dispatch({
                type: REMOVE_POST,
                payload: id
            });

            toast.success(response.data.message);

            return response.data.message;
        })
        .catch((error) => {
            toast.error(error.response.data);

            return error.response.data;
        })
}

export const createComment = (message, id) => async (dispatch) => {
    await axios
        .post(API_URL + id + '/comments', message, {
            headers: {
                'Authorization': authHeader()
            }
        })
        .then((response) => {
            /*dispatch({
                type: ADD_COMMENT,
                payload: response.data
            });*/

            history.push('/');

            toast.success(response.data.message);

            return response.data.message;
        })
        .catch((error) => {
            //toast.error(error.response.data);

            return error;
        })
}

export const deleteComment = (id) => async (dispatch) => {
    await axios
        .delete(API_URL + '/comments/' + id, {
            headers: {
                'Authorization': authHeader()
            }
        })
        .then((response) => {
            /*dispatch({
                type: REMOVE_COMMENT,
                payload: id
            })*/

            toast.success(response.data.message);

            return response.data.message
        })
        .catch((error) => {
            //toast.error(error.response.data);

            return error;
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
            toast.success(response.data.message);

            return response.data
        })
        .catch((err) => {
            console.log(err);
        })
}
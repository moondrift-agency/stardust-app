import {
    SET_POSTS
} from "../types";
import axios from "axios";
import authHeader from "../../services/auth-header";

const API_URL = 'http://localhost:8081/api/posts/';

export const getPosts = () => (dispatch) => {
    axios
        .get(API_URL, {
            headers: {
                'Authorization': authHeader()
            }
        })
        .then((res) => {
            console.log('on update le store');
            console.log(res.data);
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
                'Content-Type':'multipart/form-data'
            }
        })
        .then(() => {
            console.log('on créé un post')
            dispatch(getPosts());
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
                'Content-Type':'multipart/form-data'
            }
        })
        .then(() => {
            console.log('on supprime un post')
            dispatch(getPosts());
        })
        .catch((err) => {
            console.log(err);
        });
}
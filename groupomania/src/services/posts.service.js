import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8081/api/posts/';

export const getAllPosts = () => {
    return axios.get(API_URL, {
            headers: {
                'Authorization': authHeader()
            }
        })
        .then(response => response.data);
}

export const createPost = (postData) => {
    return axios
        .post(API_URL + "add", postData, {
            headers: {
                'Authorization': authHeader(),
                'Content-Type':'multipart/form-data'
            }
        })
        .then((response) => {
            return response.data;
        })
}

export const deletePost = (id) => {
    return axios
        .delete(API_URL + id, {
            headers: {
                'Authorization': authHeader()
            }
        })
        .then((response) => {
            return response.data;
        })
}

export const createComment = (message) => {
    return axios
        .post(API_URL + "comments" , message, {
            headers: {
                'Authorization': authHeader()
            }
            })
        .then((response) => {
            return response.data;
        })
}
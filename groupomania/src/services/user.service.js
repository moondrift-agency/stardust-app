import axios from 'axios';
import {DELETE_USER} from '../redux/types';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8081/api/users/';

// METHOD TO RETRIEVE ALL USERS
export const getAllUsers = () => {
    return axios
        .get(API_URL + "users", {
            headers: {
                'Authorization': authHeader()
            }
        })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            return error;
        })
}

// METHOD TO RETRIEVE A SPECIFIC USER
export const getUser = (id) => {
    return axios
        .get(API_URL + 'accounts/' + id, {
            headers: {
                'Authorization': authHeader()
            }
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        })
}

// UPDATE PROFILE INFORMATION
// router.put("/accounts/:id?", tokenChecker, multer, userController.updateAccount);
export const updateProfile = (id, data) => {
    return axios
        .put(API_URL + 'accounts/' + id, data, {
            headers: {
                'Authorization': authHeader()
            }
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        })
}

// DELETE USER
// router.delete("/accounts/:id?", tokenChecker, userController.deleteAccount);
export const deleteProfile = () => {
    return (dispatch) => {
        return axios
            .delete(API_URL + "/accounts/", {
                headers: {
                    'Authorization': authHeader()
                }
            })
            .then((res) => {
                dispatch({
                    type: DELETE_USER,
                })
            }).catch((err) => console.log(err));
    };
}
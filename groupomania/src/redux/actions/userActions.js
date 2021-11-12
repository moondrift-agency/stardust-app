import {
    SET_UNAUTHENTICATED,
    SET_AUTHENTICATED,
    SET_USER,
    UPDATE_USERDATA,
    UPDATE_USERTOKEN,
    SET_REGISTERED,
    SET_UNREGISTERED, DELETE_USER, SET_TOAST
} from "../types";
import axios from "axios";
import authHeader from "../../services/auth-header";

import {toast} from 'react-toastify';
import history from "../../helpers/history";

const API_URL = 'http://localhost:8081/api/users/';

export const signup = (newUserData) => async (dispatch) => {
    await axios
        .post(API_URL + "signup", newUserData)
        .then((response) => {
            dispatch({
                type: SET_REGISTERED,
            });

            dispatch({
                type: SET_TOAST,
                payload: {
                    message: response.data,
                    messageType: "success"
                }
            });

            toast.success(response.data.message);

            history.push('/login');

            return response;
        })
        .catch((error) => {
            dispatch({
                type: SET_UNREGISTERED
            });

            dispatch({
                type: SET_TOAST,
                payload: {
                    message: error.response.data,
                    messageType: "error"
                }
            });

            toast.error(error.response.data);

            return error.response;
        });
};

//TODO: voir pour améliorer la qualité du code
export const login = (userData) => async (dispatch) => {
    await axios
        .post(API_URL + "login", userData)
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("userToken", JSON.stringify(response.data.token));
            }

            dispatch({
                type: SET_AUTHENTICATED
            });

            dispatch({
                type: SET_USER,
                payload: response.data
            });

            toast.success(response.data.message);

            return response;
        })
        .catch((error) => {
            dispatch({
                type: SET_UNAUTHENTICATED,
            });

            toast.error(error.response.data);

            console.error(error);
            return error;
        });
};

export const logout = () => async (dispatch) => {
    await sessionStorage.removeItem("datas");
    await localStorage.removeItem("userToken");

    dispatch({
        type: SET_UNAUTHENTICATED
    });

    toast.success("Vous avez été déconnecté avec succès.");
}

export const updateUserData = (id, data, isCurrentUser) => (dispatch) => {
    return axios
        .put(API_URL + 'accounts/' + id, data, {
            headers: {
                'Authorization': authHeader(),
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            dispatch({
                type: SET_AUTHENTICATED,
            });

            if(isCurrentUser){
                dispatch({
                    type: UPDATE_USERDATA,
                    payload: response.data.user
                });
            }

            dispatch({
                type: UPDATE_USERTOKEN,
                payload: JSON.parse(localStorage.getItem("userToken"))
            })

            history.push('/');

            toast.success(response.data.message);

            return response.data.message;
        })
        .catch((error) => {
            toast.error(error.response.data);

            return error.response.data;
        })
}

export const deleteAccount = (id, isCurrentUser) => async (dispatch) => {
    await axios
        .delete(API_URL + "accounts/" + id, {
            headers: {
                'Authorization': authHeader()
            }
        })
        .then((response) => {
            dispatch({
                type: DELETE_USER,
            })

            toast.success(response.data.message);

            if(isCurrentUser){
                history.push('/login');

                sessionStorage.removeItem("datas");
                localStorage.removeItem("userToken");
            } else {
                history.push('/');
            }

            return response.data.message;
        })
        .catch((error) => {
            console.log(error.response)

            toast.error(error.response.data);

            return error.response.data;
        })
}
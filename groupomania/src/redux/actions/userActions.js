import {
    SET_UNAUTHENTICATED,
    SET_AUTHENTICATED,
    SET_USER,
    UPDATE_USERDATA,
    UPDATE_USERTOKEN,
    SET_REGISTERED,
    SET_UNREGISTERED
} from "../types";

import { postLogin, postSignup, deleteLocalStorage } from "../../services/auth.service";
import { getUser } from "../../services/user.service";

export const signup = (newUserData) => (dispatch) => {
    return postSignup(newUserData).then(
        (response) => {
            dispatch({
                type: SET_REGISTERED,
            });

            return Promise.resolve();
        },
        (error) => {
            /*const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();*/

            dispatch({
                type: SET_UNREGISTERED,
            });

            return Promise.reject();
        }
    );
};

export const login = (userData) => (dispatch) => {
    return postLogin(userData).then(
        (data) => {
            dispatch({
                type: SET_AUTHENTICATED
            });

            dispatch({
                type: SET_USER,
                payload: data
            });

            return Promise.resolve();
        },
        (error) => {
            /*const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();*/

            dispatch({
                type: SET_UNAUTHENTICATED,
            });

            return Promise.reject();
        }
    );
};

export const updateUser = (id) => (dispatch) => {
    return getUser(id).then(
        (data) => {
            dispatch({
                type: SET_AUTHENTICATED,
            });

            dispatch({
                type: UPDATE_USERDATA,
                payload: data.data
            });

            dispatch({
                type: UPDATE_USERTOKEN,
                payload: JSON.parse(localStorage.getItem("userToken"))
            })

            return Promise.resolve();
        },
        (error) => {
            /*const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();*/

            return Promise.reject();
        }
    )
}

export const logout = () => (dispatch) => {
    deleteLocalStorage()

    dispatch({
        type: SET_UNAUTHENTICATED
    });
}
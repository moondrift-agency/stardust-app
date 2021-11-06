import {
    SET_UNAUTHENTICATED,
    SET_AUTHENTICATED,
    SET_USER,
    UPDATE_USERDATA,
    UPDATE_USERTOKEN,
    SET_REGISTERED,
    SET_UNREGISTERED
} from "../types";
import axios from "axios";
import authHeader from "../../services/auth-header";

const API_URL = 'http://localhost:8081/api/users/';

export const signup = (newUserData) => async (dispatch) => {
    await axios
        .post(API_URL + "signup", newUserData)
        .then((response) => {
            dispatch({
                type: SET_REGISTERED,
            });

            return response;
        })
        .catch((error) => {
            dispatch({
                type: SET_UNREGISTERED,
            });

            console.error(error);
            return error;
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

            return response;
        })
        .catch((error) => {
            dispatch({
                type: SET_UNAUTHENTICATED,
            });

            console.error(error);
            return error;
        });
};

export const logout = () => async (dispatch) => {
    await localStorage.removeItem("userToken");

    dispatch({
        type: SET_UNAUTHENTICATED
    });
}

export const updateUser = (id) => async (dispatch) => {
    await axios
        .get(API_URL + 'accounts/' + id, {
            headers: {
                'Authorization': authHeader()
            }
        })
        .then((response) => {
            dispatch({
                type: SET_AUTHENTICATED,
            });

            dispatch({
                type: UPDATE_USERDATA,
                payload: response.data
            });

            dispatch({
                type: UPDATE_USERTOKEN,
                payload: JSON.parse(localStorage.getItem("userToken"))
            })

            return response;
        })
        .catch((error) => {
            console.error(error);
            return error;
        });
}
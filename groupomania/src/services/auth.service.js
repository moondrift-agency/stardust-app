import axios from "axios";

const API_URL = "http://localhost:8081/api/users/";

export const postLogin = (userData) => {
  return axios
      .post(API_URL + "login", userData)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("userToken", JSON.stringify(response.data.token));
        }

        return response.data;
      });
};

export const postSignup = (userData) => {
  return axios.post(API_URL + "signup", userData);
}

export const deleteLocalStorage = () => {
  return localStorage.removeItem("userToken");
}
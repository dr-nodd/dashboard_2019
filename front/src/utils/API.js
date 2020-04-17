import axios from "axios";
const headers = {
    "Content-Type": "application/json"
};
const burl = "http://localhost:8800";

export default {
    login: function(email, password) {
        return axios.post(
            `${burl}/user/login`,
            {
                email,
                password
            },
            {
                headers: headers
            }
        );
    },
    signup: function(send) {
        return axios.post(`${burl}/user/signup`, send, { headers: headers });
    },
    about: function() {
        return axios.post(`${burl}/user/about.json`, {}, { headers: headers });
    },
    isAuth: function() {
        return localStorage.getItem("log") !== null && localStorage.getItem("log") !== undefined;
    },
    logout: function() {
        localStorage.clear();
    },
    saveDashboard: function(send) {
        return axios.post(`${burl}/user/saveDashboard`, send, { headers: headers });
    },
    getDashboard: function(send) {
        return axios.post(`${burl}/user/getDashboard`, send, { headers: headers });
    }
};
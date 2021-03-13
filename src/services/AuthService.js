import React from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/auth/";

const AuthService = () => {
  function registerUser(username, email, password, role) {
    return axios.post(API_URL + "signup", {
      username: username,
      email: email,
      password: password,
      role: role,
    });
  }
};

export default AuthService;

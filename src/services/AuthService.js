import React from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/auth/";

class AuthService extends React.Component {
  async registerUser(username, email, password, role) {
    await axios.post(API_URL + "signup", {
      username: username,
      email: email,
      password: password,
      role: role,
    });
  }

  async loginUser(username, password) {
    await axios
      .post(API_URL + "signin", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}
export default new AuthService();

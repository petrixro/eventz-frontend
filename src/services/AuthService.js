import React from "react";
import axios from "axios";

const API_URL = "https://petrix-eventz-back.herokuapp.com/api/v1/auth/";

class AuthService extends React.Component {
  async registerUser(username, email, password, role) {
    await axios.post(
      API_URL + "signup",
      {
        username: username,
        email: email,
        password: password,
        role: role,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  async loginUser(username, password) {
    await axios
      .post(
        API_URL + "signin",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
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

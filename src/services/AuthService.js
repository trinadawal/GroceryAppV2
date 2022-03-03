import axios from "axios";
const API_URL = "http://localhost:8081/api/auth/";
class AuthService {
  login(userName, password) {
    return axios
      .post(API_URL + "signin", {
        userName,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(userName, email, password) {
    return axios.post(API_URL + "signup", {
      userName,
      email,
      password
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  getRole() {
    return JSON.parse(localStorage.getItem('roles'));;
  }
}
export default new AuthService();
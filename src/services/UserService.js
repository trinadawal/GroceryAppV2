import axios from 'axios';
import authHeader from './AuthHeader';
const API_URL = 'http://localhost:8081/api/test/';
class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }
  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }
  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
  getSuperAdminBoard() {
    return axios.get(API_URL + 'superadmin', { headers: authHeader() });
  }
}
export default new UserService();

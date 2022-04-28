import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_AXIOS_BASE_URL;
axios.defaults.withCredentials = true;

export const signupAPI = data => axios.post('/user/signup', data);
export const loginAPI = data => axios.post('/user/login', data);
export const edituserAPI = data => axios.patch('/user/userInfo', data);
export const editpasswordAPI = data => axios.patch('/user/password', data);

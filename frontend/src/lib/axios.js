import Axios from 'axios';
import { authSuccess, logout } from '../redux/actions';
import { store } from '../redux';

const url = process.env.REACT_APP_BACKEND_URL;

const axios = Axios.create({
  withCredentials: true,
  validateStatus: () => true,
  baseURL: url,
});

const rejectPromise = error => Promise.reject(error);

axios.interceptors.request.use(config => {
  const newConfig = { ...config };
  const token = `Bearer ${store.getState().auth.token}`;
  newConfig.headers = {
    ...newConfig.headers,
    common: {
      ...newConfig.headers.common,
      authorization: token,
    },
  };

  return newConfig;
});

axios.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;
    const errorStatus = error.response.status;
    const refreshUrl = `${url}/auth/refresh`;

    if (errorStatus === 401 && originalRequest.url === refreshUrl) {
      return rejectPromise(error);
    }

    if (errorStatus === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios.get('/auth/refresh').then(res => {
        if (res.data.accessToken) {
          const { accessToken } = res.data;

          store.dispatch(authSuccess(accessToken));

          return axios(originalRequest);
        }

        store.dispatch(logout);

        return rejectPromise(error);
      });
    }

    return rejectPromise(error);
  }
);

const git = process.env.REACT_APP_GITHUB_URL;

export const githubAxios = Axios.create({
  baseURL: git,
});

export default axios;

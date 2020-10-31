import axios from '@axios';
import { AuthTypes } from '@types';

export const setError = error => dispatch =>
  dispatch({
    type: AuthTypes.SET_ERROR,
    error,
  });

const setErrors = errors => dispatch =>
  dispatch({
    type: AuthTypes.SET_ERRORS,
    errors,
  });

export const authSuccess = token => dispatch =>
  dispatch({
    type: AuthTypes.AUTH_SUCCESS,
    token,
  });

const logoutAction = dispatch =>
  dispatch({
    type: AuthTypes.LOGOUT,
  });

export const clearErrors = dispatch =>
  dispatch({ type: AuthTypes.CLEAR_ERRORS });

export const login = loginData => async dispatch => {
  const { data } = await axios.post('/auth/', loginData);

  if (data.errors) {
    return dispatch(setError(data.errors[0].username));
  }

  return dispatch(authSuccess(data.accessToken));
};

export const register = registerData => async dispatch => {
  const { data, status } = await axios.post('/auth/register', registerData);

  if (data.errors) {
    return dispatch(setErrors(data.errors));
  }

  if (status !== 200) {
    return dispatch(setError(data.message));
  }

  return dispatch(authSuccess(data.accessToken));
};

export const refresh = (firstLoad = false) => async dispatch => {
  const path = firstLoad ? `/auth/refresh?first=first` : '/auth/refresh';
  const { data, status } = await axios.get(path);

  if ((status === 401 || !data.accessToken) && !firstLoad) {
    return dispatch(logoutAction);
  }

  return dispatch(authSuccess(data.accessToken));
};

export const logout = async dispatch => {
  await axios.post('/auth/logout');

  return dispatch(logoutAction);
};

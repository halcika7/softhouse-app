import { ProfileTypes } from '@types';
import axios from '@axios';

const setProfile = data => dispatch =>
  dispatch({
    type: ProfileTypes.SET_PROFILE,
    data,
  });

const setMessage = (message, status) => dispatch =>
  dispatch({
    type: ProfileTypes.SET_PROFILE_MESSAGE,
    message,
    status,
  });

const setErrors = errors => dispatch =>
  dispatch({
    type: ProfileTypes.SET_PROFILE_ERRORS,
    errors,
  });

export const clearMessage = dispatch =>
  dispatch({
    type: ProfileTypes.CLEAR,
  });

export const reset = dispatch =>
  dispatch({
    type: ProfileTypes.RESET,
  });

export const getProfileData = async dispatch => {
  const { data } = await axios.get('/profile/');
  
  if (data.error) {
    return dispatch(setMessage(data.error));
  }

  return dispatch(setProfile(data.user));
};

export const updatePassword = passwords => async dispatch => {
  const { data, status } = await axios.patch('/profile/', passwords);

  if (data.errors) {
    return dispatch(setErrors(data.errors));
  }

  return dispatch(setMessage(data.message, status));
};

import { DataTypes } from '@types';
import axios from '@axios';
import { githubReset } from './github';

const setUserData = (data, idsInUse) => dispatch =>
  dispatch({
    type: DataTypes.SET_USER_DATA,
    data,
    idsInUse,
  });

const addInfoToData = (data, id) => dispatch =>
  dispatch({
    type: DataTypes.UPDATE_USER_DATA,
    data,
    id,
  });

const setMessage = (message, status) => dispatch =>
  dispatch({
    type: DataTypes.SET_MESSAGE,
    message,
    status,
  });

const setLoading = (saveRemove = false) => dispatch =>
  dispatch({
    type: DataTypes.SET_LOADING,
    saveRemove,
  });

const removeUserField = id => dispatch =>
  dispatch({
    type: DataTypes.REMOVE_USER_DATA_FIELD,
    id,
  });

export const clearDataMessage = dispatch =>
  dispatch({
    type: DataTypes.CLEAR_MESSAGE,
  });

export const getUserData = async dispatch => {
  const {
    data: { data },
    status,
  } = await axios.get('/data/');

  let parsed = [];
  let ids = [];

  if (status !== 200) {
    return dispatch(setUserData(parsed, ids));
  }

  parsed = data.map(val => ({ ...JSON.parse(val) }));

  ids = parsed.map(({ user }) => user.id);

  return dispatch(setUserData(parsed, ids));
};

export const updateUserData = dataToAdd => async dispatch => {
  dispatch(setLoading());

  const { status, data } = await axios.patch('/data/', {
    data: JSON.stringify(dataToAdd),
  });

  if (status === 200) {
    dispatch(githubReset);
    dispatch(addInfoToData(dataToAdd, dataToAdd.user.id));
  }

  return dispatch(setMessage(data.message, status));
};

export const removeUserFromData = (index, id) => async dispatch => {
  dispatch(setLoading(true));

  const { status, data } = await axios.patch('/data/user', { index });

  if (status === 200) {
    dispatch(removeUserField(id));
  }

  return dispatch(setMessage(data.message, status));
};

export const saveDataToFile = dataToSave => async dispatch => {
  dispatch(setLoading(true));

  const { data, status } = await axios.post('/data/', {
    data: JSON.stringify(dataToSave),
  });

  if (status === 200) {
    dispatch(setUserData([], []));
  }

  return dispatch(setMessage(data.message, status));
};

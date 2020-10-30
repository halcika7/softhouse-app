import { FileTypes } from '@types';
import axios from '@axios';
import download from 'downloadjs';

const setFiles = data => dispatch =>
  dispatch({
    type: FileTypes.SET_FILES,
    data,
  });

const setFileMessage = (message, status) => dispatch =>
  dispatch({
    type: FileTypes.SET_FILE_MESSAGE,
    message,
    status,
  });

export const clearFileMessage = dispatch =>
  dispatch({
    type: FileTypes.CLEAR_FILE_MESSAGE,
  });

export const getFiles = async dispatch => {
  const { data, status } = await axios.get('/file/');
  
  return dispatch(setFiles(status === 200 ? data.files : []));
};

export const resetFiles = dispatch => dispatch({ type: FileTypes.RESET_FILES });

export const downloadFile = (path, name) => async dispatch => {
  const { status, data } = await axios.get(`/file/file?path=${path}`, {
    responseType: 'blob',
    timeout: 30000,
  });

  if (status === 200) {
    download(data, name);
  } else {
    dispatch(setFileMessage('We are not able to download the file', 400));
  }
};

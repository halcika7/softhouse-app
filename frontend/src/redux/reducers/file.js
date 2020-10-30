import { FileTypes } from '@types';

const INITIAL_STATE = {
  loading: true,
  files: null,
  message: '',
  status: null,
};

const fileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FileTypes.SET_FILES: {
      return {
        ...INITIAL_STATE,
        files: action.data,
        loading: false,
      };
    }
    case FileTypes.RESET_FILES: {
      return { ...INITIAL_STATE };
    }
    case FileTypes.CLEAR_FILE_MESSAGE: {
      return { ...state, message: '', status: null };
    }
    case FileTypes.SET_FILE_MESSAGE: {
      return { ...state, message: action.message, status: action.status };
    }
    default:
      return { ...state };
  }
};

export default fileReducer;

import { ProfileTypes } from '@types';

const INITIAL_STATE = {
  loading: true,
  data: null,
  message: '',
  status: null,
  errors: null,
};

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProfileTypes.SET_PROFILE: {
      return {
        data: action.data,
        loading: false,
        message: '',
        status: null,
        errors: null,
      };
    }
    case ProfileTypes.SET_PROFILE_MESSAGE: {
      return {
        ...state,
        message: action.message,
        status: action.status,
        loading: false,
      };
    }
    case ProfileTypes.CLEAR: {
      return { ...state, message: '', status: null, errors: null };
    }
    case ProfileTypes.RESET: {
      return { ...INITIAL_STATE };
    }
    case ProfileTypes.SET_PROFILE_ERRORS: {
      return { ...state, errors: action.errors };
    }
    default:
      return { ...state };
  }
};

export default profileReducer;

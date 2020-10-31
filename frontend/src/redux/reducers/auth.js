import { AuthTypes } from '@types';

const INITIAL_STATE = {
  token: '',
  error: '',
  errors: null,
  loading: true,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthTypes.AUTH_SUCCESS: {
      return {
        error: '',
        errors: null,
        loading: false,
        token: action.token,
      };
    }
    case AuthTypes.SET_ERROR: {
      return { ...state, error: action.error };
    }
    case AuthTypes.SET_AUTH_LOADING: {
      return { ...state, loading: true };
    }
    case AuthTypes.SET_ERRORS: {
      return { ...state, errors: action.errors };
    }
    case AuthTypes.CLEAR_ERRORS: {
      return { ...state, errors: null, error: '' };
    }
    case AuthTypes.LOGOUT: {
      return { ...INITIAL_STATE, loading: false };
    }
    default:
      return { ...state };
  }
};

export default authReducer;

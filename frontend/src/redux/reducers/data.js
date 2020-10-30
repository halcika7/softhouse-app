import { DataTypes } from '@types';

const INITIAL_STATE = {
  updating: false,
  loading: true,
  data: null,
  message: '',
  status: null,
  idsInUse: null,
};

const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DataTypes.SET_USER_DATA: {
      return {
        ...state,
        data: action.data,
        idsInUse: action.idsInUse,
        loading: false,
      };
    }
    case DataTypes.UPDATE_USER_DATA: {
      return {
        ...state,
        loading: false,
        idsInUse: [...state.idsInUse, action.id],
        data: [...state.data, action.data],
      };
    }
    case DataTypes.SET_MESSAGE: {
      return {
        ...state,
        updating: false,
        message: action.message,
        status: action.status,
      };
    }
    case DataTypes.CLEAR_MESSAGE: {
      return { ...state, message: '', status: null };
    }
    case DataTypes.SET_LOADING: {
      return {
        ...state,
        loading: !action.saveRemove,
        updating: action.saveRemove,
      };
    }
    case DataTypes.REMOVE_USER_DATA_FIELD: {
      const data = [...state.data.filter(value => value.user.id !== action.id)];
      
      const idsInUse = data.map(value => value.user.id);

      return { ...state, data, idsInUse };
    }
    default:
      return { ...state };
  }
};

export default dataReducer;

import { combineReducers } from 'redux';

// reducers
import auth from './auth';
import profile from './profile';
import git from './github';
import data from './data';
import file from './file';

export const rootReducer = combineReducers({ auth, profile, git, data, file });

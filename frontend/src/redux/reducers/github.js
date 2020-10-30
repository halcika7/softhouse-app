import { GithubTypes } from '@types';

const INITIAL_STATE = {
  loading: false,
  user: null,
  followers: null,
  repos: null,
  remaining: null,
};

const githubReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GithubTypes.SET_GITHUB_DATA: {
      return {
        ...state,
        loading: false,
        user: action.user,
        followers: action.followers,
        repos: action.repos,
      };
    }
    case GithubTypes.SET_GITHUB_LOADING: {
      return { ...state, loading: true };
    }
    case GithubTypes.SET_GITHUB_REMAINING: {
      return { ...state, remaining: action.remaining };
    }
    case GithubTypes.GITHUB_RESET: {
      return { ...INITIAL_STATE, remaining: state.remaining };
    }
    default:
      return { ...state };
  }
};

export default githubReducer;

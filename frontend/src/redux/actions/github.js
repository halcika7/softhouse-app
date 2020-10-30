import { githubAxios } from '@axios';
import { GithubTypes } from '@types';
import axios from 'axios';

const { CancelToken } = axios;

const setGithubData = data => dispatch =>
  dispatch({
    type: GithubTypes.SET_GITHUB_DATA,
    ...data,
  });

const setLoading = dispatch =>
  dispatch({
    type: GithubTypes.SET_GITHUB_LOADING,
  });

export const searchByUsername = async username => {
  try {
    const { data } = await githubAxios.get(`/search/users?q=${username}`);

    if (!data.items.length) return { error: true };

    const info = data.items[0];
    
    return {
      githubId: info.id,
      picture: info.avatar_url,
    };
  } catch (error) {
    return { error: true };
  }
};

export const getRemaining = async dispatch => {
  const { data } = await githubAxios.get('/rate_limit');
  const { limit, used, reset } = data.rate;

  dispatch({
    type: GithubTypes.SET_GITHUB_REMAINING,
    remaining: { limit, used, reset },
  });
};

export const githubReset = dispatch =>
  dispatch({
    type: GithubTypes.GITHUB_RESET,
  });

let cancelToken = undefined;

export const search = value => async dispatch => {
  try {
    //Check if there are any previous pending requests
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel('Operation canceled due to new request.');
    }

    cancelToken = CancelToken.source();

    dispatch(setLoading);

    const [user, repos, followers] = await Promise.all([
      githubAxios.get(`/users/${value}`, { cancelToken: cancelToken.token }),
      githubAxios.get(`/users/${value}/repos?per_page=100`, {
        cancelToken: cancelToken.token,
      }),
      githubAxios.get(`/users/${value}/followers?per_page=100`, {
        cancelToken: cancelToken.token,
      }),
    ]);
    
    dispatch(
      setGithubData({
        user: user.data,
        repos: repos.data,
        followers: followers.data,
      })
    );
  } catch (error) {
    dispatch(githubReset);
  }
};

// hooks
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import useDebounce from '@hooks/debounce';

// actions
import {
  search,
  getRemaining,
  githubReset,
  updateUserData,
  clearDataMessage,
} from '@actions';

// components
import Pie from '@components/charts/PieChart';
import DonutChart from '@components/charts/DonutChart';
import HorizontalBarCart from '@components/charts/HorizontalBarChart';
import VerticalBarChart from '@components/charts/VerticalBarChart';
import Stats from './stats';
import Profile from './profile';
import { SearchWrapper, SearchInput, ChartsWrapper, AddButton } from './styled';
import { ErrorDiv } from '@styled/components';
import SearchLoading from './index.loading';
import ButtonSpinner from '@components/spinner/buttonSpinner';
import SweetAlert from '@components/alert';

import { ReactComponent as Loupe } from '@assets/images/loupe.svg';

const redux = createSelector(
  state => state.git,
  state => state.data.idsInUse,
  state => state.data.loading,
  state => state.data.message,
  state => state.data.status,
  (git, idsInUse, dataLoading, message, status) => ({
    ...git,
    idsInUse,
    dataLoading,
    message,
    status,
  })
);

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [userAdded, setUserAdded] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const debouncedValue = useDebounce(value, 1000);
  const {
    loading,
    user,
    followers,
    repos,
    remaining,
    idsInUse,
    dataLoading,
    status,
    message,
  } = useSelector(redux);
  const resetDate = remaining
    ? new Date(remaining.reset * 1000).toLocaleTimeString()
    : new Date().toLocaleString();

  const onSearch = e =>  setValue(() => e.target.value);

  const addInfoToData = () => {
    if (userAdded || dataLoading) return;
    
    dispatch(updateUserData({ user, followers, repos }));
  };

  const clearMessage = () => dispatch(clearDataMessage);

  useEffect(() => {
    dispatch(getRemaining);
    return () => {
      dispatch(githubReset);
    };
  }, [dispatch]);

  useEffect(() => {
    if (debouncedValue && !disabled) {
      dispatch(search(debouncedValue));
      dispatch(getRemaining);
    }
  }, [dispatch, debouncedValue, disabled]);

  useEffect(() => {
    if (remaining) {
      if (remaining.used === remaining.limit) {
        setDisabled(true);
      } else if (remaining.used !== remaining.limit && disabled) {
        setDisabled(false);
      }
    }
  }, [remaining, disabled]);

  useEffect(() => {
    let interval;
    if (remaining && remaining.used === 60) {
      interval = setInterval(() => {
        const current = new Date();
        const reset = new Date(remaining.reset * 1000);

        if (current >= reset) {
          dispatch(getRemaining);
        }
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [remaining, dispatch]);

  useEffect(() => {
    if (user) {
      const includes = idsInUse.includes(user.id);
      setUserAdded(() => includes);
    }
  }, [user, idsInUse]);

  return (
    <section>
      {disabled && remaining.limit === remaining.used && (
        <ErrorDiv>Requests resets at {resetDate}</ErrorDiv>
      )}
      <SearchWrapper>
        <SearchInput>
          <Loupe />
          <label htmlFor="search">
            <input
              type="text"
              name="search"
              id="search"
              onChange={onSearch}
              placeholder="Github Username"
              value={value}
              autoFocus
            />
          </label>
        </SearchInput>
        {remaining && (
          <p>
            Requests {remaining.used} / {remaining.limit}
          </p>
        )}
      </SearchWrapper>
      {!userAdded && user && (
        <AddButton
          type="button"
          disabled={userAdded || dataLoading}
          onClick={addInfoToData}
        >
          Add user to data {dataLoading && <ButtonSpinner />}
        </AddButton>
      )}
      {loading && <SearchLoading />}
      {!loading && user && followers && repos && (
        <>
          <Stats {...user} />
          <Profile {...user} followers={followers} />
          <ChartsWrapper>
            <Pie repos={repos} />
            <HorizontalBarCart repos={repos} />
            <DonutChart repos={repos} />
            <VerticalBarChart repos={repos} />
          </ChartsWrapper>
        </>
      )}
      {message && (
        <SweetAlert
          message={message}
          type={status === 200 ? 'success' : 'error'}
          callBack={clearMessage}
          withButtons
          failedButton="Close"
          successButton="OK"
        />
      )}
    </section>
  );
};

Search.whyDidYouRender = true;

export default memo(Search);

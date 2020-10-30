import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const redux = createSelector(
  state => state.auth.token,
  state => state.auth.loading,
  (token, loading) => ({ isAuthenticated: !!token, loading })
);

export const useAuth = () => {
  const data = useSelector(redux);

  return { ...data };
};

import { Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Spinner from '@components/spinner';

const PrivateRoute = ({ Component, isAuthenticated, ...rest }) => (
  <Suspense fallback={<Spinner />}>
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  </Suspense>
);

export default PrivateRoute;

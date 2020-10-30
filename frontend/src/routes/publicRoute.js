import { Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Spinner from '@components/spinner';

const PublicRoute = ({ Component, redirect, ...rest }) => (
  <Suspense fallback={<Spinner />}>
    <Route
      {...rest}
      render={props =>
        !redirect ? <Component {...props} /> : <Redirect to="/dashboard" />
      }
    />
  </Suspense>
);

export default PublicRoute;

import { lazy } from 'react';

export const publicRoutes = [
  {
    exact: true,
    path: '/',
    Component: lazy(() => import('../containers/Home/index')),
  },
];

export const unAuthorizedRoutes = [
  {
    exact: true,
    path: '/login',
    Component: lazy(() => import('../containers/auth/Login/index')),
  },
  {
    exact: true,
    path: '/register',
    Component: lazy(() => import('../containers/auth/Registration/index')),
  },
];

export const authenticatedRoutes = [
  {
    exact: true,
    path: '/dashboard',
    Component: lazy(() => import('../containers/Search/index')),
  },
  {
    exact: true,
    path: '/data',
    Component: lazy(() => import('../containers/Data/index')),
  },
  {
    exact: true,
    path: '/files',
    Component: lazy(() => import('../containers/Files/index')),
  },
  {
    exact: true,
    path: '/profile',
    Component: lazy(() => import('../containers/Profile/index')),
  },
];

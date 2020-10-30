import { Route } from 'react-router';
import { NavLink as RouterNavLink } from 'react-router-dom';

const NavLink = ({ to, children, exact = true, ...rest }) => (
  <Route
    exact
    render={({ location }) => {
      let active = location.pathname === to;

      if (!exact && location.pathname.includes(to)) {
        active = true;
      }

      return (
        <RouterNavLink
          {...rest}
          to={to}
          onClick={e => {
            if (active) e.preventDefault();
          }}
        >
          {children}
        </RouterNavLink>
      );
    }}
  />
);

export default NavLink;

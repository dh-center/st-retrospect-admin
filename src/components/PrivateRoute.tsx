import { Route, Redirect } from 'react-router-dom';
import React, { ReactElement, ReactNode } from 'react';
import { RouteProps } from 'react-router';
import { useAuthContext } from '../controllers/authController';

/**
 * A wrapper for <Route> that redirects to the login  screen if you're not yet authenticated.
 *
 * @param props - route props
 * @param props.children - route childrens
 */
export default function PrivateRoute({ children, ...rest }: React.PropsWithChildren<RouteProps>): ReactElement {
  const authContext = useAuthContext();

  return (
    <Route
      {...rest}
      render={({ location }): ReactNode =>
        authContext.isAuthenticated()
          ? (children)
          : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )
      }
    />
  );
}

import { Route, Redirect } from 'react-router-dom';
import React, { ReactElement, ReactNode } from 'react';
import authController from '../controllers/authController';
import { RouteProps } from 'react-router';

/**
 * A wrapper for <Route> that redirects to the login  screen if you're not yet authenticated.
 */
export default function PrivateRoute({ children, ...rest }: React.PropsWithChildren<RouteProps>): ReactElement {
  return (
    <Route
      {...rest}
      render={({ location }): ReactNode =>
        authController.isAuthenticated() ? (children) : (
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

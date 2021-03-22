import { ReactElement } from 'react';
import PrivateRoute from '../PrivateRoute';
import { Switch } from 'react-router-dom';
import UsersPage from './UsersPage';

/**
 * Page for displaying users
 */
export default function UsersRouter(): ReactElement {
  return (
    <Switch>
      <PrivateRoute path='/users'>
        <UsersPage/>
      </PrivateRoute>
    </Switch>
  );
}

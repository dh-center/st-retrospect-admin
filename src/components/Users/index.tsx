import { ReactElement, Suspense } from 'react';
import PrivateRoute from '../PrivateRoute';
import { Switch } from 'react-router-dom';
import UsersPage from './UsersPage';
import UserView from './UserView';
import LoadingPlaceholder from '../utils/LoadingPlaceholder';
import UserEdit from './UserEdit';

/**
 * Page for displaying users
 */
export default function UsersRouter(): ReactElement {
  return (
    <Switch>
      <PrivateRoute path='/users/:id/edit'>
        <Suspense
          fallback={<LoadingPlaceholder
            alt='Loading user...'
          />}
        >
          <UserEdit/>
        </Suspense>
      </PrivateRoute>

      <PrivateRoute path='/users/:id'>
        <Suspense
          fallback={<LoadingPlaceholder
            alt='Loading user...'
          />}
        >
          <UserView/>
        </Suspense>
      </PrivateRoute>

      <PrivateRoute path='/users'>
        <UsersPage/>
      </PrivateRoute>
    </Switch>
  );
}

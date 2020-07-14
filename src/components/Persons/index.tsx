import React, { ReactElement } from 'react';
import PrivateRoute from '../PrivateRoute';
import { Switch } from 'react-router-dom';
import PersonCreateComponent from './PersonCreate';
import PersonViewComponent from './PersonView';
import PersonsPage from './PersonsPage';

/**
 * Page for displaying persons
 */
export default function PersonsRouter(): ReactElement {
  return (
    <Switch>
      <PrivateRoute path={'/persons/create'}>
        <PersonCreateComponent/>
      </PrivateRoute>
      <PrivateRoute path={'/persons/:id'}>
        <PersonViewComponent/>
      </PrivateRoute>
      <PrivateRoute path={'/persons'}>
        <PersonsPage/>
      </PrivateRoute>
    </Switch>
  );
}

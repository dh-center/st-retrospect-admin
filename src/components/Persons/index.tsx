import React, { ReactElement } from 'react';
import PrivateRoute from '../PrivateRoute';
import { Switch } from 'react-router-dom';
import PersonView from './PersonView';
import PersonEditPageRenderer from './PersonEdit';
import PersonsPage from './PersonsPage';
import PersonCreate from './PersonCreate';

/**
 * Page for displaying persons
 */
export default function PersonsRouter(): ReactElement {
  return (
    <Switch>
      <PrivateRoute path='/persons/create'>
        <PersonCreate/>
      </PrivateRoute>
      <PrivateRoute path='/persons/:id/edit'>
        <PersonEditPageRenderer/>
      </PrivateRoute>
      <PrivateRoute path='/persons/:id'>
        <PersonView/>
      </PrivateRoute>
      <PrivateRoute path='/persons'>
        <PersonsPage/>
      </PrivateRoute>
    </Switch>
  );
}

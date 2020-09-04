import React, { ReactElement } from 'react';
import PrivateRoute from '../PrivateRoute';
import { Switch } from 'react-router-dom';
// import PersonCreate from './PersonCreate';
import PersonView from './PersonView';
import PersonEdit from './PersonEdit';
import PersonsPage from './PersonsPage';

/**
 * Page for displaying persons
 */
export default function PersonsRouter(): ReactElement {
  return (
    <Switch>
      {/*<PrivateRoute path='/persons/create'>*/}
      {/*  <PersonCreate/>*/}
      {/*</PrivateRoute>*/}
      <PrivateRoute path='/persons/:id/edit'>
        <PersonEdit/>
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

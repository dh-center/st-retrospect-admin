import React, { ReactElement } from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import RelationsPage from './RelationsPage';
import RelationView from './RelationView';

/**
 * Page for displaying relations pages
 */
export default function RelationsRouter(): ReactElement {
  return (
    <Switch>
      <PrivateRoute path='/relations/:id'>
        <RelationView/>
      </PrivateRoute>
      <PrivateRoute path='/relations'>
        <RelationsPage/>
      </PrivateRoute>
    </Switch>
  );
}

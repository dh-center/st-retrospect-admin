import React, { ReactElement } from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import RelationTypesPage from './RelationTypesPage';
import RelationTypeView from './RelationTypeView';
import RelationTypeCreate from './RelationTypeCreate';
import RelationTypeEdit from './RelationTypeEdit';

/**
 * Page for displaying relation types pages
 */
export default function RelationTypesRouter(): ReactElement {
  return (
    <Switch>
      <PrivateRoute path='/relationTypes/create'>
        <RelationTypeCreate/>
      </PrivateRoute>
      <PrivateRoute path='/relationTypes/:id/edit'>
        <RelationTypeEdit/>
      </PrivateRoute>
      <PrivateRoute path='/relationTypes/:id'>
        <RelationTypeView/>
      </PrivateRoute>
      <PrivateRoute path='/relationTypes'>
        <RelationTypesPage/>
      </PrivateRoute>
    </Switch>
  );
}

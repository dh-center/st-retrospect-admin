import React, { ReactElement } from 'react';
import Switch from 'react-bootstrap/Switch';
import PrivateRoute from '../PrivateRoute';
import RelationTypesPage from './RelationTypesPage';

/**
 * Page for displaying relation types pages
 */
export default function RelationTypesRouter(): ReactElement {
  return (
    <Switch>
      <PrivateRoute path='/relationTypes'>
        <RelationTypesPage/>
      </PrivateRoute>
    </Switch>
  );
}

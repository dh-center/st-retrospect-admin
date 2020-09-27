import React, { ReactElement } from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';

/**
 * Page for displaying relations pages
 */
export default function RelationsRouter(): ReactElement {
  return (
    <Switch>
      <PrivateRoute path='/relations'>
        Relations list page
      </PrivateRoute>
    </Switch>
  );
}

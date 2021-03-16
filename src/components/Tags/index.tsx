import React, { ReactElement } from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import TagsPage from './TagsPage';

export default function TagsRouter(): ReactElement {
  return (
    <Switch>
      <PrivateRoute path='/tags'>
        <TagsPage/>
      </PrivateRoute>
    </Switch>
  );
}

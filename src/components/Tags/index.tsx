import React, { ReactElement } from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import TagsPage from './TagsPage';
import TagView from './TagView';

export default function TagsRouter(): ReactElement {
  return (
    <Switch>
      <PrivateRoute path='/tags/:id'>
        <TagView/>
      </PrivateRoute>
      <PrivateRoute path='/tags'>
        <TagsPage/>
      </PrivateRoute>
    </Switch>
  );
}

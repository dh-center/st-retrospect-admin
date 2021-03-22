import { ReactElement } from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import TagsPage from './TagsPage';
import TagView from './TagView';
import TagEdit from './TagEdit';
import TagCreate from './TagCreate';

export default function TagsRouter(): ReactElement {
  return (
    <Switch>
      <PrivateRoute path='/tags/create'>
        <TagCreate/>
      </PrivateRoute>
      <PrivateRoute path='/tags/:id/edit'>
        <TagEdit/>
      </PrivateRoute>
      <PrivateRoute path='/tags/:id'>
        <TagView/>
      </PrivateRoute>
      <PrivateRoute path='/tags'>
        <TagsPage/>
      </PrivateRoute>
    </Switch>
  );
}

import { ReactElement } from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import QuestCreate from './QuestCreate';
import QuestView from './QuestView';
import QuestPage from './QuestsPage';
import QuestEdit from './QuestEdit';

/**
 * Functional component for quests view
 */
export default function QuestsRouter(): ReactElement {
  return (
    <Switch>
      <PrivateRoute path='/quests/create'>
        <QuestCreate/>
      </PrivateRoute>
      <PrivateRoute path='/quests/:id/edit'>
        <QuestEdit/>
      </PrivateRoute>
      <PrivateRoute path='/quests/:id'>
        <QuestView/>
      </PrivateRoute>
      <PrivateRoute path='/quests'>
        <QuestPage/>
      </PrivateRoute>
    </Switch>
  );
}

import React, { ReactElement } from 'react';
import './index.css';
import Navigation from '../components/Navigation';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../components/Login';
import PrivateRoute from '../components/PrivateRoute';
import PersonsPage from '../components/Persons/PersonsPage';
import QuestsPage from '../components/Quests/QuestsPage';
import Quiz from '../components/Quiz';

/**
 * Main component of the application
 */
function App(): ReactElement {
  return (
    <div className="app">
      <Switch>

        <Route path='/login'>
          <Login/>
        </Route>

        <PrivateRoute path='/'>
          <Navigation/>

          <Switch>

            <PrivateRoute path='/persons'>
              <PersonsPage/>
            </PrivateRoute>

            <PrivateRoute path='/quests'>
              <QuestsPage/>
            </PrivateRoute>

            <PrivateRoute path='/quiz'>
              <Quiz/>
            </PrivateRoute>

            <PrivateRoute path='/'>
              <Redirect to='/persons'/>
            </PrivateRoute>
          </Switch>

        </PrivateRoute>

      </Switch>
    </div>
  );
}

export default App;

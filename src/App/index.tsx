import React, { ReactElement } from 'react';
import './index.css';
import Navigation from '../components/Navigation';
import { Switch, Route } from 'react-router-dom';
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
    <div className="App">
      <Navigation/>
      <Switch>
        <Route path='/login'>
          <Login/>
        </Route>
        <PrivateRoute path='/persons'>
          <PersonsPage/>
        </PrivateRoute>
        <PrivateRoute path='/quests'>
          <QuestsPage/>
        </PrivateRoute>
        <PrivateRoute path='/quiz'>
          <Quiz/>
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;

// A wrapper for <Route> that redirects to the login
//

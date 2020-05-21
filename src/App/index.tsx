import React, { ReactElement } from 'react';
import './index.css';
import Navigation from '../components/Navigation';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../components/Login';
import PrivateRoute from '../components/PrivateRoute';
import PersonsPage from '../components/Persons/PersonsPage';
import QuestsPage from '../components/Quests/QuestsPage';
import Quiz from '../components/Quiz';
import { QueryRenderer } from 'react-relay';
import environment from '../relay-env';
import graphql from 'babel-plugin-relay/macro';
import { AppQuery, AppQueryResponse } from './__generated__/AppQuery.graphql';

const renderQuery = ({ error, props }: { error: Error | null; props: AppQueryResponse | null }): React.ReactNode => {
  if (error) {
    return (
      <div>
        <pre>
          Error during loading page
          {error.toString()}
        </pre>
      </div>
    );
  }

  return (
    <div className="app">
      <Switch>

        <Route path='/login'>
          <Login/>
        </Route>

        <PrivateRoute path='/'>
          <Navigation user={props}/>

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
};

/**
 * Main component of the application
 */
function App(): ReactElement {
  return (
    <QueryRenderer<AppQuery>
      environment={environment}
      query={graphql`
        query AppQuery {
            ...Navigation_user
        }
      `}
      variables={{}}
      render={renderQuery}/>
  );
}

export default App;

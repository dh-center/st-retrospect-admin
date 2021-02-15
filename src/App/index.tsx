import React, { ReactElement } from 'react';
import Navigation from '../components/Navigation';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../components/Authentication/Login';
import PrivateRoute from '../components/PrivateRoute';
import PersonsPage from '../components/Persons';
import UsersPage from '../components/Users';
import QuestsPage from '../components/Quests';
import RelationsPage from '../components/Relations';
import RelationTypesPage from '../components/RelationTypes';
import { QueryRenderer } from 'react-relay';
import environment from '../relay-env';
import graphql from 'babel-plugin-relay/macro';
import { AppQuery, AppQueryResponse } from './__generated__/AppQuery.graphql';
import VisualizationPage from '../components/Visualization';
import LocationsPage from '../components/Locations';
import Registration from '../components/Authentication/Registration';

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
    <>
      <Navigation user={props}/>

      <Switch>
        <PrivateRoute path='/users'>
          <UsersPage/>
        </PrivateRoute>

        <PrivateRoute path='/persons'>
          <PersonsPage/>
        </PrivateRoute>

        <PrivateRoute path='/locations'>
          <LocationsPage/>
        </PrivateRoute>

        <PrivateRoute path='/quests'>
          <QuestsPage/>
        </PrivateRoute>

        <PrivateRoute path='/relations'>
          <RelationsPage/>
        </PrivateRoute>

        <PrivateRoute path='/relation-types'>
          <RelationTypesPage/>
        </PrivateRoute>

        <PrivateRoute path='/'>
          <Redirect to='/persons'/>
        </PrivateRoute>
      </Switch>
    </>
  );
};

/**
 * Main component of the application
 */
function App(): ReactElement {
  return (
    <div className='h-100 d-flex flex-column'>
      <Switch>

        <Route path='/login'>
          <Login/>
        </Route>

        <Route path='/sign-up'>
          <Registration/>
        </Route>

        <Route path='/visualization/:chartName?'>
          <VisualizationPage/>
        </Route>

        <PrivateRoute path='/'>
          <QueryRenderer<AppQuery>
            environment={environment}
            query={graphql`
                query AppQuery {
                    ...Navigation_user
                }
            `}
            render={renderQuery}
            variables={{}}/>
        </PrivateRoute>

      </Switch>
    </div>

  );
}

export default App;

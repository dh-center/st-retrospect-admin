import React, { ReactElement } from 'react';
import './index.css';
// import Navigation from '../components/Navigation';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import routes from '../router/routes';
import { QueryRenderer } from 'react-relay';
import environment from '../relay-env';

import graphql from 'babel-plugin-relay/macro';

import { AppLocationsQuery } from './__generated__/AppLocationsQuery.graphql';

/**
 * Main component of the application
 */
function App(): ReactElement {
  return (
    <div className="App">
      <QueryRenderer<AppLocationsQuery>
        environment={environment}
        query={graphql`
          query AppLocationsQuery {
            locations {
              id
              name
            }
          }
        `}
        variables={{}}
        render={({ error, props }): React.ReactNode => {
          if (error) {
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }

          return <div>User ID: {props.locations[0].name}</div>;
        }}
      >

      </QueryRenderer>
      {/* <Router>*/}
      {/*  <Navigation/>*/}
      {/*  <Switch>*/}
      {/*    {routes.map((route, key) => (*/}
      {/*      <Route*/}
      {/*        key={key}*/}
      {/*        path={route.path}*/}
      {/*        render={route.component}*/}
      {/*      />*/}
      {/*    ))}*/}
      {/*  </Switch>*/}
      {/* </Router>*/}
    </div>
  );
}

export default App;

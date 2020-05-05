import React, { ReactElement } from 'react';
import './index.css';
import Navigation from '../components/Navigation';
import { Switch, Route } from 'react-router-dom';
import routes from '../router/routes';

/**
 * Main component of the application
 */
function App(): ReactElement {
  return (
    <div className="App">

      <Navigation/>
      <Switch>
        {routes.map((route, key) => (
          <Route
            key={key}
            path={route.path}
            render={route.component}
          />
        ))}
      </Switch>
    </div>
  );
}

export default App;

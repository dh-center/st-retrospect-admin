import React from 'react';
import './index.css';
import Navigation from '../components/Navigation';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import routes from '../router/routes';

function App() {
  return (
    <div className="App">
      <Router>
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
      </Router>
    </div>
  );
}

export default App;

import React, { ReactElement } from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import LocationView from './LocationView';
import LocationPage from './LocationsPage';

/**
 * Functional component for quests view
 */
export default function LocationsRouter(): ReactElement {
  return (
    <Switch>
      <PrivateRoute path={'/locations/:id'}>
        <LocationView/>
      </PrivateRoute>
      <PrivateRoute path={'/locations'}>
        <LocationPage/>
      </PrivateRoute>
    </Switch>
  );
}

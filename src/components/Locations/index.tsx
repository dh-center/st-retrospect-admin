import { ReactElement, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import LocationView from './LocationView';
import LocationPage from './LocationsPage';
import LocationEdit from './LocationEdit';
import LocationCreate from './LocationCreate';
import LoadingPlaceholder from '../utils/LoadingPlaceholder';

/**
 * Functional component for quests view
 */
export default function LocationsRouter(): ReactElement {
  return (
    <Switch>
      <PrivateRoute path='/locations/create'>
        <LocationCreate/>
      </PrivateRoute>
      <PrivateRoute path='/locations/:id/edit'>
        <LocationEdit/>
      </PrivateRoute>
      <PrivateRoute path='/locations/:id'>
        <LocationView/>
      </PrivateRoute>
      <PrivateRoute path='/locations'>
        <Suspense fallback={<LoadingPlaceholder/>}>
          <LocationPage/>
        </Suspense>
      </PrivateRoute>
    </Switch>
  );
}

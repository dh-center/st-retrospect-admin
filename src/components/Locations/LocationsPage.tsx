import React, { ReactElement } from 'react';
import { QueryRenderer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { LocationsPageQuery } from './__generated__/LocationsPageQuery.graphql';
import environment from '../../relay-env';
import { ENTITIES_PER_PAGE } from '../../constants';
import LocationsList from './LocationsList';
import LoadingPlaceholder from '../utils/LoadingPlaceholder';

/**
 * Functional component for Locations view
 */
export default function LocationsPage(): ReactElement {
  return (
    <QueryRenderer<LocationsPageQuery>
      environment={environment}
      query={graphql`
        query LocationsPageQuery (
          $first: Int,
          $after: Cursor
        ) {
          ...LocationsList_entityConnection @arguments(first: $first, after: $after)
        }
            `}
      render={({ error, props }): React.ReactNode => {
        if (error) {
          return <div>Error!</div>;
        }
        if (!props) {
          return <LoadingPlaceholder
            alt='Loading locations...'
          />;
        }

        return <LocationsList entityConnection={props} entityName='locations' />;
      }}
      variables={{
        first: ENTITIES_PER_PAGE,
        after: null,
      }}
    />
  );
}

import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import environment from '../../appEnv';
import { useParams } from 'react-router';
import { LocationEditQuery } from './__generated__/LocationEditQuery.graphql';
import LoadingPlaceholder from '../utils/LoadingPlaceholder';
import LocationEditForm from './LocationEditForm';

/**
 * Page with form for location editing
 */
function LocationEdit(): React.ReactElement {
  const { id } = useParams<{id: string}>();

  return (
    <QueryRenderer<LocationEditQuery>
      environment={environment}
      query={graphql`
        query LocationEditQuery($id: GlobalId!) {
          location(id: $id) {
            ...LocationEditForm_originalLocation
         }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          return <div>Error</div>;
        }

        if (!props) {
          return <LoadingPlaceholder
            alt='Loading location...'
          />;
        }

        if (!props.location) {
          return <div>There is no location with provided id</div>;
        }

        return <LocationEditForm originalLocation={props.location}/>;
      }}
      variables={{ id }}
    />
  );
}

export default LocationEdit;

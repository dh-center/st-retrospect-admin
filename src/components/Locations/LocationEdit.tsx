import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import environment from '../../relay-env';
import { useParams } from 'react-router';
import { LocationEditQuery } from './__generated__/LocationEditQuery.graphql';
import LocationInfo from './LocationInfo';

/**
 * Page with form for location editing
 */
function LocationEdit(): React.ReactElement {
  const { id } = useParams();

  return (
    <QueryRenderer<LocationEditQuery>
      environment={environment}
      query={graphql`
        query LocationEditQuery($id: ID!) {
          location(id: $id) {
          ...LocationInfo_data
         }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          return <div>Error</div>;
        }

        if (!props) {
          return <div>Loading</div>;
        }

        if (!props.location) {
          return <div>There is no location with provided id</div>;
        }

        return <LocationInfo data={props.location}/>;
      }}
      variables={{ id }}
    />
  );
}

export default LocationEdit;

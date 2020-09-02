import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import environment from '../../relay-env';
import { useParams } from 'react-router';
import { LocationViewQuery } from './__generated__/LocationViewQuery.graphql';
import LocationInfo from './LocationInfo';

/**
 * Page with location info to view
 */
function LocationView(): React.ReactElement {
  const { id } = useParams();

  return (
    <QueryRenderer<LocationViewQuery>
      environment={environment}
      query={graphql`
        query LocationViewQuery($id: ID!) {
          entity: location(id: $id) {
          ...LocationInfo_data
         }
        }
      `}
      variables={{ id }}
      render={({ error, props }) => {
        if (error) {
          return <div>Error</div>;
        }

        if (!props) {
          return <div>Loading</div>;
        }

        if (!props.entity) {
          return <div>There is no location with provided id</div>;
        }

        return <LocationInfo data={props.entity}/>;
      }}
    />
  );
}

export default LocationView;

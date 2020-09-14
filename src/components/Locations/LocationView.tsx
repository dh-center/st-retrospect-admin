import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import environment from '../../relay-env';
import { useParams } from 'react-router';
import { LocationViewQuery } from './__generated__/LocationViewQuery.graphql';
import LocationInfo from './LocationInfo';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import ContentWrapper from '../ContentWrapper';

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
          ...LocationInfo_location
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

        if (!props.entity) {
          return <div>There is no location with provided id</div>;
        }

        return (
          <ContentWrapper>
            <LocationInfo location={props.entity} viewOnly/>
            <div>
              <LinkContainer to={`/locations/${id}/edit`}>
                <Button className='m-1' variant='outline-warning'>Edit</Button>
              </LinkContainer>
              <Button className='m-1' variant='outline-danger'>Delete</Button>
            </div>
          </ContentWrapper>
        );
      }}
      variables={{ id }}
    />
  );
}

export default LocationView;

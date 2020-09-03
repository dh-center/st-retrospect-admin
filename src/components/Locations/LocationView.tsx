import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import environment from '../../relay-env';
import { useParams } from 'react-router';
import { LocationViewQuery } from './__generated__/LocationViewQuery.graphql';
import LocationInfo from './LocationInfo';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

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

        return (
          <div className='d-flex justify-content-center' >
            <div
              style={{
                maxWidth: '800px',
                width: '100%',
              }}
            >
              <LocationInfo data={props.entity}/>
              <LinkContainer to={`${id}/edit`}>
                <Button variant={'outline-warning'} className='m-1'>Edit</Button>
              </LinkContainer>
            </div>
          </div>
        );
      }}
    />
  );
}

export default LocationView;

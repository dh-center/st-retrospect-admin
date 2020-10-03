import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import environment from '../../relay-env';
import { useParams, useHistory } from 'react-router';
import { LocationViewQuery } from './__generated__/LocationViewQuery.graphql';
import LocationInfo, { remove } from './LocationInfo';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import ContentWrapper from '../ContentWrapper';
import notifier from 'codex-notifier';

/**
 * Page with location info to view
 */
function LocationView(): React.ReactElement {
  const { id } = useParams();
  const history = useHistory();

  const removeLocation = async (): Promise<void> => {
    try {
      await remove(id);
      notifier.show({
        message: `Successfully deleted`,
        style: 'success',
        time: 5000,
      });
      history.push('/locations');
    } catch {
      notifier.show({
        message: 'Something went wrong',
        style: 'error',
        time: 5000,
      });
    }
  };

  return (
    <QueryRenderer<LocationViewQuery>
      environment={environment}
      query={graphql`
        query LocationViewQuery($id: GlobalId!) {
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
              <Button className='m-1' onClick={removeLocation} variant='outline-danger'>Delete</Button>
            </div>
          </ContentWrapper>
        );
      }}
      variables={{ id }}
    />
  );
}

export default LocationView;

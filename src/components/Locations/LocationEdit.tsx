import React, { FormEvent, useState } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import environment from '../../relay-env';
import { useParams } from 'react-router';
import { LocationEditQuery } from './__generated__/LocationEditQuery.graphql';
import LocationInfo, { updateInfo } from './LocationInfo';
import ContentWrapper from '../ContentWrapper';
import notifier from 'codex-notifier';
import { useHistory } from 'react-router-dom';
import { UpdateLocationInput } from './__generated__/LocationInfoUpdateMutation.graphql';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/cjs/Button';

/**
 * Page with form for location editing
 */
function LocationEdit(): React.ReactElement {
  const { id } = useParams();
  const [input, setInput] = useState<UpdateLocationInput|null>(null);
  const [isLoading, setLoadingStatus] = useState(false);
  const history = useHistory();

  /**
   * Saves updated person to API
   *
   * @param e - form submit event
   */
  const updateLocation = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (!input) {
      return;
    }

    console.log(input)

    setLoadingStatus(true);
    try {
      await updateInfo(input);
      notifier.show({
        message: `Successfully created`,
        style: 'success',
        time: 5000,
      });
      setLoadingStatus(false);
      history.push('/locations');
    } catch {
      setLoadingStatus(false);
      notifier.show({
        message: 'Something went wrong',
        style: 'error',
        time: 5000,
      });
    }
  };

  return (
    <QueryRenderer<LocationEditQuery>
      environment={environment}
      query={graphql`
        query LocationEditQuery($id: ID!) {
          location(id: $id) {
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

        if (!props.location) {
          return <div>There is no location with provided id</div>;
        }

        return (
          <ContentWrapper>
            <Form onSubmit={updateLocation}>
              <LocationInfo location={props.location} onChange={setInput}/>
              <Button type='submit'>Save</Button>
              <Button type='button'>Cancel</Button>
            </Form>
          </ContentWrapper>
        );
      }}
      variables={{ id }}
    />
  );
}

export default LocationEdit;

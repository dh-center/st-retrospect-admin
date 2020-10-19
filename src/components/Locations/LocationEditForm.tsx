import React, { FormEvent, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { LabeledLocationMap } from '../LocationMap';
import Input from '../utils/Input';
import LabeledText from '../utils/LabeledText';
import Button from 'react-bootstrap/Button';
import { Spinner } from 'react-bootstrap';
import ContentWrapper from '../ContentWrapper';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { LocationEditForm_originalLocation } from './__generated__/LocationEditForm_originalLocation.graphql';
import { useHistory } from 'react-router-dom';
import notifier from 'codex-notifier';
import commitMutation from 'relay-commit-mutation-promise';
import environment from '../../relay-env';
import {
  LocationEditFormMutation,
  LocationEditFormMutationResponse,
  UpdateLocationInput
} from './__generated__/LocationEditFormMutation.graphql';

/**
 * Updates information about location
 *
 * @param input - data for updating
 */
export function updateInfo(input: UpdateLocationInput): Promise<LocationEditFormMutationResponse> {
  return commitMutation<LocationEditFormMutation>(environment, {
    mutation: graphql`
      mutation LocationEditFormMutation($input: UpdateLocationInput!) {
        location {
          update(input: $input) {
            recordId
          }
        }
      }
    `,
    variables: { input },
  });
}

interface Props {
  originalLocation: LocationEditForm_originalLocation;
}

function LocationEditForm(props: Props): React.ReactElement {
  const [input, setInput] = useState<UpdateLocationInput>({
    ...props.originalLocation,
    addresses: [ ...(props.originalLocation.addresses?.map(addr => ({ ...addr })) || []) ],
  });

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

    setLoadingStatus(true);
    try {
      await updateInfo(input);
      notifier.show({
        message: `Successfully updated`,
        style: 'success',
        time: 5000,
      });
      setLoadingStatus(false);
      history.push(`/locations/${props.originalLocation.id}`);
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
    <ContentWrapper>
      <Form onSubmit={updateLocation}>
        <LabeledLocationMap
          label='Location on map'
          lngLat={(input.longitude && input.latitude) ? [input.longitude, input.latitude] : undefined}
          onChange={(lngLat) => {
            setInput({
              ...input,
              latitude: lngLat.lat,
              longitude: lngLat.lng,
            });
          }}
        />
        {
          (input.addresses || []).map((address, index) =>
            <Input
              key={index}
              label='Location address'
              onChange={(value) => {
                const newAddresses = [ ...(input.addresses || []) ];

                newAddresses[0].address = value;
                setInput({
                  ...input,
                  addresses: newAddresses,
                });
              }}
              value={address.address || ''}
            />
          )
        }
        <div>
          <LabeledText
            content={input.latitude}
            label='Latitude'
          />
          <LabeledText
            content={input.longitude}
            label='Longitude'
          />
        </div>
        <Button
          className='m-1'
          type='submit'
        >
          {isLoading ? (
            <Spinner
              animation='border'
              aria-hidden='true'
              as='span'
              role='status'
              size='sm'
            />
          ) : 'Save'}
        </Button>
      </Form>
    </ContentWrapper>
  );
}

export default createFragmentContainer(
  LocationEditForm,
  {
    originalLocation: graphql`
      fragment LocationEditForm_originalLocation on Location {
        id
        latitude
        longitude
        addresses {
          address
        }
      }
    `,
  }
);

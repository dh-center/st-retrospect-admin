import React, { FormEvent, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { LabeledLocationMap } from '../LocationMap';
import Input from '../utils/Input';
import Button from 'react-bootstrap/Button';
import { Spinner } from 'react-bootstrap';
import ContentWrapper from '../ContentWrapper';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { LocationEditForm_originalLocation } from './__generated__/LocationEditForm_originalLocation.graphql';
import { useHistory } from 'react-router-dom';
import notifier from 'codex-notifier';
import commitMutation from 'relay-commit-mutation-promise';
import environment from '../../appEnv';
import {
  LocationEditFormMutation,
  LocationEditFormMutationResponse,
  UpdateLocationInput
} from './__generated__/LocationEditFormMutation.graphql';
import { LinkContainer } from 'react-router-bootstrap';
import { isLatitudeValid, isLongitudeValid } from '../../utils/checkCoordinate';
import throttle from 'lodash.throttle';
import handleApiError from '../../utils/handleApiError';

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

/**
 * Props for LocationEditForm
 */
interface Props {
  /**
   * Location to edit
   */
  originalLocation: LocationEditForm_originalLocation;
}

/**
 * Form for updating location information
 *
 * @param props - props for component rendering
 */
function LocationEditForm(props: Props): React.ReactElement {
  const [input, setInput] = useState<UpdateLocationInput>({
    ...props.originalLocation,
    addresses: [ ...(props.originalLocation.addresses?.map(addr => ({ ...addr })) || []) ],
  });

  const [isLoading, setLoadingStatus] = useState(false);
  const history = useHistory();

  /**
   * Saves updated location to API
   *
   * @param e - form submit event
   */
  const updateLocation = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (!input) {
      return;
    }

    let savingData = input;

    /**
     * Coordinates must be numbers
     */
    if (savingData.latitude) {
      savingData = {
        ...savingData,
        latitude: +savingData.latitude,
      };
    }
    if (savingData.longitude) {
      savingData = {
        ...savingData,
        longitude: +savingData.longitude,
      };
    }

    setLoadingStatus(true);
    try {
      await updateInfo(savingData);
      notifier.show({
        message: `Successfully updated`,
        style: 'success',
        time: 5000,
      });
      setLoadingStatus(false);
      history.push(`/locations/${props.originalLocation.id}`);
    } catch (error) {
      setLoadingStatus(false);
      handleApiError(error);
    }
  };

  /**
   * Error message if latitude isn't correct
   */
  const showLatitudeValidationErrorMessage = throttle(() => notifier.show({
    message: 'Latitude isn\'t correct. It should be from -90 to 90 and have \'.\' as delimiter.',
    style: 'error',
    time: 5000,
  }), 1000, { trailing: false });

  /**
   * Error message if longitude isn't correct
   */
  const showLongitudeValidationErrorMessage = throttle(() => notifier.show({
    message: 'Longitude isn\'t correct. It should be from -180 to 180 and have \'.\' as delimiter.',
    style: 'error',
    time: 5000,
  }), 1000, { trailing: false });

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
        <Input
          label='Latitude'
          onChange={(value) => {
            if (!isLatitudeValid(value)) {
              showLatitudeValidationErrorMessage();

              return;
            }
            setInput({
              ...input,
              latitude: value,
            });
          }}
          value={input.latitude || 0}
        />
        <Input
          label='Longitude'
          onChange={(value) => {
            if (!isLongitudeValid(value)) {
              showLongitudeValidationErrorMessage();

              return;
            }
            setInput({
              ...input,
              longitude: value,
            });
          }}
          value={input.longitude || 0}
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
        <Button
          className='m-1'
          type='submit'
        >
          {isLoading
            ? (
              <Spinner
                animation='border'
                aria-hidden='true'
                as='span'
                role='status'
                size='sm'
              />
            )
            : 'Save'}
        </Button>
        <LinkContainer to={'/locations/' + props.originalLocation.id}>
          <Button variant='outline-info'>Cancel</Button>
        </LinkContainer>
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

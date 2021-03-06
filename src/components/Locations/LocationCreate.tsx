import React, { FormEvent, useState } from 'react';
import Form from 'react-bootstrap/Form';
import {
  CreateLocationInput,
  LocationInstanceInput,
  LocationCreateMutation,
  LocationCreateMutationResponse
} from './__generated__/LocationCreateMutation.graphql';
import environment from '../../appEnv';
import graphql from 'babel-plugin-relay/macro';
import Input from '../utils/Input';
import Button from 'react-bootstrap/Button';
import commitMutation from 'relay-commit-mutation-promise';
import notifier from 'codex-notifier';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import ContentWrapper from '../ContentWrapper';
import { LabeledLocationMap } from '../LocationMap';
import { isLatitudeValid, isLongitudeValid } from '../../utils/checkCoordinate';
import throttle from 'lodash.throttle';
import handleApiError from '../../utils/handleApiError';

/**
 * Generates input data for creating new location
 */
function generateLocationInput(): CreateLocationInput {
  return {
    latitude: 0,
    longitude: 0,
    instances: [ {
      name: '',
      description: '',
      wikiLink: '',
      constructionDate: '',
      demolitionDate: '',
      startDate: '',
      endDate: '',
    } ],
    addresses: [
      {
        countryCode: 'RU',
        regionCode: 'RU-SPE',
        address: '',
      },
    ],
  };
}

/**
 * Mutation for creating new location
 *
 * @param input - input data for creating
 */
export function create(input: CreateLocationInput): Promise<LocationCreateMutationResponse> {
  return commitMutation<LocationCreateMutation>(environment, {
    mutation: graphql`
      mutation LocationCreateMutation($input: CreateLocationInput!) {
        location {
          create(input: $input) {
            recordId
          }
        }
      }
    `,
    variables: { input },
  });
}

/**
 * Form for creating new location
 */
export default function LocationCreate(): React.ReactElement {
  const [input, setInput] = useState<CreateLocationInput>(generateLocationInput());
  const [isLoading, setLoadingStatus] = useState(false);
  const history = useHistory();

  const instance = input.instances[0];

  const updateLocationInstance = <T extends keyof LocationInstanceInput>(
    key: T,
    value: LocationInstanceInput[T]
  ): void => {
    setInput({
      ...input,
      instances: [
        {
          ...instance,
          [key]: value,
        },
      ],
    });
  };

  /**
   * Saves updated person to API
   *
   * @param e - form submit event
   */
  const saveLocationToApi = async (e: FormEvent): Promise<void> => {
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
      await create(savingData);
      notifier.show({
        message: `Successfully created`,
        style: 'success',
        time: 5000,
      });
      setLoadingStatus(false);
      history.push('/locations');
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
      <Form onSubmit={saveLocationToApi}>
        <Input
          label='Location instance name'
          onChange={(v) => updateLocationInstance('name', v)}
          required
          value={instance.name}
        />
        <Input
          label='Location instance description'
          onChange={(v) => updateLocationInstance('description', v)}
          required
          value={instance.description || ''}
        />
        <LabeledLocationMap
          label='Location on map'
          lngLat={[input.longitude, input.latitude]}
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
          input.addresses.map((address, index) =>
            <Input
              key={index}
              label='Location address'
              onChange={(value) => {
                const newAddresses = [ ...input.addresses ];

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
        <Input
          label='Link to the wiki about this location'
          onChange={(v) => updateLocationInstance('wikiLink', v)}
          value={instance.wikiLink || ''}
        />
        <Input
          label='Construction date of location'
          onChange={(v) => updateLocationInstance('constructionDate', v)}
          value={instance.constructionDate || ''}
        />
        <Input
          label='Demolition date of location'
          onChange={(v) => updateLocationInstance('demolitionDate', v)}
          value={instance.demolitionDate || ''}
        />
        <Input
          label='Start date of the period of this location instance'
          onChange={(v) => updateLocationInstance('startDate', v)}
          value={instance.startDate || ''}
        />
        <Input
          label='End date of the period of this location instance'
          onChange={(v) => updateLocationInstance('endDate', v)}
          value={instance.endDate || ''}
        />
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
            : 'Create'}
        </Button>
      </Form>
    </ContentWrapper>
  );
}

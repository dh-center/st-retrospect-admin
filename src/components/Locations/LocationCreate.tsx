import React, { FormEvent, useState } from 'react';
import Form from 'react-bootstrap/Form';
import {
  CreateLocationInput, CreateLocationInstanceInput, LocationCreateMutation,
  LocationCreateMutationResponse
} from './__generated__/LocationCreateMutation.graphql';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';
import Input from '../utils/Input';
import Button from 'react-bootstrap/Button';
import commitMutation from 'relay-commit-mutation-promise';
import notifier from 'codex-notifier';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

function generateLocationInput(): CreateLocationInput {
  return {
    coordinateX: 0,
    coordinateY: 0,
    instances: [ {
      name: '',
      description: '',
      wikiLink: '',
      constructionDate: '',
      startDate: '',
      endDate: '',
    } ],
  };
}

/**
 * Executes update mutation for person
 *
 * @param input - updated person object
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

export default function LocationCreate(): React.ReactElement {
  const [input, setInput] = useState<CreateLocationInput>(generateLocationInput());
  const [isLoading, setLoadingStatus] = useState(false);
  const history = useHistory();

  const instance = input.instances[0];

  const updateLocationInstance = <T extends keyof CreateLocationInstanceInput>(
    key: T,
    value: CreateLocationInstanceInput[T]
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

    setLoadingStatus(true);
    try {
      await create(input);
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
    <div>
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
          {isLoading ? (
            <Spinner
              animation='border'
              aria-hidden='true'
              as='span'
              role='status'
              size='sm'
            />
          ) : 'Create'}
        </Button>
      </Form>
    </div>
  );
}

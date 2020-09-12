import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import {
  CreateLocationInput, CreateLocationInstanceInput, LocationCreateMutation,
  LocationCreateMutationResponse
} from './__generated__/LocationCreateMutation.graphql';
import commitMutation from 'relay-commit-mutation-promise';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';
import Input from '../utils/Input';
import Button from 'react-bootstrap/Button';

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

export default function LocationCreate(): React.ReactElement {
  const [input, setInput] = useState<CreateLocationInput>(generateLocationInput());
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

  return (
    <div>
      <Form>
        <Input
          label='Location instance name'
          onChange={(v) => updateLocationInstance('name', v)}
          value={instance.name}
        />
        <Input
          label='Location instance description'
          onChange={(v) => updateLocationInstance('description', v)}
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
      </Form>
      <Button variant='success'>
        Create
      </Button>
    </div>
  );
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

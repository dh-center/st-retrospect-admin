import React, { FormEvent, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import useUniqueId from '../../utils/useUniqueId';
import { createRefetchContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { LocationInstanceInfoDialog_locationInstance } from './__generated__/LocationInstanceInfoDialog_locationInstance.graphql';
import ContentWrapper from '../ContentWrapper';
import commitMutation from 'relay-commit-mutation-promise';
import environment from '../../relay-env';
import type {
  LocationInstanceInfoDialogUpdateMutation,
  LocationInstanceInfoDialogUpdateMutationResponse,
  UpdateLocationInstanceInput
} from './__generated__/LocationInstanceInfoDialogUpdateMutation.graphql';
import type {
  CreateLocationInstanceInput,
  LocationInstanceInfoDialogCreateMutation,
  LocationInstanceInfoDialogCreateMutationResponse
} from './__generated__/LocationInstanceInfoDialogCreateMutation.graphql';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';

type LocationInstanceInputs = CreateLocationInstanceInput | UpdateLocationInstanceInput;

interface Props {
  onHide(): void;
  isShown: boolean;
  locationInstance: LocationInstanceInfoDialog_locationInstance | null;
}

function isUpdateInput(input: LocationInstanceInputs): input is UpdateLocationInstanceInput {
  return 'id' in input;
}

function generateLocationInstanceInput(locationId: string): CreateLocationInstanceInput {
  return {
    constructionDate: '',
    demolitionDate: '',
    description: '',
    endDate: '',
    name: '',
    startDate: '',
    locationId,
  };
}

function instanceToInput(instance: LocationInstanceInfoDialog_locationInstance | null, locationId: string): LocationInstanceInputs {
  if (!instance) {
    return generateLocationInstanceInput(locationId);
  }

  return {
    locationId,
    constructionDate: instance.constructionDate,
    demolitionDate: instance.demolitionDate,
    description: instance.description || '',
    endDate: instance.endDate,
    name: instance.name || '',
    startDate: instance.startDate,
    id: instance.id,
  };
}

function LocationInstanceInfoDialog(props: Props): React.ReactElement {
  const { id: locationId } = useParams();
  const id = useUniqueId('location-instance-info-dialog');
  const [instanceCopy, setInstanceCopy] = useState(props.locationInstance);
  const [isEditing, setIsEditing] = useState(!props.locationInstance);
  const [input, setInput] = useState<LocationInstanceInputs>(instanceToInput(instanceCopy, locationId));

  useEffect(() => {
    setInstanceCopy(props.locationInstance);
    setInput(instanceToInput(props.locationInstance, locationId));
  }, [props.locationInstance, locationId]);

  useEffect(() => {
    setIsEditing(!props.locationInstance);
  }, [ props.locationInstance ]);

  const submit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (isUpdateInput(input)) {
      return;
    }

    await create(input);
    props.onHide();
  };

  return (
    <Modal onHide={props.onHide} show={props.isShown} size='xl'>
      <ContentWrapper>
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Label htmlFor={id`name`}>Name</Form.Label>
            <Form.Control
              disabled={!isEditing}
              id={id`name`}
              onChange={(e) => {
                setInput({
                  ...input,
                  name: e.target.value,
                });
              }}
              type='text'
              value={input.name || ''}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor={id`description`}>Description</Form.Label>
            <Form.Control
              as='textarea'
              disabled={!isEditing}
              id={id`description`}
              onChange={(e) => {
                setInput({
                  ...input,
                  description: e.target.value,
                });
              }}
              rows={20}
              value={input.description || ''}

            />
          </Form.Group>
          <div>
            { !props.locationInstance &&
            <Button type='submit'>Create</Button>
            }
            { props.locationInstance &&
            <>
              <Button className={'m-1'} onClick={() => setIsEditing(true)} variant='outline-warning'>Edit</Button>
              <Button className={'m-1'} type='button' variant='outline-danger'>Delete</Button>
            </>
            }
          </div>
        </Form>
      </ContentWrapper>
    </Modal>
  );
}

export default createRefetchContainer(
  LocationInstanceInfoDialog,
  {
    locationInstance: graphql`
      fragment LocationInstanceInfoDialog_locationInstance on LocationInstance {
        id
        name
        description
        constructionDate
        demolitionDate
        startDate
        endDate
      }
    `,
  },
  graphql`
    query LocationInstanceInfoDialogRefetchQuery($locationInstaceId: ID!) {
      locationInstance(id: $locationInstaceId) {
        ...LocationInstanceInfoDialog_locationInstance
      }
    }
  `
);

/**
 * Mutation for creating LocationInstance
 *
 * @param input - input data for creating
 */
export function create(input: CreateLocationInstanceInput): Promise<LocationInstanceInfoDialogCreateMutationResponse> {
  return commitMutation<LocationInstanceInfoDialogCreateMutation>(environment, {
    mutation: graphql`
      mutation LocationInstanceInfoDialogCreateMutation($input: CreateLocationInstanceInput!) {
        locationInstances {
          create(input: $input) {
            record {
              id
              location {
                instances {
                  id
                }
              }
            }
          }
        }
      }
    `,
    variables: { input },
  });
}

/**
 * Mutation for updating LocationInstance info
 *
 * @param input - input data for updating
 */
export function update(input: UpdateLocationInstanceInput): Promise<LocationInstanceInfoDialogUpdateMutationResponse> {
  return commitMutation<LocationInstanceInfoDialogUpdateMutation>(environment, {
    mutation: graphql`
        mutation LocationInstanceInfoDialogUpdateMutation($input: UpdateLocationInstanceInput!) {
          locationInstances {
            update(input: $input) {
              recordId
            }
          }
        }
    `,
    variables: { input },
  });
}

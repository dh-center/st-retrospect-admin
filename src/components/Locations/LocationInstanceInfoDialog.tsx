import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import useUniqueId from '../../utils/useUniqueId';
import { createRefetchContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { LocationInstanceInfoDialog_locationInstance } from './__generated__/LocationInstanceInfoDialog_locationInstance.graphql';
import ContentWrapper from '../ContentWrapper';
import commitMutation from 'relay-commit-mutation-promise';
import environment from '../../relay-env';
import {
  LocationInstanceInfoDialogUpdateMutation,
  LocationInstanceInfoDialogUpdateMutationResponse,
  UpdateLocationInstanceInput
} from './__generated__/LocationInstanceInfoDialogUpdateMutation.graphql';
import {
  LocationInstanceInfoDialogCreateMutation,
  LocationInstanceInfoDialogCreateMutationResponse,
  CreateLocationInstanceInput
} from './__generated__/LocationInstanceInfoDialogCreateMutation.graphql';

interface Props {
  onHide(): void;
  isShown: boolean;
  locationInstance: LocationInstanceInfoDialog_locationInstance | null;
}

function LocationInstanceInfoDialog(props: Props): React.ReactElement {
  const id = useUniqueId('location-instance-info-dialog');

  if (!props.locationInstance) {
    return <Modal>Loading</Modal>;
  }

  return (
    <Modal onHide={props.onHide} show={props.isShown}>
      <ContentWrapper>
        <Form.Group>
          <Form.Label htmlFor={id`name`}>Name</Form.Label>
          <Form.Control
            disabled
            id={id`name`}
            type='text'
            value={props.locationInstance.name || ''}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor={id`description`}>Description</Form.Label>
          <Form.Control
            as='textarea'
            disabled
            id={id`description`}
            rows={20}
            value={props.locationInstance.description || ''}
          />
        </Form.Group>
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
 * @param input - input data for updating
 */
export function create(input: CreateLocationInstanceInput): Promise<LocationInstanceInfoDialogCreateMutationResponse> {
  return commitMutation<LocationInstanceInfoDialogCreateMutation>(environment, {
    mutation: graphql`
      mutation LocationInstanceInfoDialogCreateMutation($input: CreateLocationInstanceInput!) {
        locationInstances {
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

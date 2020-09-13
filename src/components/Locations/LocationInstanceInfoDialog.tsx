import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import useUniqueId from '../../utils/useUniqueId';
import { createRefetchContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { LocationInstanceInfoDialog_locationInstance } from './__generated__/LocationInstanceInfoDialog_locationInstance.graphql';

interface Props {
  onHide(): void;
  locationInstance: LocationInstanceInfoDialog_locationInstance | null;
}

function LocationInstanceInfoDialog(props: Props): React.ReactElement {
  const id = useUniqueId('location-instance-info-dialog');

  if (!props.locationInstance) {
    return <Modal>Loading</Modal>;
  }

  return (
    <Modal onHide={props.onHide} show={!!props.locationInstance}>
      <div>
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
      </div>
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

import Form from 'react-bootstrap/Form';
import React from 'react';
import useUniqueId from '../../utils/useUniqueId';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { LocationInstanceInfo_locationInstance as LocationInstance } from './__generated__/LocationInstanceInfo_locationInstance.graphql';

interface Props {
  locationInstance: LocationInstance;
}

/**
 * Information about location instance info
 *
 * @param props - props for component rendering
 */
function LocationInstanceInfo(props: Props): React.ReactElement {
  const id = useUniqueId('location-instance-info');

  return (
    <div>
      <Form.Group>
        <Form.Label htmlFor={id`name`}>Name</Form.Label>
        <Form.Control
          type="text"
          id={id`name`}
          disabled={true}
          value={props.locationInstance.name || ''}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor={id`description`}>Description</Form.Label>
        <Form.Control
          as='textarea'
          rows={20}
          id={id`description`}
          disabled={true}
          value={props.locationInstance.description || ''}
        />
      </Form.Group>
    </div>
  );
}

export default createFragmentContainer(
  LocationInstanceInfo,
  {
    locationInstance: graphql`
      fragment LocationInstanceInfo_locationInstance on LocationInstance {
        id
        name
        description
        constructionDate
        demolitionDate
        startDate
        endDate
      }
    `,
  }
);

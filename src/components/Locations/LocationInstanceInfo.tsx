import Form from 'react-bootstrap/Form';
import React from 'react';
import { Location } from '../../types/entities';
import useUniqueId from '../../utils/useUniqueId';

interface Props {
  locationInstance: Location['instances'][0];
}

/**
 * Information about location instance info
 *
 * @param props - props for component rendering
 */
export default function LocationInstanceInfo(props: Props): React.ReactElement {
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

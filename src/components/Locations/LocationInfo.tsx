import React, { useEffect, useState } from 'react';
import { commitMutation, createFragmentContainer, Disposable } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { DefaultInfoComponentProps } from '../../types/entities';
import { LocationInfo_location } from './__generated__/LocationInfo_location.graphql';
import Form from 'react-bootstrap/Form';
import environment from '../../relay-env';
import { LocationInfoUpdateMutation, UpdateLocationInput } from './__generated__/LocationInfoUpdateMutation.graphql';
import LocationInstancesTabs from './LocationInstancesList';

/**
 * Props for LocationInfo rendering
 */
interface LocationInfoProps extends DefaultInfoComponentProps<UpdateLocationInput>{
  /**
   * Data to display
   */
  location: LocationInfo_location;
}

/**
 * Displays information about location
 *
 * @param props - props for component rendering
 */
function LocationInfo(props: LocationInfoProps): React.ReactElement {
  const onChange = props.onChange || ((e: UpdateLocationInput): void => { /* do nothing */ });

  const [location, setLocation] = useState(props.location);
  const [input, setInput] = useState<UpdateLocationInput | null>(null);

  useEffect(() => {
    if (input) {
      onChange(input);
    }
  }, [ input ]);

  useEffect(() => {
    setInput({
      coordinateX: location.coordinateX,
      coordinateY: location.coordinateY,
      instances: [],
    });
    // eslint-disable-next-line
  }, [ location ])

  return (
    <div>
      <Form.Control
        onChange={(e) => {
          setLocation({
            ...location,
            coordinateX: +e.target.value,
          });
        }}
        type='text'
        value={location.coordinateX || ''}
      />
      <Form.Control readOnly type='text' value={location.coordinateY || ''}/>
      <LocationInstancesTabs
        data={props.location}
        onChange={(v) => {
          // setLocation({
          //   ...location,
          //   instances: v,
          // });
        }}
      />
    </div>
  );
}

export default createFragmentContainer(
  LocationInfo,
  {
    location: graphql`
        fragment LocationInfo_location on Location {
          id
          coordinateX
          coordinateY
          ...LocationInstancesList_data
        }
    `,
  }
);

export function updateInfo(input: UpdateLocationInput): Disposable {
  return commitMutation<LocationInfoUpdateMutation>(environment, {
    mutation: graphql`
      mutation LocationInfoUpdateMutation($input: UpdateLocationInput!) {
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

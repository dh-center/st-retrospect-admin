import React, { useEffect, useState } from 'react';
import { createFragmentContainer, Disposable } from 'react-relay';
import commitMutation from 'relay-commit-mutation-promise';
import graphql from 'babel-plugin-relay/macro';
import { DefaultInfoComponentProps } from '../../types/entities';
import { LocationInfo_location } from './__generated__/LocationInfo_location.graphql';
import environment from '../../relay-env';
import {
  LocationInfoUpdateMutation,
  LocationInfoUpdateMutationResponse,
  UpdateLocationInput
} from './__generated__/LocationInfoUpdateMutation.graphql';
import LocationInstancesTabs from './LocationInstancesList';
import Input from '../utils/Input';
import {
  LocationInfoDeleteMutation,
  LocationInfoDeleteMutationResponse
} from './__generated__/LocationInfoDeleteMutation.graphql';

/**
 * Props for LocationInfo rendering
 */
interface LocationInfoProps extends DefaultInfoComponentProps<UpdateLocationInput> {
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
  const onChange = props.onChange || ((e: UpdateLocationInput): void => { /* do nothing */
  });

  const [location, setLocation] = useState(props.location);
  const [input, setInput] = useState<UpdateLocationInput | null>(null);

  useEffect(() => {
    if (input) {
      onChange(input);
    }
  }, [ input ]);

  useEffect(() => {
    setInput({
      id: location.id,
      coordinateX: location.coordinateX,
      coordinateY: location.coordinateY,
      instances: location.instances.map(ins => ins.id),
    });
    // eslint-disable-next-line
  }, [location])

  return (
    <div>
      <Input
        disabled={props.viewOnly}
        label='coordinateX'
        onChange={(value) => {
          setLocation({
            ...location,
            coordinateX: value,
          });
        }}
        type='text'
        value={location.coordinateX || 0}
      />
      <Input
        disabled={props.viewOnly}
        label='coordinateY'
        onChange={(value) => {
          setLocation({
            ...location,
            coordinateY: value,
          });
        }}
        type='text'
        value={location.coordinateY || 0}
      />
      <LocationInstancesTabs
        data={props.location}
        viewOnly={props.viewOnly}
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
        instances {
          id
        }
        ...LocationInstancesList_data
      }
    `,
  }
);

export function updateInfo(input: UpdateLocationInput): Promise<LocationInfoUpdateMutationResponse> {
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

/**
 * Removes location by its id
 *
 * @param id - location id to remove
 */
export function remove(id: string): Promise<LocationInfoDeleteMutationResponse> {
  return commitMutation<LocationInfoDeleteMutation>(environment, {
    mutation: graphql`
     mutation LocationInfoDeleteMutation($id: ObjectId!) {
       location {
         delete(id: $id) {
           recordId
         }
       }
     }
    `,
    variables: { id },
  });
}

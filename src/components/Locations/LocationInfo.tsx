import React, { useEffect, useState } from 'react';
import { createFragmentContainer } from 'react-relay';
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
import {
  LocationInfoDeleteMutation,
  LocationInfoDeleteMutationResponse
} from './__generated__/LocationInfoDeleteMutation.graphql';
import { LabeledLocationMap } from '../LocationMap';
import styles from './LocationInfo.module.css';
import LabeledText from '../utils/LabeledText';

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
  const onChange: (e: UpdateLocationInput) => void = props.onChange || (() => { /* do nothing */ });

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
      latitude: location.latitude,
      longitude: location.longitude,
      instances: location.instances.map(ins => ins.id),
    });
    // eslint-disable-next-line
  }, [location])

  return (
    <div>
      <div className={styles.positionRow}>
        <div className={styles.coordinatesColumn}>
          <LabeledText
            content={location.latitude}
            label='Latitude'
          />
          <LabeledText
            content={location.longitude}
            label='Longitude'
          />
        </div>
        <div className={styles.mapWrapper}>
          <LabeledLocationMap
            label='Location on map'
            lngLat={location.longitude && location.latitude ? [location.longitude, location.latitude] : undefined}
            onChange={lngLan => {
              console.log({
                longitude: lngLan.lng,
                latitude: lngLan.lat,
              });
              setLocation({
                ...location,
                longitude: lngLan.lng,
                latitude: lngLan.lat,
              });
            }}
            viewOnly={props.viewOnly}
          />
        </div>
      </div>
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
        latitude
        longitude
        instances {
          id
        }
        ...LocationInstancesList_data
      }
    `,
  }
);

/**
 * Updates information about location
 *
 * @param input - data for updating
 */
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
     mutation LocationInfoDeleteMutation($id: GlobalId!) {
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

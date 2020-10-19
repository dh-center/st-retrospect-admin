import React from 'react';
import { createFragmentContainer } from 'react-relay';
import commitMutation from 'relay-commit-mutation-promise';
import graphql from 'babel-plugin-relay/macro';
import { LocationInfo_location } from './__generated__/LocationInfo_location.graphql';
import environment from '../../relay-env';
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
interface LocationInfoProps {
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
function LocationInfo({ location }: LocationInfoProps): React.ReactElement {
  const [ firstAddress ] = (location.addresses || []);

  return (
    <div>
      <div className={styles.positionRow}>
        <div className={styles.coordinatesColumn}>
          <h3>{firstAddress.address}</h3>
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
            viewOnly
          />
        </div>
      </div>
      <LocationInstancesTabs
        data={location}
        viewOnly
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
        addresses {
          address
        }
        instances {
          id
        }
        ...LocationInstancesList_data
      }
    `,
  }
);

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

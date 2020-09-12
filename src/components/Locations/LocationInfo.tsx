import React from 'react';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import LocationInstancesTabs from './LocationInstancesTabs';
import { DefaultInfoComponentProps } from '../../types/entities';
import { UpdatePersonInput } from '../Persons/__generated__/PersonInfoUpdateMutation.graphql';
import { LocationInfo_location } from './__generated__/LocationInfo_location.graphql';

/**
 * Props for LocationInfo rendering
 */
interface LocationInfoProps extends DefaultInfoComponentProps<UpdatePersonInput>{
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
  return (
    <div>
      <LocationInstancesTabs data={props.location}/>
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
          ...LocationInstancesTabs_data
        }
    `,
  }
);

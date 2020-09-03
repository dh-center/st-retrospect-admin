import React from 'react';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { LocationInfo_data as LocationInfoData } from './__generated__/LocationInfo_data.graphql';
import LocationInstancesTabs from './LocationInstancesTabs';

/**
 * Props for LocationInfo rendering
 */
interface LocationInfoProps {
  /**
   * Data to display
   */
  data: LocationInfoData;
}

/**
 * Displays information about location
 *
 * @param props - props for component rendering
 */
function LocationInfo(props: LocationInfoProps): React.ReactElement {
  return (
    <div>
      <LocationInstancesTabs data={props.data}/>
    </div>
  );
}

export default createFragmentContainer(
  LocationInfo,
  {
    data: graphql`
        fragment LocationInfo_data on Location {
          id
          coordinateX
          coordinateY
          ...LocationInstancesTabs_data
        }
    `,
  }
);

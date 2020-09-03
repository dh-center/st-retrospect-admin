import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import Tab from 'react-bootstrap/Tab';
import LocationInstanceInfo from './LocationInstanceInfo';
import Tabs from 'react-bootstrap/Tabs';
import React from 'react';
import { LocationInstancesTabs_data as LocationInstancesTabsData } from './__generated__/LocationInstancesTabs_data.graphql';

/**
 * Props for LocationInstancesTabs rendering
 */
interface Props {
  /**
   * Data obout location instances
   */
  data: LocationInstancesTabsData;
}

/**
 * @param props -
 */
function LocationInstancesTabs(props: Props): React.ReactElement {
  return (
    <div>
      <Tabs>
        {props.data.instances.map(instance => (
          <Tab eventKey='home' key={instance.id} title={instance.name}>
            <LocationInstanceInfo locationInstance={instance}/>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}

export default createFragmentContainer(
  LocationInstancesTabs,
  {
    data: graphql`
        fragment LocationInstancesTabs_data on Location {
          instances {
            id
            name
            ...LocationInstanceInfo_locationInstance
          }
        }
    `,
  }
);

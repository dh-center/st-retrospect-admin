import React from 'react';
import { EntityInfoComponentProps, Location, OmitId } from '../../types/entities';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import LocationInstanceInfo from './LocationInstanceInfo';

/**
 * Displays information about location
 *
 * @param props - props for component rendering
 */
export default function LocationInfo(props: EntityInfoComponentProps<OmitId<Location>>): React.ReactElement {
  return (
    <div>
      <Tabs>
        {props.entity.instances.map(instance => (
          <Tab eventKey="home" title={instance.name} key={instance.id}>
            <LocationInstanceInfo locationInstance={instance}/>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}

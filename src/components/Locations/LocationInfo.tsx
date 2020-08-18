import React from 'react';
import { EntityInfoComponentProps, Location, OmitId } from '../../types/entities';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import LocationInstanceInfo from './LocationInstanceInfo';

/**
 * Generates empty quest
 */
export function generateLocation(): OmitId<Location> {
  return {
    instances: [],
  };
}

/**
 * Component of quest fields
 *
 * @param props - props of component
 */
export default function LocationInfo(props: EntityInfoComponentProps<OmitId<Location>>): React.ReactElement {
  const onChange = props.onChange || ((e: OmitId<Location>): void => { /* do nothing */ });

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

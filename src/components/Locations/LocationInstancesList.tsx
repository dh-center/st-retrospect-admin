import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import React, { useState } from 'react';
import { LocationInstancesList_data as LocationInstancesListData } from './__generated__/LocationInstancesList_data.graphql';
import LocationInstanceInfoDialog from './LocationInstanceInfoDialog';
import LocationInstanceListItem from './LocationInstanceListItem';

/**
 * Props for LocationInstancesList rendering
 */
interface Props {
  /**
   * Data obout location instances
   */
  data: LocationInstancesListData;

  /**
   * On change handler
   */
  onChange(ids: string[]): void;
}

/**
 * List with location instances of location
 *
 * @param props - props for rendering
 */
function LocationInstancesList(props: Props): React.ReactElement {
  const [currentInstance, setCurrentInstance] = useState<LocationInstancesListData['instances'][0] | null>(null);
  const [isDialogShowed, setIsDialogShowed] = useState(false);

  return (
    <div>
      {props.data.instances.map(instance =>
        <LocationInstanceListItem
          instance={instance}
          key={instance.id}
          onClick={() => {
            setCurrentInstance(instance);
            setIsDialogShowed(true);
          }}
        />
      )}
      <button>
        Add location instance
      </button>
      <LocationInstanceInfoDialog
        isShown={isDialogShowed}
        locationInstance={currentInstance}
        onHide={() => setIsDialogShowed(false)}
      />
    </div>
  );
}

export default createFragmentContainer(
  LocationInstancesList,
  {
    data: graphql`
      fragment LocationInstancesList_data on Location {
        instances {
          id
          name
          ...LocationInstanceListItem_instance
          ...LocationInstanceInfoDialog_locationInstance
        }
      }
    `,
  }
);

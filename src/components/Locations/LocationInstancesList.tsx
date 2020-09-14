import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import React, { useState } from 'react';
import { LocationInstancesList_data as LocationInstancesListData } from './__generated__/LocationInstancesList_data.graphql';
import LocationInstanceInfoDialog from './LocationInstanceInfoDialog';
import LocationInstanceListItem from './LocationInstanceListItem';
import { UpdateLocationInstanceInput } from './__generated__/LocationInstanceInfoDialogUpdateMutation.graphql';
import { CreateLocationInstanceInput } from './__generated__/LocationInstanceInfoDialogCreateMutation.graphql';
import Button from 'react-bootstrap/cjs/Button';

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

  viewOnly?: boolean;
}

/**
 * List with location instances of location
 *
 * @param props - props for rendering
 */
function LocationInstancesList(props: Props): React.ReactElement {
  const [currentInstanceId, setCurrentInstanceId] = useState<string | undefined>(props.data.instances[0] && props.data.instances[0].id);
  const [isDialogShowed, setIsDialogShowed] = useState(false);
  // const [input, setInput] = useState<CreateLocationInstanceInput | UpdateLocationInstanceInput | null>(null);

  const currentInstance = props.data.instances.find(inst => inst.id === currentInstanceId);

  return (
    <div>
      {props.data.instances.map(instance =>
        <LocationInstanceListItem
          instance={instance}
          key={instance.id}
          onClick={() => {
            setCurrentInstanceId(instance.id);
            setIsDialogShowed(true);
          }}
        />
      )}
      {!props.viewOnly &&
        <Button
          className='m-1'
          onClick={() => {
            setIsDialogShowed(true);
            setCurrentInstanceId(undefined);
          }}
          size='sm'
          variant={"outline-warning"}
          type='button'
        >
          Add location instance
        </Button>
      }
      <LocationInstanceInfoDialog
        isShown={isDialogShowed}
        locationInstance={currentInstance || null}
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

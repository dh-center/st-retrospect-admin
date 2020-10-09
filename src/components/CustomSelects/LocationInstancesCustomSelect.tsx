import React, { ReactElement, ReactNode, useState } from 'react';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';
import CustomSelect from '../utils/CustomSelect';
import { QueryRenderer } from 'react-relay';
import { LocationInstancesCustomSelect_locationInstancesQuery } from './__generated__/LocationInstancesCustomSelect_locationInstancesQuery.graphql';

/**
 * Interface of props for LocationInstancesCustomSelect component
 */
interface LocationInstancesCustomSelectProps {
  /**
   * onChange event handler
   *
   * @param selected - selected value id
   */
  onChange: (selected: string) => void;

  /**
   * Default location instance id for displaying
   */
  value?: string;
}

/**
 * Displays custom select for location instances
 *
 * @param componentProps - props with onChange event handler
 */
export default function LocationInstancesCustomSelect(componentProps: LocationInstancesCustomSelectProps): ReactElement {
  const [selectedLocationInstance, setSelectedLocationInstance] = useState<string | undefined>(componentProps.value);
  const onChange = componentProps.onChange;

  return (
    <QueryRenderer<LocationInstancesCustomSelect_locationInstancesQuery>
      environment={environment}
      query={graphql`
        query LocationInstancesCustomSelect_locationInstancesQuery {
          locationInstances {
            value: id
            name
          }
        }
      `}
      render={({ error, props }): ReactNode => {
        if (error) {
          return <div>Error!</div>;
        }

        if (!props) {
          return <div>Loading locations...</div>;
        }

        const locationsWithNames = props.locationInstances.filter((location) => {
          if (location.name !== null) {
            return location;
          }
        }) as {readonly value: string; readonly name: string}[];

        return <CustomSelect
          onChange={(selected) => {
            setSelectedLocationInstance(selected);
            onChange(selected);
          }}
          options={locationsWithNames}
          placeholder='Select a location instance...'
          value={selectedLocationInstance}
        />;
      }}
      variables={{}}
    />
  );
}

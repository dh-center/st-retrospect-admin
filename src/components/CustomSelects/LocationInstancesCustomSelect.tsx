import React, { ReactElement, ReactNode } from 'react';
import environment from '../../appEnv';
import graphql from 'babel-plugin-relay/macro';
import CustomSelect from '../utils/CustomSelect';
import { QueryRenderer } from 'react-relay';
import { LocationInstancesCustomSelect_locationInstancesQuery } from './__generated__/LocationInstancesCustomSelect_locationInstancesQuery.graphql';
import withLabel from '../utils/LabeledComponent';
import LoadingPlaceholder from '../utils/LoadingPlaceholder';
import styles from './CustomSelects.module.css';
import { CustomSelectProps } from './CustomSelectProps';

/**
 * Displays custom select for location instances
 *
 * @param componentProps - props with onChange event handler
 */
export default function LocationInstancesCustomSelect(componentProps: CustomSelectProps): ReactElement {
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
          return (
            <div className={styles.loadingContainer}>
              <LoadingPlaceholder
                alt='Loading locations...'
                isSmall
              />
            </div>
          );
        }

        const locationsWithNames = props.locationInstances.filter((location) => {
          return location && location.name;
        }) as {readonly value: string; readonly name: string}[];

        return <CustomSelect
          disabled={componentProps.disabled}
          onChange={(selected) => {
            onChange(selected);
          }}
          options={locationsWithNames}
          placeholder='Select a location instance...'
          value={componentProps.value}
        />;
      }}
      variables={{}}
    />
  );
}

/**
 * Returns LocationInstancesCustomSelect component with label
 */
export const LabeledLocationInstancesCustomSelect = withLabel(LocationInstancesCustomSelect);

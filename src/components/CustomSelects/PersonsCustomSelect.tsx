import React, { ReactElement, ReactNode } from 'react';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';
import personsFullName from '../../utils/personsFullname';
import CustomSelect from '../utils/CustomSelect';
import { QueryRenderer } from 'react-relay';
import { PersonsCustomSelect_personsQuery } from './__generated__/PersonsCustomSelect_personsQuery.graphql';
import withLabel from '../utils/LabeledComponent';
import styles from './CustomSelects.module.css';
import LoadingPlaceholder from '../utils/LoadingPlaceholder';
import { CustomSelectProps } from './CustomSelectProps';

/**
 * Displays custom select for persons
 *
 * @param componentProps - props with onChange event handler
 */
export default function PersonsCustomSelect(componentProps: CustomSelectProps): ReactElement {
  const onChange = componentProps.onChange;

  return (
    <QueryRenderer<PersonsCustomSelect_personsQuery>
      environment={environment}
      query={graphql`
        query PersonsCustomSelect_personsQuery {
          persons {
            edges {
              node {
                value: id
                lastName
                firstName
                patronymic
              }
            }
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
                alt='Loading persons...'
                isSmall
              />
            </div>
          );
        }

        /**
         * Get list of persons from response
         */
        const edges = props.persons.edges;
        const persons = edges.map((edge) => edge.node);
        const personsWithFullNames = persons.map((person) => {
          return {
            value: person.value,
            name: personsFullName(person),
          };
        });

        return <CustomSelect
          disabled={componentProps.disabled}
          onChange={(selected) => {
            onChange(selected);
          }}
          options={personsWithFullNames}
          placeholder='Select a person...'
          value={componentProps.value}
        />;
      }}
      variables={{}}
    />
  );
}

/**
 * Returns PersonsCustomSelect component with label
 */
export const LabeledPersonsCustomSelect = withLabel(PersonsCustomSelect);

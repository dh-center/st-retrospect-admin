import React, { ReactElement, ReactNode } from 'react';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';
import personsFullName from '../../utils/personsFullname';
import CustomSelect from '../utils/CustomSelect';
import { QueryRenderer } from 'react-relay';
import { PersonsCustomSelect_personsQuery } from './__generated__/PersonsCustomSelect_personsQuery.graphql';

/**
 * Interface of props for PersonsCustomSelect component
 */
interface PersonsCustomSelectProps {
  /**
   * onChange event handler
   *
   * @param selected - selected value id
   */
  onChange: (selected: string) => void;

  /**
   * Default person id for displaying
   */
  value?: string;
}

/**
 * Displays custom select for persons
 *
 * @param componentProps - props with onChange event handler
 */
export default function PersonsCustomSelect(componentProps: PersonsCustomSelectProps): ReactElement {
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
          return <div>Loading persons...</div>;
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

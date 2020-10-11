import React, { ReactElement, ReactNode } from 'react';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';
import CustomSelect from '../utils/CustomSelect';
import { QueryRenderer } from 'react-relay';
import { RelationTypesCustomSelect_relationTypesQuery } from './__generated__/RelationTypesCustomSelect_relationTypesQuery.graphql';
import withLabel from '../utils/LabeledComponent';
import styles from "./CustomSelects.module.css";
import LoadingPlaceholder from "../utils/LoadingPlaceholder";

/**
 * Interface of props for RelationTypesCustomSelect component
 */
interface RelationTypesCustomSelectProps {
  /**
   * onChange event handler
   *
   * @param selected - selected value id
   */
  onChange: (selected: string) => void;

  /**
   * Default relation type id for displaying
   */
  value?: string;
}

/**
 * Displays custom select for relation types
 *
 * @param componentProps - props with onChange event handler
 */
export default function RelationTypesCustomSelect(componentProps: RelationTypesCustomSelectProps): ReactElement {
  const onChange = componentProps.onChange;

  return (
    <QueryRenderer<RelationTypesCustomSelect_relationTypesQuery>
      environment={environment}
      query={graphql`
        query RelationTypesCustomSelect_relationTypesQuery {
          relationTypes {
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
                alt='Loading relation types...'
                isSmall
              />
            </div>
          );
        }

        const relationTypesWithNames = props.relationTypes.filter((relationType) => {
          if (relationType.name !== null) {
            return relationType;
          }
        }) as {readonly value: string; readonly name: string}[];

        return <CustomSelect
          onChange={(selected) => {
            onChange(selected);
          }}
          options={relationTypesWithNames}
          placeholder='Select a relation type...'
          value={componentProps.value}
        />;
      }}
      variables={{}}
    />
  );
}

/**
 * Returns RelationTypesCustomSelect with label
 */
export const LabeledRelationTypesCustomSelect = withLabel(RelationTypesCustomSelect);

import { ReactElement, ReactNode } from 'react';
import environment from '../../appEnv';
import graphql from 'babel-plugin-relay/macro';
import CustomSelect from '../utils/CustomSelect';
import { QueryRenderer } from 'react-relay';
import { RelationTypesCustomSelect_relationTypesQuery } from './__generated__/RelationTypesCustomSelect_relationTypesQuery.graphql';
import withLabel from '../utils/LabeledComponent';
import styles from './CustomSelects.module.css';
import LoadingPlaceholder from '../utils/LoadingPlaceholder';
import { CustomSelectProps } from './CustomSelectProps';

/**
 * Displays custom select for relation types
 *
 * @param componentProps - props with onChange event handler
 */
export default function RelationTypesCustomSelect(componentProps: CustomSelectProps): ReactElement {
  const onChange = componentProps.onChange;

  return (
    <QueryRenderer<RelationTypesCustomSelect_relationTypesQuery>
      environment={environment}
      query={graphql`
        query RelationTypesCustomSelect_relationTypesQuery {
          relationTypes {
            edges {
              node {
                value: id
                name
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
                alt='Loading relation types...'
                isSmall
              />
            </div>
          );
        }

        const edges = props.relationTypes.edges;
        const relationTypes = edges.map((edge) => edge.node);
        const relationTypesWithNames = relationTypes.filter((relationType) => {
          return relationType && relationType.name;
        }) as {readonly value: string; readonly name: string}[];

        return <CustomSelect
          disabled={componentProps.disabled}
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

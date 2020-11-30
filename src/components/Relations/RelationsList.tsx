import { createPaginationContainer, RelayPaginationProp } from 'react-relay';
import EntitiesList, { EntitiesListProps } from '../EntitiesList';
import graphql from 'babel-plugin-relay/macro';
import { RelationsList_entityConnection } from './__generated__/RelationsList_entityConnection.graphql';
import React from 'react';
import RelationsRow from './RelationsRow';

/**
 * Props for CustomRelationsList component
 */
interface RelationsListProps {
  /**
   * Entity connection
   */
  entityConnection: RelationsList_entityConnection;

  /**
   * Entity name for creating links
   */
  entityName: string;

  /**
   * Prop for accessing relay functionality
   */
  relay: RelayPaginationProp;
}

function CustomRelationsList(props: RelationsListProps): React.ReactElement {
  return (
    <EntitiesList<RelationsList_entityConnection>
      entityConnection={props.entityConnection}
      entityName={props.entityName}
      header={(
        <tr>
          <th>№</th>
          <th>person</th>
          <th>relationType</th>
          <th>locationInstance</th>
        </tr>
      )}
      relay={props.relay}
      row={RelationsRow}
    />
  );
}

/**
 * Creates relations list with pagination
 */
const RelationsList = createPaginationContainer<EntitiesListProps<RelationsList_entityConnection>>(
  CustomRelationsList,
  {
    entityConnection: graphql`
      fragment RelationsList_entityConnection on Query @argumentDefinitions(
        first: {type: "Int", defaultValue: 10}
        after: {type: "Cursor"}
      ) {
        entities: relations(
          first: $first
          after: $after
        ) @connection(key: "RelationsPage_entities") {
          totalCount
          edges {
            node {
              id
              person {
                lastName
                firstName
                patronymic
              }
              locationInstance {
                name
              }
              relationType {
                name
              }
            }
          }
        }
      }
    `,
  },
  {
    direction: 'forward',
    query: graphql`
      query RelationsListForwardQuery(
        $first: Int
        $after: Cursor
      ) {
        ...RelationsList_entityConnection @arguments(first: $first, after: $after)
      }
    `,
    getVariables(props, paginationInfo) {
      return {
        first: paginationInfo.count,
        after: paginationInfo.cursor,
      };
    },
  }
);

export default RelationsList;

import { createPaginationContainer } from 'react-relay';
import EntitiesList, { EntitiesListProps } from '../EntitiesList';
import graphql from 'babel-plugin-relay/macro';
import { RelationTypesList_entityConnection } from './__generated__/RelationTypesList_entityConnection.graphql';

/**
 * Creates relation types list with pagination
 */
const RelationTypesList = createPaginationContainer<EntitiesListProps<RelationTypesList_entityConnection>>(
  EntitiesList,
  {
    entityConnection: graphql`
      fragment RelationTypesList_entityConnection on Query @argumentDefinitions (
        first: {type: "Int", defaultValue: 10}
        after: {type: "Cursor"}
      ) {
        entities: relationTypes(
          first: $first
          after: $after
        ) @connection(key: "RelationTypesPage_entities") {
          totalCount
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `,
  },
  {
    direction: 'forward',
    query: graphql`
      query RelationTypesListForwardQuery(
        $first: Int,
        $after: Cursor,
      ) {
        ...RelationTypesList_entityConnection @arguments(first: $first, after: $after)
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

export default RelationTypesList;

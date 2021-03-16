import { createPaginationContainer } from 'react-relay';
import EntitiesList, { EntitiesListProps } from '../EntitiesList';
import graphql from 'babel-plugin-relay/macro';
import { TagsList_entityConnection } from './__generated__/TagsList_entityConnection.graphql';

/**
 * Creates tags list with pagination
 */
const TagsList = createPaginationContainer<EntitiesListProps<TagsList_entityConnection>>(
  EntitiesList,
  {
    entityConnection: graphql`
      fragment TagsList_entityConnection on Query @argumentDefinitions (
        first: {type: "Int", defaultValue: 10}
        after: {type: "Cursor"}
      ) {
        entities: tags(
          first: $first
          after: $after
        ) @connection(key: "TagsPage_entities") {
          totalCount
          edges {
            node {
              id
              value
            }
          }
        }
      }
    `,
  },
  {
    direction: 'forward',
    query: graphql`
      query TagsListForwardQuery(
        $first: Int,
        $after: Cursor,
      ) {
        ...TagsList_entityConnection @arguments(first: $first, after: $after)
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

export default TagsList;

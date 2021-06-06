import { createPaginationContainer } from 'react-relay';
import EntitiesList, { EntitiesListProps } from '../EntitiesList';
import { QuestsList_entityConnection as QuestsPageEntityConnection } from './__generated__/QuestsList_entityConnection.graphql';
import graphql from 'babel-plugin-relay/macro';

const QuestsList = createPaginationContainer<EntitiesListProps<QuestsPageEntityConnection>>(
  EntitiesList,
  {
    entityConnection: graphql`
      fragment QuestsList_entityConnection on Query @argumentDefinitions (
        first: {type: "Int", defaultValue: 10}
        after: {type: "Cursor"}
      ) {
        entities: quests(
          first: $first
          after: $after
        ) @connection(key: "QuestsPage_entities") {
          totalCount
          edges {
            node {
              id
              name
              description
              tags {
                id
                value
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
      query QuestsListForwardQuery(
        $first: Int,
        $after: Cursor
      ) {
        ...QuestsList_entityConnection @arguments(first: $first, after: $after)
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

export default QuestsList;

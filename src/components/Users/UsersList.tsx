import { createPaginationContainer } from 'react-relay';
import EntitiesList, { EntitiesListProps } from '../EntitiesList';
import graphql from 'babel-plugin-relay/macro';
import { UsersList_entityConnection } from './__generated__/UsersList_entityConnection.graphql';

const UsersList = createPaginationContainer<EntitiesListProps<UsersList_entityConnection>>(
  EntitiesList,
  {
    entityConnection: graphql`
      fragment UsersList_entityConnection on Query @argumentDefinitions (
        first: {type: "Int", defaultValue: 10}
        after: {type: "Cursor"}
      ) {
        entities: users(
          first: $first
          after: $after
        ) @connection(key: "UsersPage_entities") {
          totalCount
          edges {
            node {
              id
              username
              firstName
              lastName
              exp
              level
              permissions
            }
          }
        }
      }
    `,
  },
  {
    direction: 'forward',
    query: graphql`
      query UsersListForwardQuery(
        $first: Int,
        $after: Cursor,
      ) {
        ...UsersList_entityConnection @arguments(first: $first, after: $after)
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

export default UsersList;

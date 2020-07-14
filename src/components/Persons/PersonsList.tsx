import { createPaginationContainer } from 'react-relay';
import EntitiesList, { EntitiesListProps } from '../Entities/EntitiesList';
import { PersonsList_entityConnection as PersonsPageEntityConnection } from './__generated__/PersonsList_entityConnection.graphql';
import graphql from 'babel-plugin-relay/macro';

const PersonsList = createPaginationContainer<EntitiesListProps<PersonsPageEntityConnection>>(
  EntitiesList,
  {
    entityConnection: graphql`
      fragment PersonsList_entityConnection on Query @argumentDefinitions (
        first: {type: "Int", defaultValue: 10}
        after: {type: "Cursor"}
      ) {
        entities: persons(
          first: $first
          after: $after
        ) @connection(key: "PersonsPage_entities") {
          totalCount
          edges {
            node {
              id
              lastName
              firstName
              patronymic
              pseudonym
              birthDate
              deathDate
              profession
            }
          }
        }
      }
    `,
  },
  {
    direction: 'forward',
    query: graphql`
      query PersonsListForwardQuery(
        $first: Int,
        $after: Cursor,
      ) {
        ...PersonsList_entityConnection @arguments(first: $first, after: $after)
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

export default PersonsList;

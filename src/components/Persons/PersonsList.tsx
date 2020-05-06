import React, { ReactElement } from 'react';
import { createPaginationContainer, RelayPaginationProp } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { PersonsList_personsConnection as PersonsConnection } from './__generated__/PersonsList_personsConnection.graphql';

/**
 * Props for PersonsList component
 */
interface Props {
  /**
   * Persons connection
   */
  personsConnection: PersonsConnection;

  /**
   * Prop for accessing relay functionality
   */
  relay: RelayPaginationProp;
}

/**
 * Component for displaying persons list
 *
 * @param props - react component props
 */
function PersonsList(props: Props): ReactElement<Props> {
  return <table>
    <tbody>
      {props.personsConnection.persons.edges.map((person) => {
        return <tr key={person.node.id}>
          <td>{person.node.id}</td>
          <td>{person.node.firstName}</td>
          <td>{person.node.lastName}</td>
          <td>{person.node.patronymic}</td>
        </tr>;
      })}
    </tbody>
  </table>;
}

export default createPaginationContainer(PersonsList,
  {
    personsConnection: graphql`
      fragment PersonsList_personsConnection on Query @argumentDefinitions (
        first: {type: "Int", defaultValue: 10}
        after: {type: "Cursor"}
      ) {
        persons(
          first: $first
          after: $after
        ) @connection(key: "PersonsList_persons") {
          edges {
            node {
              id
              firstName
              lastName
              patronymic
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
        ...PersonsList_personsConnection @arguments(first: $first, after: $after)
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

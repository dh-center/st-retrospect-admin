import React, { ReactNode } from 'react';
import { createPaginationContainer, RelayPaginationProp } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { PersonsList_persons as Persons } from './__generated__/PersonsList_persons.graphql';

interface Props {
  persons: Persons;
  relay: RelayPaginationProp;
}
/**
 * Component for displaying persons list
 *
 * @param props - react component props
 */
class PersonsList extends React.Component<Props> {
  /**
   * freferf
   */
  public render(): ReactNode {
    return <table>
      <tbody>
        {this.props.persons.persons.edges.map((person) => {
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
}

export default createPaginationContainer(PersonsList,
  {
    persons: graphql`
      fragment PersonsList_persons on Query @argumentDefinitions (
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
        ...PersonsList_persons @arguments(first: $first, after: $after)
      }
    `,
    getVariables(props, paginationInfo, fragmentVariables) {
      return {
        first: paginationInfo.count,
        after: paginationInfo.cursor,
      };
    },
  }
);

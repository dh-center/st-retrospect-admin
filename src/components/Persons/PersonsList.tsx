import React, { ReactNode } from 'react';
import { createPaginationContainer, createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

/**
 * Component for displaying persons list
 *
 * @param props - react component props
 */
class PersonsList extends React.Component<any, any> {
  /**
   * freferf
   */
  public render(): ReactNode {
    console.log(this.props);

    return <table>
      {/* <tbody>*/}
      {/*  {this.props.persons.map((person: any) => {*/}
      {/*    return <tr key={person.id}>*/}
      {/*      <td>{person.id}</td>*/}
      {/*      <td>{person.firstName}</td>*/}
      {/*      <td>{person.lastName}</td>*/}
      {/*      <td>{person.patronymic}</td>*/}
      {/*    </tr>;*/}
      {/*  })}*/}
      {/* </tbody>*/}
    </table>;
  }
}

export default createFragmentContainer(PersonsList, {
  persons: graphql`
    query PersonsList_persons {
      persons {
        edges {
          node {
            id
            firstName
            lastName
          }
        }
      }
    }
  `,
});

// export default createPaginationContainer(PersonsList,
//   {
//     persons: graphql`
//       fragment PersonsList_persons on Query @argumentDefinitions (
//         first: {type: "Int", defaultValue: 10}
//         after: {type: "Cursor"}
//       ) {
//         persons(
//           first: $first
//           after: $after
//         ) @connection(key: "PersonsList_persons") {
//           edges {
//             node {
//               id
//               firstName
//               lastName
//             }
//           }
//         }
//       }
//     `,
//   },
//   {
//     direction: 'forward',
//     query: graphql`
//       query PersonsListForwardQuery(
//         $first: Int,
//         $after: Cursor,
//       ) {
//         ...PersonsList_persons @arguments(first: $first, after: $after)
//       }
//     `,
//     getVariables(props, paginationInfo, fragmentVariables) {
//       return {
//         first: paginationInfo.count,
//         after: paginationInfo.cursor,
//       };
//     },
//   }
// );

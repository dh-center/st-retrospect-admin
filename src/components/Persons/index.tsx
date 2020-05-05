import React, { ReactElement } from 'react';
import { QueryRenderer } from 'react-relay';
import { PersonsQuery, PersonsQueryResponse } from './__generated__/PersonsQuery.graphql';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';

/**
 * Functional component for persons view
 *
 * @returns {JSX.Element}
 */
export default function Persons(): ReactElement {
  return (
    <QueryRenderer<PersonsQuery>
      environment={environment}
      query={graphql`
          query PersonsQuery {
            persons {
              id
              firstName
              lastName
              patronymic
            }
          }
        `}
      variables={{}}
      render={({ error, props }): React.ReactNode => {
        if (error) {
          return <div>Error!</div>;
        }
        if (!props) {
          return <div>Loading persons...</div>;
        }

        return <PersonsList persons={props.persons}/>;
      }}
    >

    </QueryRenderer>
  );
}

/**
 * Component for displaying persons list
 *
 * @param props - react component props
 */
function PersonsList(props: {
  persons: PersonsQueryResponse['persons'];
}): ReactElement {
  return <table>
    <tbody>
      {props.persons.map(person => {
        return <tr key={person.id}>
          <td>{person.id}</td>
          <td>{person.firstName}</td>
          <td>{person.lastName}</td>
          <td>{person.patronymic}</td>
        </tr>;
      })}
    </tbody>
  </table>;
}

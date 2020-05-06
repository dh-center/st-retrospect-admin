import React, { ReactElement } from 'react';
import { QueryRenderer } from 'react-relay';
import { PersonsQuery } from './__generated__/PersonsQuery.graphql';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';
import PersonsList from './PersonsList';

/**
 * Functional component for persons view
 */
export default function Persons(): ReactElement {
  return (
    <QueryRenderer<PersonsQuery>
      environment={environment}
      query={graphql`
          query PersonsQuery(
            $first: Int,
            $after: Cursor
            ) {
             ...PersonsList_persons @arguments(first: $first, after: $after)
          }
        `}
      variables={{
        first: 100,
        after: null,
      }}
      render={({ error, props }): React.ReactNode => {
        if (error) {
          return <div>Error!</div>;
        }
        if (!props) {
          return <div>Loading persons...</div>;
        }
        // console.log(props);

        return <PersonsList persons={props}/>;
      }}
    >

    </QueryRenderer>
  );
}

import React, { ReactElement } from 'react';
import { QueryRenderer } from 'react-relay';
import { PersonsPageQuery } from './__generated__/PersonsPageQuery.graphql';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';
import PersonsList from './PersonsList';

/**
 * Page for displaying persons
 */
export default function PersonsPage(): ReactElement {
  return (
    <QueryRenderer<PersonsPageQuery>
      environment={environment}
      query={graphql`
          query PersonsPageQuery(
            $first: Int,
            $after: Cursor
            ) {
             ...PersonsList_personsConnection @arguments(first: $first, after: $after)
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

        return <PersonsList personsConnection={props}/>;
      }}
    />
  );
}

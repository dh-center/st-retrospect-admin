import React, { ReactElement } from 'react';
import { QueryRenderer } from 'react-relay';
import { PersonsPageQuery } from './__generated__/PersonsPageQuery.graphql';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';
import { ENTITIES_PER_PAGE } from '../../constants';
import PersonsList from './PersonsList';

/**
 * Page for displaying persons
 */
export default function PersonsPage(): ReactElement {
  return (
    <QueryRenderer<PersonsPageQuery>
      environment={environment}
      query={graphql`
        query PersonsPageQuery (
          $first: Int,
          $after: Cursor
        ) {
          ...PersonsList_entityConnection @arguments(first: $first, after: $after)
        }
        `}
      variables={{
        first: ENTITIES_PER_PAGE,
        after: null,
      }}
      render={({ error, props }): React.ReactNode => {
        if (error) {
          return <div>Error!</div>;
        }
        if (!props) {
          return <div>Loading persons...</div>;
        }

        return <PersonsList entityName='persons' entityConnection={props}/>;
      }}
    />
  );
}

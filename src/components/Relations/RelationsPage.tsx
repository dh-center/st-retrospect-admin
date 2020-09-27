import React, { ReactElement, ReactNode } from 'react';
import { QueryRenderer } from 'react-relay';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';
import { ENTITIES_PER_PAGE } from '../../constants';
import RelationsList from './RelationsList';
import { RelationsPageQuery } from './__generated__/RelationsPageQuery.graphql';

/**
 * Displays relations list component
 */
export default function RelationsPage(): ReactElement {
  return (
    <QueryRenderer<RelationsPageQuery>
      environment={environment}
      query={graphql`
        query RelationsPageQuery(
          $first: Int
          $after: Cursor
        ) {
          ...RelationsList_entityConnection @arguments(first: $first, after: $after)
        }
      `}
      render={({ error, props }): ReactNode => {
        if (error) {
          return <div>Error!</div>;
        }

        if (!props) {
          return <div>Loading relations...</div>;
        }

        return <RelationsList entityConnection={props} entityName='relations'/>;
      }}
      variables={{
        first: ENTITIES_PER_PAGE,
        after: null,
      }}
    />
  );
}

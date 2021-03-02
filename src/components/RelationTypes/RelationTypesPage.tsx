import React, { ReactElement, ReactNode } from 'react';
import { QueryRenderer } from 'react-relay';
import environment from '../../appEnv';
import graphql from 'babel-plugin-relay/macro';
import LoadingPlaceholder from '../utils/LoadingPlaceholder';
import { ENTITIES_PER_PAGE } from '../../constants';
import RelationTypesList from './RelationTypesList';
import { RelationTypesPageQuery } from './__generated__/RelationTypesPageQuery.graphql';

/**
 * Displays relation types list component
 */
export default function RelationTypesPage(): ReactElement {
  return (
    <QueryRenderer<RelationTypesPageQuery>
      environment={environment}
      query={graphql`
        query RelationTypesPageQuery(
          $first: Int
          $after: Cursor
        ) {
          ...RelationTypesList_entityConnection @arguments(first: $first, after: $after)
        }
      `}
      render={({ error, props }): ReactNode => {
        if (error) {
          return <div>Error!</div>;
        }

        if (!props) {
          return <LoadingPlaceholder
            alt='Loading relation types...'
          />;
        }

        return <RelationTypesList entityConnection={props} entityName='relation-types'/>;
      }}
      variables={{
        first: ENTITIES_PER_PAGE,
        after: null,
      }}
    />
  );
}

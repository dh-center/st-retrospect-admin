import React, { ReactElement } from 'react';
import { QueryRenderer } from 'react-relay';
import { UsersPageQuery } from './__generated__/UsersPageQuery.graphql';
import environment from '../../appEnv';
import graphql from 'babel-plugin-relay/macro';
import { ENTITIES_PER_PAGE } from '../../constants';
import UsersList from './UsersList';
import LoadingPlaceholder from '../utils/LoadingPlaceholder';

/**
 * Page for displaying Users
 */
export default function UsersPage(): ReactElement {
  return (
    <QueryRenderer<UsersPageQuery>
      environment={environment}
      query={graphql`
        query UsersPageQuery (
          $first: Int,
          $after: Cursor
        ) {
          ...UsersList_entityConnection @arguments(first: $first, after: $after)
        }
        `}
      render={({ error, props }): React.ReactNode => {
        if (error) {
          return <div>Error!</div>;
        }
        if (!props) {
          return <LoadingPlaceholder
            alt='Loading users...'
          />;
        }

        return <UsersList entityConnection={props} entityName='Users'/>;
      }}
      variables={{
        first: ENTITIES_PER_PAGE,
        after: null,
      }}
    />
  );
}

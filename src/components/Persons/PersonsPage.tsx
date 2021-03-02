import React, { ReactElement } from 'react';
import { QueryRenderer } from 'react-relay';
import { PersonsPageQuery } from './__generated__/PersonsPageQuery.graphql';
import environment from '../../appEnv';
import graphql from 'babel-plugin-relay/macro';
import { ENTITIES_PER_PAGE } from '../../constants';
import PersonsList from './PersonsList';
import LoadingPlaceholder from '../utils/LoadingPlaceholder';

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
      render={({ error, props }): React.ReactNode => {
        if (error) {
          return <div>Error!</div>;
        }
        if (!props) {
          return <LoadingPlaceholder
            alt='Loading persons...'
          />;
        }

        return <PersonsList entityConnection={props} entityName='persons'/>;
      }}
      variables={{
        first: ENTITIES_PER_PAGE,
        after: null,
      }}
    />
  );
}

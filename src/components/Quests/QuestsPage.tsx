import React, { ReactElement } from 'react';
import { QueryRenderer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { QuestsPageQuery } from './__generated__/QuestsPageQuery.graphql';
import environment from '../../relay-env';
import { ENTITIES_PER_PAGE } from '../../constants';
import QuestsList from './QuestsList';
import LoadingPlaceholder from '../utils/LoadingPlaceholder';

/**
 * Functional component for quests view
 */
export default function QuestsPage(): ReactElement {
  return (
    <QueryRenderer<QuestsPageQuery>
      environment={environment}
      query={graphql`
        query QuestsPageQuery (
          $first: Int,
          $after: Cursor
        ) {
          ...QuestsList_entityConnection @arguments(first: $first, after: $after)
        }
            `}
      render={({ error, props }): React.ReactNode => {
        if (error) {
          return <div>Error!</div>;
        }
        if (!props) {
          return <LoadingPlaceholder
            alt='Loading quests...'
          />;
        }

        return <QuestsList entityConnection={props} entityName='quests' />;
      }}
      variables={{
        first: ENTITIES_PER_PAGE,
        after: null,
      }}
    />
  );
}

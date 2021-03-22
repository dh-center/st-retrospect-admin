import { ReactElement, ReactNode } from 'react';
import { QueryRenderer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../../appEnv';
import LoadingPlaceholder from '../utils/LoadingPlaceholder';
import { ENTITIES_PER_PAGE } from '../../constants';
import TagsList from './TagsList';
import { TagsPageQuery } from './__generated__/TagsPageQuery.graphql';

export default function TagsPage(): ReactElement {
  return (
    <QueryRenderer<TagsPageQuery>
      environment={environment}
      query={graphql`
        query TagsPageQuery(
          $first: Int
          $after: Cursor
        ) {
          ...TagsList_entityConnection @arguments(first: $first, after: $after)
        }
      `}
      render={({ error, props }): ReactNode => {
        if (error) {
          return <div>Error!</div>;
        }

        if (!props) {
          return <LoadingPlaceholder
            alt='Loading tags...'
          />;
        }

        return <TagsList entityConnection={props} entityName='tags'/>;
      }}
      variables={{
        first: ENTITIES_PER_PAGE,
        after: null,
      }}
    />
  );
}

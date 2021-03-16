import React, { ReactElement } from 'react';
import { useParams } from 'react-router';
import { QueryRenderer } from 'react-relay';
import environment from '../../appEnv';
import graphql from 'babel-plugin-relay/macro';
import LoadingPlaceholder from '../utils/LoadingPlaceholder';
import notifier from 'codex-notifier';
import { Redirect } from 'react-router-dom';
import { TagEditQuery } from './__generated__/TagEditQuery.graphql';
import TagEditForm from './TagEditForm';

/**
 * Displays edit component for tag
 */
export default function TagEdit(): ReactElement {
  const { id } = useParams<{id: string}>();

  return (
    <QueryRenderer<TagEditQuery>
      environment={environment}
      query={graphql`
        query TagEditQuery($id: GlobalId!) {
          tag(id: $id) {
            ...TagEditForm_originalTag
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          return <div>Error</div>;
        }

        if (!props) {
          return <LoadingPlaceholder
            alt='Loading tag...'
          />;
        }

        if (!props.tag) {
          notifier.show({
            message: `Tag with id "${id}" wasn't found`,
            style: 'error',
            time: 5000,
          });

          return <Redirect to='/tags'/>;
        }

        return <TagEditForm originalTag={props.tag}/>;
      }}
      variables={{ id }}
    />
  );
}

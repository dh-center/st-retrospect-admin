import { ReactElement } from 'react';
import environment from '../../appEnv';
import graphql from 'babel-plugin-relay/macro';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import notifier from 'codex-notifier';
import { QueryRenderer } from 'react-relay';
import LoadingPlaceholder from '../utils/LoadingPlaceholder';
import { RelationTypeEditQuery } from './__generated__/RelationTypeEditQuery.graphql';
import RelationTypeEditForm from './RelationTypeEditForm';

/**
 * Displays edit component for relation type
 */
export default function RelationTypeEdit(): ReactElement {
  const { id } = useParams<{id: string}>();

  return (
    <QueryRenderer<RelationTypeEditQuery>
      environment={environment}
      query={graphql`
        query RelationTypeEditQuery($id: GlobalId!) {
          relationType(id: $id) {
            ...RelationTypeEditForm_originalRelationType
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          return <div>Error</div>;
        }

        if (!props) {
          return <LoadingPlaceholder
            alt='Loading relation type...'
          />;
        }

        if (!props.relationType) {
          notifier.show({
            message: `Relation type with id "${id}" wasn't found`,
            style: 'error',
            time: 5000,
          });

          return <Redirect to='/relation-types'/>;
        }

        return <RelationTypeEditForm originalRelationType={props.relationType}/>;
      }}
      variables={{ id }}
    />
  );
}

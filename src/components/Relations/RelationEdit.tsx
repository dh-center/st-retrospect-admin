import { ReactElement } from 'react';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import notifier from 'codex-notifier';
import environment from '../../appEnv';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import { RelationEditQuery } from './__generated__/RelationEditQuery.graphql';
import LoadingPlaceholder from '../utils/LoadingPlaceholder';
import RelationEditForm from './RelationEditForm';

/**
 * Displays edit component for relations
 */
export default function RelationEdit(): ReactElement {
  const { id } = useParams<{id: string}>();

  return (
    <QueryRenderer<RelationEditQuery>
      environment={environment}
      query={graphql`
        query RelationEditQuery($id: GlobalId!) {
          relation(id: $id) {
            ...RelationEditForm_originalRelation
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          return <div>Error</div>;
        }

        if (!props) {
          return <LoadingPlaceholder
            alt='Loading relation...'
          />;
        }

        if (!props.relation) {
          notifier.show({
            message: `Relation with id "${id}" wasn't found`,
            style: 'error',
            time: 5000,
          });

          return <Redirect to='/relations'/>;
        }

        return <RelationEditForm originalRelation={props.relation}/>;
      }}
      variables={{ id }}
    />
  );
}

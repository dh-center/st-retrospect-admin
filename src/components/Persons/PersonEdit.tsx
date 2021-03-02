import React, { ReactElement } from 'react';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import { QueryRenderer } from 'react-relay';
import environment from '../../appEnv';
import graphql from 'babel-plugin-relay/macro';
import { PersonEditQuery } from './__generated__/PersonEditQuery.graphql';
import LoadingPlaceholder from '../utils/LoadingPlaceholder';
import PersonEditForm from './PersonEditForm';
import notifier from 'codex-notifier';

/**
 * Page with form for person editing
 */
export default function PersonEdit(): ReactElement {
  const { id } = useParams<{id: string}>();

  return (
    <QueryRenderer<PersonEditQuery>
      environment={environment}
      query={graphql`
        query PersonEditQuery($id: GlobalId!) {
          person(id: $id) {
            ...PersonEditForm_originalPerson
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          return <div>Error</div>;
        }

        if (!props) {
          return <LoadingPlaceholder
            alt='Loading person...'
          />;
        }

        if (!props.person) {
          notifier.show({
            message: `Person with id "${id}" wasn't found`,
            style: 'error',
            time: 5000,
          });

          return <Redirect to='/persons'/>;
        }

        return <PersonEditForm originalPerson={props.person}/>;
      }}
      variables={{ id }}
    />
  );
}

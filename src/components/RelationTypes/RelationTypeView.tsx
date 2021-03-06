import React, { useState } from 'react';
import commitMutation from 'relay-commit-mutation-promise';
import environment from '../../appEnv';
import graphql from 'babel-plugin-relay/macro';
import {
  RelationTypeViewDeleteMutation,
  RelationTypeViewDeleteMutationResponse
} from './__generated__/RelationTypeViewDeleteMutation.graphql';
import { useHistory, useParams } from 'react-router';
import notifier from 'codex-notifier';
import { QueryRenderer } from 'react-relay';
import LoadingPlaceholder from '../utils/LoadingPlaceholder';
import { Redirect } from 'react-router-dom';
import ContentWrapper from '../ContentWrapper';
import LabeledText from '../utils/LabeledText';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Spinner } from 'react-bootstrap';
import { RelationTypeViewQuery } from './__generated__/RelationTypeViewQuery.graphql';
import handleApiError from '../../utils/handleApiError';

/**
 * Removes relation type by its id
 *
 * @param id - relation type id to remove
 */
function remove(id: string): Promise<RelationTypeViewDeleteMutationResponse> {
  return commitMutation<RelationTypeViewDeleteMutation>(environment, {
    mutation: graphql`
      mutation RelationTypeViewDeleteMutation($id: GlobalId!) {
        relationType {
          delete(id: $id) {
            recordId
          }
        }
      }
    `,
    variables: { id },
  });
}

/**
 * Page with relation type info to view
 */
function RelationTypeView(): React.ReactElement {
  const [isDeleting, setDeletingStatus] = useState(false);

  const { id } = useParams<{id: string}>();
  const history = useHistory();

  /**
   * Creates notifier window and executes delete mutation for current relation type
   */
  const removeRelationType = async (): Promise<void> => {
    notifier.show({
      message: 'Are you sure you want to delete this relation type?',
      type: 'confirm',
      style: 'error',
      okText: 'Yes',
      okHandler: async () => {
        setDeletingStatus(true);
        try {
          await remove(id);
          setDeletingStatus(false);
          history.push('/relation-types');
        } catch (error) {
          setDeletingStatus(false);
          handleApiError(error);
        }
      },
    });
  };

  return (
    <QueryRenderer<RelationTypeViewQuery>
      environment={environment}
      query={graphql`
        query RelationTypeViewQuery($id: GlobalId!) {
          relationType(id: $id) {
            id
            name
            synonyms
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

        return (
          <ContentWrapper>
            <div>
              <LabeledText
                content={props.relationType.name}
                label='Name'
              />
              <LabeledText
                content={props.relationType.synonyms
                  .filter(synonym => synonym !== null)
                  .join('; ')}
                label='Synonyms'
              />
            </div>
            <div>
              <LinkContainer to={`/relation-types/${id}/edit`}>
                <Button className='m-1' variant='outline-warning'>Edit</Button>
              </LinkContainer>
              <Button className='m-1' onClick={removeRelationType} variant='outline-danger'>
                {isDeleting
                  ? (
                    <Spinner
                      animation='border'
                      aria-hidden='true'
                      as='span'
                      role='status'
                      size='sm'
                    />
                  )
                  : ('Delete')}
              </Button>
            </div>
          </ContentWrapper>
        );
      }}
      variables={{ id }}
    />
  );
}

export default RelationTypeView;

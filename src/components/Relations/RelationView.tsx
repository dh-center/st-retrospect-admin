import React, { useState } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import environment from '../../relay-env';
import { useParams, useHistory } from 'react-router';
import { RelationViewQuery } from './__generated__/RelationViewQuery.graphql';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Spinner } from 'react-bootstrap';
import ContentWrapper from '../ContentWrapper';
import notifier from 'codex-notifier';
import commitMutation from 'relay-commit-mutation-promise';
import {
  RelationViewDeleteMutation,
  RelationViewDeleteMutationResponse
} from './__generated__/RelationViewDeleteMutation.graphql';
import Form from 'react-bootstrap/Form';
import personsFullName from '../../utils/personsFullname';

/**
 * Removes relation by its id
 *
 * @param id - relation id to remove
 */
function remove(id: string): Promise<RelationViewDeleteMutationResponse> {
  return commitMutation<RelationViewDeleteMutation>(environment, {
    mutation: graphql`
      mutation RelationViewDeleteMutation($id: ObjectId!) {
        relation {
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
 * Page with relation info to view
 */
function RelationView(): React.ReactElement {
  const [isDeleting, setDeletingStatus] = useState(false);

  const { id } = useParams();
  const history = useHistory();

  /**
   * Creates notifier window and executes delete mutation for current relation
   */
  const removeRelation = async (): Promise<void> => {
    notifier.show({
      message: 'Are you sure you want to delete this relation?',
      type: 'confirm',
      style: 'error',
      okText: 'Yes',
      okHandler: async () => {
        setDeletingStatus(true);
        try {
          await remove(id);
          setDeletingStatus(false);
          history.push('/relations');
        } catch {
          setDeletingStatus(false);
          notifier.show({
            message: 'Something went wrong',
            style: 'error',
            time: 5000,
          });
        }
      },
    });
  };

  return (
    <QueryRenderer<RelationViewQuery>
      environment={environment}
      query={graphql`
        query RelationViewQuery($id: ID!) {
          relation(id: $id) {
            id
            person {
              lastName
              firstName
              patronymic
            }
            locationInstance {
              name
            }
            relationType {
              name
            }
         }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          return <div>Error</div>;
        }

        if (!props) {
          return <div>Loading...</div>;
        }

        if (!props.relation) {
          return <div>There is no relation with provided id</div>;
        }

        return (
          <ContentWrapper>
            <div>
              <Form.Group>
                <Form.Label>Person:</Form.Label>
                <div>{props.relation.person ? personsFullName(props.relation.person) : '—'}</div>
              </Form.Group>
              <Form.Group>
                <Form.Label>Relation type:</Form.Label>
                <div>{props.relation.relationType ? props.relation.relationType.name : '—'}</div>
              </Form.Group>
              <Form.Group>
                <Form.Label>Location instance:</Form.Label>
                <div>{props.relation.locationInstance ? props.relation.locationInstance.name : '—'}</div>
              </Form.Group>
            </div>
            <div>
              <LinkContainer to={`/relations/${id}/edit`}>
                <Button className='m-1' variant='outline-warning'>Edit</Button>
              </LinkContainer>
              <Button className='m-1' onClick={removeRelation} variant='outline-danger'>
                {isDeleting ? (
                  <Spinner
                    animation='border'
                    aria-hidden='true'
                    as='span'
                    role='status'
                    size='sm'
                  />
                ) : ('Delete')}
              </Button>
            </div>
          </ContentWrapper>
        );
      }}
      variables={{ id }}
    />
  );
}

export default RelationView;
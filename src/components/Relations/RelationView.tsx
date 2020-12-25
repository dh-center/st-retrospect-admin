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
import personsFullName from '../../utils/personsFullname';
import LabeledText from '../utils/LabeledText';
import { Redirect } from 'react-router-dom';
import LoadingPlaceholder from '../utils/LoadingPlaceholder';

/**
 * Removes relation by its id
 *
 * @param id - relation id to remove
 */
function remove(id: string): Promise<RelationViewDeleteMutationResponse> {
  return commitMutation<RelationViewDeleteMutation>(environment, {
    mutation: graphql`
      mutation RelationViewDeleteMutation($id: GlobalId!) {
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

  const { id } = useParams<{id: string}>();
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
        query RelationViewQuery($id: GlobalId!) {
          relation(id: $id) {
            id
            person {
              id
              lastName
              firstName
              patronymic
            }
            locationInstance {
              location {
                id
              }
              name
            }
            relationType {
              name
            }
            startDate
            endDate
            quote
            link
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

        return (
          <ContentWrapper>
            <div>
              <LabeledText
                content={props.relation.person ? personsFullName(props.relation.person) : null}
                label='Person'
                link={props.relation.person ? `/persons/${props.relation.person.id}` : null}
              />
              <LabeledText
                content={props.relation.relationType?.name}
                label='Relation type'
              />
              <LabeledText
                content={props.relation.locationInstance?.name}
                label='Location instance'
                link={props.relation.locationInstance ? `/locations/${props.relation.locationInstance.location.id}` : null}
              />
              <LabeledText
                content={props.relation.startDate}
                label='Start date'
              />
              <LabeledText
                content={props.relation.endDate}
                label='End date'
              />
              <LabeledText
                content={props.relation.quote}
                label='Description'
              />
              <LabeledText
                content={props.relation.link}
                label='Link'
              />
            </div>
            <div>
              <LinkContainer to={`/relations/${id}/edit`}>
                <Button className='m-1' variant='outline-warning'>Edit</Button>
              </LinkContainer>
              <Button className='m-1' onClick={removeRelation} variant='outline-danger'>
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

export default RelationView;

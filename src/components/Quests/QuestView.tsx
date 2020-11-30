import graphql from 'babel-plugin-relay/macro';
import commitMutation from 'relay-commit-mutation-promise';
import environment from '../../relay-env';
import {
  QuestViewDeleteMutation,
  QuestViewDeleteMutationResponse
} from './__generated__/QuestViewDeleteMutation.graphql';
import React, { ReactElement, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import notifier from 'codex-notifier';
import { QueryRenderer } from 'react-relay';
import LoadingPlaceholder from '../utils/LoadingPlaceholder';
import { Redirect } from 'react-router-dom';
import ContentWrapper from '../ContentWrapper';
import LabeledText from '../utils/LabeledText';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Spinner } from 'react-bootstrap';
import { QuestViewQuery } from './__generated__/QuestViewQuery.graphql';

/**
 * Removes quest by its id
 *
 * @param id - quest id to remove
 */
function remove(id: string): Promise<QuestViewDeleteMutationResponse> {
  return commitMutation<QuestViewDeleteMutation>(environment, {
    mutation: graphql`
      mutation QuestViewDeleteMutation($id: GlobalId!) {
        quest {
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
 * Page with quest info to view
 */
export default function QuestView(): ReactElement {
  const [isDeleting, setDeletingStatus] = useState(false);

  const { id } = useParams<{id: string}>();
  const history = useHistory();

  /**
   * Creates notifier window and executes delete mutation for current quest
   */
  const removeQuest = async (): Promise<void> => {
    notifier.show({
      message: 'Are you sure you want to delete this quest?',
      type: 'confirm',
      style: 'error',
      okText: 'Yes',
      okHandler: async () => {
        setDeletingStatus(true);
        try {
          await remove(id);
          setDeletingStatus(false);
          history.push('/quests');
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
    <QueryRenderer<QuestViewQuery>
      environment={environment}
      query={graphql`
        query QuestViewQuery($id: GlobalId!) {
          quest(id: $id) {
            id
            name
            description
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          return <div>Error</div>;
        }

        if (!props) {
          return <LoadingPlaceholder
            alt='Loading quest...'
          />;
        }

        if (!props.quest) {
          notifier.show({
            message: `Quest with id "${id}" wasn't found`,
            style: 'error',
            time: 5000,
          });

          return <Redirect to='/quests'/>;
        }

        return (
          <ContentWrapper>
            <div>
              <LabeledText
                content={props.quest.name}
                label='Name'
              />
              <LabeledText
                content={props.quest.description}
                label='Description'
              />
            </div>
            <div>
              <LinkContainer to={`/quests/${id}/edit`}>
                <Button className='m-1' variant='outline-warning'>Edit</Button>
              </LinkContainer>
              <Button className='m-1' onClick={removeQuest} variant='outline-danger'>
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

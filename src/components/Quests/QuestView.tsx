import graphql from 'babel-plugin-relay/macro';
import commitMutation from 'relay-commit-mutation-promise';
import environment from '../../appEnv';
import {
  QuestViewDeleteMutation,
  QuestViewDeleteMutationResponse
} from './__generated__/QuestViewDeleteMutation.graphql';
import { ReactElement, useState } from 'react';
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
import handleApiError from '../../utils/handleApiError';
import LabeledArrayOfLinks from '../utils/LabeledArrayOfLinks';
import personsFullName from '../../utils/personsFullname';

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
        } catch (error) {
          setDeletingStatus(false);
          handleApiError(error);
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
            language
            wayToTravel
            type
            durationInMinutes
            distanceInKilometers
            minLevel
            earnedExp
            tags {
              value
            }
            personsCards {
              id
              lastName
              firstName
              patronymic
            }
            linkedAchievements {
              name
            }
            whereDisplays
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

        const questType = (): string => {
          switch (props.quest?.type) {
            case 'QUIZ':
              return 'Quiz';
            case 'ROUTE':
              return 'Route';
            case 'STORY':
              return 'Story';
            case 'QUEST':
              return 'Quest';
            case '%future added value':
            default:
              return props.quest?.type.toString() || 'Undefined';
          }
        };

        const questWayToTravel = (): string => {
          switch (props.quest?.wayToTravel) {
            case 'ON_FOOT':
              return 'On foot';
            case 'WITH_TRANSPORT':
              return 'With transport';
            case '%future added value':
            default:
              return props.quest?.type.toString() || 'Undefined';
          }
        };

        const whereDisplays = (): string => {
          return props.quest?.whereDisplays
            .map(application => {
              switch (application) {
                case 'WEB':
                  return 'Web';
                case 'MOBILE':
                  return 'Mobile app';
                case '%future added value':
                default:
                  return application.toString() || 'Undefined';
              }
            })
            .join(', ') || '';
        };

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
              <LabeledText
                content={props.quest.tags
                  .map(tag => tag.value)
                  .join('; ')}
                label='Tags'
              />
              <LabeledText
                content={props.quest.linkedAchievements
                  .map(achievement => achievement.name)
                  .join('; ')}
                label='Linked achievements'
              />
              <LabeledText
                content={questType()}
                label='Type'
              />
              <LabeledText
                content={whereDisplays()}
                label='Where displays'
              />
              <LabeledText
                content={props.quest.language}
                label='Language'
              />
              <LabeledText
                content={questWayToTravel()}
                label='Way to travel'
              />
              <LabeledText
                content={props.quest.durationInMinutes.toString()}
                label='Duration in minutes'
              />
              <LabeledText
                content={props.quest.distanceInKilometers.toString()}
                label='Distance in kilometers'
              />
              <LabeledText
                content={props.quest.minLevel.toString()}
                label='Minimum level'
              />
              <LabeledText
                content={props.quest.earnedExp.toString()}
                label='Earned experience'
              />
              <LabeledArrayOfLinks
                items={props.quest.personsCards.map(personCard => {
                  return {
                    link: `/persons/${personCard.id}`,
                    value: personsFullName(personCard),
                  };
                })}
                label='Persons cards'
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

import {
  QuestEditFormUpdateMutation,
  QuestEditFormUpdateMutationResponse,
  UpdateQuestInput
} from './__generated__/QuestEditFormUpdateMutation.graphql';
import commitMutation from 'relay-commit-mutation-promise';
import environment from '../../appEnv';
import graphql from 'babel-plugin-relay/macro';
import { QuestEditForm_originalQuest } from './__generated__/QuestEditForm_originalQuest.graphql';
import React, { FormEvent, Suspense, useState } from 'react';
import deepCopy from '../../utils/deepCopy';
import notifier from 'codex-notifier';
import handleApiError from '../../utils/handleApiError';
import ContentWrapper from '../ContentWrapper';
import { Form } from 'react-bootstrap';
import Input from '../utils/Input';
import Textarea from '../utils/Textarea';
import { LabeledTagsInput } from '../utils/TagsInput';
import Button from 'react-bootstrap/cjs/Button';
import { createFragmentContainer } from 'react-relay';
import editorjsStyles from '../../editorjs-plugins/EditorJs.module.css';
import EditorJs from 'react-editor-js';
import { API, OutputBlockData, OutputData } from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from '../../editorjs-plugins/tools';
import ButtonWithLoader from '../utils/ButtonWithLoader';
import useLeaveEditPage from '../../utils/useLeaveEditPage';
import ArrayOfCustomSelects from '../utils/ArrayOfCustomSelects';
import PersonsCustomSelect from '../CustomSelects/PersonsCustomSelect';
import AchievementsCustomSelect from '../CustomSelects/AchievementsCustomSelect';
import addValueToArrayOfUniqueValues from '../../utils/addValueToArrayOfUniqueValues';

/**
 * Executes update mutation for quest
 *
 * @param input - updated quest object
 */
export function update(input: UpdateQuestInput): Promise<QuestEditFormUpdateMutationResponse> {
  return commitMutation<QuestEditFormUpdateMutation>(environment, {
    mutation: graphql`
      mutation QuestEditFormUpdateMutation($input: UpdateQuestInput!) {
        quest {
          update(input: $input) {
            recordId
          }
        }
      }
    `,
    variables: { input },
  });
}

/**
 * Props for QuestEditForm
 */
interface Props {
  /**
   * Data about original quest for editing
   */
  originalQuest: QuestEditForm_originalQuest;
}

/**
 * Form for editing quests
 *
 * @param props - props for component rendering
 */
function QuestEditForm(props: Props): React.ReactElement {
  const originalQuest = {
    ...props.originalQuest,
    whereDisplays: [ ...props.originalQuest.whereDisplays ],
    tagIds: props.originalQuest.tags.map(tag => tag.id),
    tags: undefined,
    personsCardsIds: props.originalQuest.personsCards.map(personCard => personCard.id),
    personsCards: undefined,
    linkedAchievementsIds: props.originalQuest.linkedAchievements.map(achievement => achievement.id),
    linkedAchievements: undefined,
  };
  const [input, setInput] = useState(() => deepCopy(originalQuest as UpdateQuestInput));

  const [isLoading, setLoadingStatus] = useState(false);

  const leaveEditPage = useLeaveEditPage();

  /**
   * Saves updated quest to API
   *
   * @param e - submit form event
   */
  const updateQuest = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if ('id' in input) {
      setLoadingStatus(true);
      try {
        await update(input);
        notifier.show({
          message: 'Successfully updated',
          style: 'success',
          time: 5000,
        });
        setLoadingStatus(false);
        leaveEditPage();
      } catch (error) {
        setLoadingStatus(false);
        handleApiError(error);
      }
    }
  };

  return (
    <ContentWrapper>
      <Form onSubmit={updateQuest}>
        <Input
          label='Name'
          onChange={value => setInput({
            ...input,
            name: value,
          })}
          required
          value={input?.name || ''}
        />
        <Textarea
          label='Description'
          onChange={value => setInput({
            ...input,
            description: value.toString(),
          })}
          value={input?.description || ''}
        />
        <Form.Group>
          <Form.Label htmlFor='photo'>Photo</Form.Label>
          <Form.File
            disabled
            id='photo'
            name='photo'
            type='text'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor=''>Type</Form.Label>
          <div>
            <Form.Check
              checked={input?.type === 'QUIZ'}
              id='quiz'
              inline
              label='Quiz'
              name='type'
              onChange={(): void => {
                setInput({
                  ...input,
                  type: 'QUIZ',
                });
              }}
              required
              type='radio'
              value='QUIZ'
            />
            <Form.Check
              checked={input?.type === 'ROUTE'}
              id='route'
              inline
              label='Route'
              name='type'
              onChange={(): void => {
                setInput({
                  ...input,
                  type: 'ROUTE',
                });
              }}
              required
              type='radio'
              value='ROUTE'
            />
            <Form.Check
              checked={input.type === 'STORY'}
              id='story'
              inline
              label='Story'
              name='type'
              onChange={(): void => {
                setInput({
                  ...input,
                  type: 'STORY',
                });
              }}
              required
              type='radio'
              value='STORY'
            />
            <Form.Check
              checked={input.type === 'QUEST'}
              id='quest'
              inline
              label='Quest'
              name='type'
              onChange={(): void => {
                setInput({
                  ...input,
                  type: 'QUEST',
                });
              }}
              required
              type='radio'
              value='QUEST'
            />
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor=''>Where displays</Form.Label>
          <div>
            <Form.Check
              checked={input?.whereDisplays?.includes('WEB')}
              id='web'
              inline
              label='Web'
              name='whereDisplays'
              onChange={(event): void => {
                setInput(prevState => {
                  let whereDisplays = prevState.whereDisplays || [];

                  if (event.target.checked) {
                    whereDisplays = addValueToArrayOfUniqueValues(whereDisplays, 'WEB');
                  } else {
                    whereDisplays = whereDisplays.filter(application => application !== 'WEB');
                  }

                  return {
                    ...prevState,
                    whereDisplays,
                  };
                });
              }}
              type='checkbox'
              value='WEB'
            />
            <Form.Check
              checked={input?.whereDisplays?.includes('MOBILE')}
              id='mobile'
              inline
              label='Mobile'
              name='whereDisplays'
              onChange={(event): void => {
                setInput(prevState => {
                  let whereDisplays = prevState.whereDisplays || [];

                  if (event.target.checked) {
                    whereDisplays = addValueToArrayOfUniqueValues(whereDisplays, 'MOBILE');
                  } else {
                    whereDisplays = whereDisplays.filter(application => application !== 'MOBILE');
                  }

                  return {
                    ...prevState,
                    whereDisplays,
                  };
                });
              }}
              type='checkbox'
              value='MOBILE'
            />
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor=''>Language</Form.Label>
          <div>
            <Form.Check
              checked={input.language === 'RU'}
              id='ru'
              inline
              label='Russian'
              name='language'
              onChange={(): void => {
                setInput({
                  ...input,
                  language: 'RU',
                });
              }}
              required
              type='radio'
              value='RU'
            />
            <Form.Check
              checked={input.language === 'EN'}
              id='en'
              inline
              label='English'
              name='language'
              onChange={(): void => {
                setInput({
                  ...input,
                  language: 'EN',
                });
              }}
              required
              type='radio'
              value='EN'
            />
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor=''>Way to travel</Form.Label>
          <div>
            <Form.Check
              checked={input.wayToTravel === 'ON_FOOT'}
              id='onFoot'
              inline
              label='On foot'
              name='wayToTravel'
              onChange={(): void => {
                setInput({
                  ...input,
                  wayToTravel: 'ON_FOOT',
                });
              }}
              required
              type='radio'
              value='ON_FOOT'
            />
            <Form.Check
              checked={input.wayToTravel === 'WITH_TRANSPORT'}
              id='withTransport'
              inline
              label='With transport'
              name='wayToTravel'
              onChange={(): void => {
                setInput({
                  ...input,
                  wayToTravel: 'WITH_TRANSPORT',
                });
              }}
              required
              type='radio'
              value='WITH_TRANSPORT'
            />
          </div>
        </Form.Group>
        <Input
          label='Duration in minutes'
          min={0}
          onChange={value => setInput({
            ...input,
            durationInMinutes: Number(value),
          })}
          required
          type='number'
          value={input?.durationInMinutes !== undefined ? Number(input?.durationInMinutes).toString() : '1'}
        />
        <Input
          label='Distance in kilometers'
          min={0}
          onChange={value => setInput({
            ...input,
            distanceInKilometers: Number(value),
          })}
          required
          step={0.1}
          type='number'
          value={input?.distanceInKilometers !== undefined ? Number(input?.distanceInKilometers).toString() : '1'}
        />
        <Suspense fallback='Loading tags...'>
          <LabeledTagsInput
            label='Tags'
            onChange={value => {
              setInput({
                ...input,
                tagIds: value,
              });
            }}
            value={input.tagIds || []}
          />
        </Suspense>
        <Input
          label='Minimum level'
          min={0}
          onChange={value => setInput({
            ...input,
            minLevel: Number(value),
          })}
          required
          type='number'
          value={input?.minLevel !== undefined ? Number(input?.minLevel).toString() : '0'}
        />
        <Input
          label='Earned experience'
          min={0}
          onChange={value => setInput({
            ...input,
            earnedExp: Number(value),
          })}
          required
          type='number'
          value={input?.earnedExp !== undefined ? Number(input?.earnedExp).toString() : '0'}
        />
        <Form.Group>
          <Form.Label>Persons cards</Form.Label>
          <ArrayOfCustomSelects
            CustomSelect={PersonsCustomSelect}
            addButtonText='Add card...'
            onChange={value => {
              setInput({
                ...input,
                personsCardsIds: value.filter((val): val is string => val !== null),
              });
            }}
            removeButtonText='Remove card'
            value={input?.personsCardsIds || []}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Linked achievements</Form.Label>
          <ArrayOfCustomSelects
            CustomSelect={AchievementsCustomSelect}
            addButtonText='Add achievement...'
            onChange={value => {
              setInput({
                ...input,
                linkedAchievementsIds: value.filter((val): val is string => val !== null),
              });
            }}
            removeButtonText='Remove achievement'
            value={input?.linkedAchievementsIds || []}
          />
        </Form.Group>
        <Form.Group>
          <h2>Route content</h2>
          <div className={editorjsStyles.editorjsWrapper}>
            <EditorJs
              data={{
                blocks: (input?.data?.blocks || []) as OutputBlockData[],
                time: input?.data?.time || undefined,
                version: input?.data?.version || undefined,
              }}
              onChange={(api: API, editorData?: OutputData) => {
                if (editorData) {
                  setInput({
                    ...input,
                    data: {
                      time: null,
                      version: '',
                      ...editorData,
                    },
                  });
                }
              }}
              placeholder='Click here to write an awesome route!'
              tools={EDITOR_JS_TOOLS}
            />
          </div>
        </Form.Group>
        <Form.Group>
          <h2>Credits</h2>
          <div className={editorjsStyles.editorjsWrapper}>
            <EditorJs
              data={{
                blocks: (input?.credits?.blocks || []) as OutputBlockData[],
                time: input?.credits?.time || undefined,
                version: input?.credits?.version || undefined,
              }}
              onChange={(api: API, editorData?: OutputData) => {
                if (editorData) {
                  setInput({
                    ...input,
                    credits: {
                      time: null,
                      version: '',
                      ...editorData,
                    },
                  });
                }
              }}
              placeholder='Click here to write information about quest authors!'
              tools={EDITOR_JS_TOOLS}
            />
          </div>
        </Form.Group>
        <div>
          <ButtonWithLoader
            isLoading={isLoading}
            type='submit'
          >
            Save
          </ButtonWithLoader>
          <Button
            className='m-1'
            onClick={() => leaveEditPage()}
            variant='outline-danger'
          >
            Cancel
          </Button>
        </div>
      </Form>
    </ContentWrapper>
  );
}

export default createFragmentContainer(
  QuestEditForm,
  {
    originalQuest: graphql`
      fragment QuestEditForm_originalQuest on Quest {
        id
        name
        description
        language
        type
        wayToTravel
        distanceInKilometers
        durationInMinutes
        minLevel
        earnedExp
        data {
          time
          version
          blocks
        }
        credits {
          time
          version
          blocks
        }
        tags {
          id
        }
        personsCards {
          id
        }
        linkedAchievements {
          id
        }
        whereDisplays
      }
    `,
  }
);

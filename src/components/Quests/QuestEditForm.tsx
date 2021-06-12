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
    tagIds: props.originalQuest.tags.map(tag => tag.id),
    tags: undefined,
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
              checked={input.type === 'TEST'}
              id='test'
              inline
              label='Test'
              name='type'
              onChange={(): void => {
                setInput({
                  ...input,
                  type: 'TEST',
                });
              }}
              required
              type='radio'
              value='TEST'
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
              label='Пешком'
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
              label='С транспортом'
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
      }
    `,
  }
);

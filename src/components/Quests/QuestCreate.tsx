import graphql from 'babel-plugin-relay/macro';
import commitMutation from 'relay-commit-mutation-promise';
import environment from '../../appEnv';
import {
  CreateQuestInput,
  QuestCreateMutation,
  QuestCreateMutationResponse
} from './__generated__/QuestCreateMutation.graphql';
import React, { FormEvent, Suspense, useState } from 'react';
import { useHistory } from 'react-router-dom';
import notifier from 'codex-notifier';
import ContentWrapper from '../ContentWrapper';
import { Form, Spinner } from 'react-bootstrap';
import Input from '../utils/Input';
import Button from 'react-bootstrap/Button';
import Textarea from '../utils/Textarea';
import { API, OutputBlockData, OutputData } from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from '../../editorjs-plugins/tools';
import EditorJs from 'react-editor-js';
import handleApiError from '../../utils/handleApiError';
import editorjsStyles from '../../editorjs-plugins/EditorJs.module.css';
import { LabeledTagsInput } from '../utils/TagsInput';

/**
 * Generates input data for creating new quest
 */
export function generateQuestInput(): CreateQuestInput {
  return {
    name: '',
    description: '',
    wayToTravel: 'ON_FOOT',
    durationInMinutes: 1,
    distanceInKilometers: 1,
    type: 'QUIZ',
    minLevel: 0,
    earnedExp: 0,
    data: {
      time: null,
      version: null,
      blocks: [],
    },
    credits: {
      time: null,
      version: null,
      blocks: [],
    },
    tagIds: [],
  };
}

/**
 * Mutation for creating new quest
 *
 * @param input - input data for creating
 */
function create(input: CreateQuestInput): Promise<QuestCreateMutationResponse> {
  return commitMutation<QuestCreateMutation>(environment, {
    mutation: graphql`
      mutation QuestCreateMutation($input: CreateQuestInput!) {
        quest {
          create(input: $input) {
            recordId
          }
        }
      }
    `,
    variables: { input },
  });
}

/**
 * Component implements quest creating
 */
export default function QuestCreate(): React.ReactElement {
  const [input, setInput] = useState<CreateQuestInput>(generateQuestInput);
  const [isLoading, setLoadingStatus] = useState(false);
  const history = useHistory();

  /**
   * Saves created quest to API
   *
   * @param e - form submit event
   */
  const saveQuestToApi = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (!input) {
      return;
    }

    setLoadingStatus(true);
    try {
      await create(input);
      notifier.show({
        message: `Successfully created`,
        style: 'success',
        time: 5000,
      });
      setLoadingStatus(false);
      history.push('/quests');
    } catch (error) {
      setLoadingStatus(false);
      handleApiError(error);
    }
  };

  return (
    <ContentWrapper>
      <Form onSubmit={saveQuestToApi}>
        <Input
          label='Name'
          onChange={value => setInput({
            ...input,
            name: value,
          })}
          required
          value={input.name}
        />
        <Textarea
          label='Description'
          onChange={value => setInput({
            ...input,
            description: value.toString(),
          })}
          value={input.description || ''}
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
              checked={input.type === 'QUIZ'}
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
              checked={input.type === 'ROUTE'}
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
          value={input.durationInMinutes.toString()}
        />
        <Input
          label='Distance in minutes'
          min={0}
          onChange={value => setInput({
            ...input,
            distanceInKilometers: Number(value),
          })}
          required
          type='number'
          value={input.distanceInKilometers.toString()}
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
          value={input.minLevel.toString()}
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
          value={input.earnedExp.toString()}
        />
        <Form.Group>
          <h2>Route content</h2>
          <div className={editorjsStyles.editorjsWrapper}>
            <EditorJs
              data={{
                blocks: (input.data?.blocks || []) as OutputBlockData[],
                time: input.data?.time || undefined,
                version: input.data?.version || undefined,
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
                blocks: (input.credits?.blocks || []) as OutputBlockData[],
                time: input.credits?.time || undefined,
                version: input.credits?.version || undefined,
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
        <Button
          className='m-1'
          type='submit'
        >
          {isLoading
            ? (
              <Spinner
                animation='border'
                aria-hidden='true'
                as='span'
                role='status'
                size='sm'
              />
            )
            : 'Create'}
        </Button>
      </Form>
    </ContentWrapper>
  );
}

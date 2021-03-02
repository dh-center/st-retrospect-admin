import graphql from 'babel-plugin-relay/macro';
import commitMutation from 'relay-commit-mutation-promise';
import environment from '../../relay-env';
import {
  CreateQuestInput,
  QuestCreateMutation,
  QuestCreateMutationResponse
} from './__generated__/QuestCreateMutation.graphql';
import React, { FormEvent, useState } from 'react';
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

/**
 * Generates input data for creating new quest
 */
export function generateQuestInput(): CreateQuestInput {
  return {
    name: '',
    description: '',
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
          </div>
        </Form.Group>
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

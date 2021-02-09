import commitMutation from 'relay-commit-mutation-promise';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';
import {
  QuestEditMutation,
  QuestEditMutationResponse,
  UpdateQuestInput
} from './__generated__/QuestEditMutation.graphql';
import React, { ReactElement, useState } from 'react';
import { useParams } from 'react-router';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import notifier from 'codex-notifier';
import { QueryRenderer } from 'react-relay';
import LoadingPlaceholder from '../utils/LoadingPlaceholder';
import ContentWrapper from '../ContentWrapper';
import Input from '../utils/Input';
import { Button, Form, Spinner } from 'react-bootstrap';
import { QuestEditQuery } from './__generated__/QuestEditQuery.graphql';
import Textarea from '../utils/Textarea';
import { API, OutputBlockData, OutputData } from '@editorjs/editorjs';
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '../../editorjs-plugins/tools';

/**
 * Mutation for save edited quest
 *
 * @param input - input data for saving
 */
function update(input: UpdateQuestInput): Promise<QuestEditMutationResponse> {
  return commitMutation<QuestEditMutation>(environment, {
    mutation: graphql`
      mutation QuestEditMutation($input: UpdateQuestInput!) {
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
 * Displays edit component for quest
 */
export default function QuestEdit(): ReactElement {
  const { id } = useParams<{id: string}>();

  const [input, setInput] = useState<UpdateQuestInput | null>(null);
  const [isLoading, setLoadingStatus] = useState(false);

  const history = useHistory();
  const location = useLocation();

  /**
   * Push location back to entity view page
   */
  const pushLocationBack = (): void => {
    const entityPath = location.pathname.replace('/edit', '');

    history.push(entityPath);
  };

  /**
   * Saves updated quest to API
   */
  const saveQuestToApi = async (): Promise<void> => {
    if (!input) {
      notifier.show({
        message: 'Please make changes in quest',
        style: 'error',
        time: 5000,
      });

      return;
    }

    setLoadingStatus(true);
    try {
      await update(input);
      notifier.show({
        message: 'Quest successfully saved',
        style: 'success',
        time: 5000,
      });
      setLoadingStatus(false);
      pushLocationBack();
    } catch {
      setLoadingStatus(false);
      notifier.show({
        message: 'Something went wrong',
        style: 'error',
        time: 5000,
      });
    }
  };

  return (
    <QueryRenderer<QuestEditQuery>
      environment={environment}
      query={graphql`
        query QuestEditQuery($id: GlobalId!) {
          quest(id: $id) {
            id
            name
            description
            type
            minLevel
            data {
              time
              version
              blocks
            }
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
            <Input
              label='Name'
              onChange={value => setInput({
                ...input,
                id,
                name: value,
              })}
              required
              value={input?.name || props.quest.name}
            />
            <Textarea
              label='Description'
              onChange={value => setInput({
                ...input,
                id,
                description: value.toString(),
              })}
              value={input?.description || props.quest.description}
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
                  checked={input?.type === 'QUIZ' || props.quest.type === 'QUIZ'}
                  id='quiz'
                  inline
                  label='Quiz'
                  name='type'
                  onChange={(): void => {
                    setInput({
                      ...input,
                      id,
                      type: 'QUIZ',
                    });
                  }}
                  required
                  type='radio'
                  value='QUIZ'
                />
                <Form.Check
                  checked={input?.type === 'ROUTE' || props.quest.type === 'ROUTE'}
                  id='route'
                  inline
                  label='Route'
                  name='type'
                  onChange={(): void => {
                    setInput({
                      ...input,
                      id,
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
                id,
                minLevel: Number(value),
              })}
              required
              type='number'
              value={input?.minLevel !== undefined ? Number(input?.minLevel).toString() : props.quest.minLevel.toString()}
            />
            <Form.Group>
              <h2>Route content</h2>
              <div style={{
                borderRadius: '8px',
                boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0px 36px 0px',
                padding: '.5em 0',
              }}>
                <EditorJs
                  data={{
                    blocks: (input?.data?.blocks || props.quest.data?.blocks.concat() || []) as OutputBlockData[],
                    time: input?.data?.time || props.quest.data?.time || undefined,
                    version: input?.data?.version || props.quest.data?.version || undefined,
                  }}
                  onChange={(api: API, editorData?: OutputData) => {
                    if (editorData) {
                      setInput({
                        ...input,
                        id,
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
            <div>
              <Button
                className='m-1'
                onClick={() => saveQuestToApi()}
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
                  : ('Save')}
              </Button>
              <Button
                className='m-1'
                onClick={() => pushLocationBack()}
                variant='outline-danger'
              >
                Cancel
              </Button>
            </div>
          </ContentWrapper>
        );
      }}
      variables={{ id }}
    />
  );
}

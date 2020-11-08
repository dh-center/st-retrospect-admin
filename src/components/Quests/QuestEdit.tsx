import commitMutation from 'relay-commit-mutation-promise';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';
import {
  QuestEditMutation,
  QuestEditMutationResponse,
  UpdateQuestInput
} from './__generated__/QuestEditMutation.graphql';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
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
import EditorJS, { BlockToolConstructable, OutputBlockData, OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Image from '@editorjs/image';
import Delimiter from '@editorjs/delimiter';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import LocationSearch from '../../editorjs-plugins/LocationSearch';

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
  const { id } = useParams();

  const [input, setInput] = useState<UpdateQuestInput | null>(null);
  const [isLoading, setLoadingStatus] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const editorRef = useRef<EditorJS>();
  const editorElementRef = useRef<HTMLDivElement>(null);
  const onEditorChangeCallback = useRef<(data: OutputData) => Promise<void>>();

  useEffect(() => {
    onEditorChangeCallback.current = async (editorData: OutputData) => {
      setInput({
        ...input,
        id,
        data: {
          time: null,
          version: '',
          ...editorData,
        },
      });
    };
  }, [ input ]);

  useEffect(() => {
    if (editorElementRef.current) {
      editorRef.current = new EditorJS({
        holder: editorElementRef.current,
        placeholder: 'Click here to write an awesome route!',
        data: {
          blocks: (input?.data?.blocks || []) as OutputBlockData[],
          time: input?.data?.time || undefined,
          version: input?.data?.version || undefined,
        },
        tools: {
          header: Header,
          list: List,
          image: {
            class: Image,
            config: {
              endpoints: {
                byFile: process.env.REACT_APP_API_ENDPOINT + 'upload/route', // Your backend file uploader endpoint
              },
            },
          },
          delimiter: Delimiter,
          quote: Quote,
          marker: Marker,
          locationInstance: LocationSearch as unknown as BlockToolConstructable,
        },
        async onChange(api): Promise<void> {
          onEditorChangeCallback.current && onEditorChangeCallback.current(await api.saver.save());
        },
      });
    }
  }, []);

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
                  checked={input ? input.type === 'QUIZ' : props.quest.type === 'QUIZ'}
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
                  checked={input ? input.type === 'ROUTE' : props.quest.type === 'ROUTE'}
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
            <Form.Group>
              <h2>Route content</h2>
              <div style={{
                borderRadius: '8px',
                boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0px 36px 0px',
              }}>
                <div
                  ref={editorElementRef}
                />
              </div>
            </Form.Group>
            <div>
              <Button
                className='m-1'
                onClick={() => saveQuestToApi()}
                type='submit'
              >
                {isLoading ? (
                  <Spinner
                    animation='border'
                    aria-hidden='true'
                    as='span'
                    role='status'
                    size='sm'
                  />
                ) : ('Save')}
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

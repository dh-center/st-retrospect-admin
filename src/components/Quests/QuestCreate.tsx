import graphql from 'babel-plugin-relay/macro';
import commitMutation from 'relay-commit-mutation-promise';
import environment from '../../relay-env';
import {
  CreateQuestInput,
  QuestCreateMutation,
  QuestCreateMutationResponse
} from './__generated__/QuestCreateMutation.graphql';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import notifier from 'codex-notifier';
import ContentWrapper from '../ContentWrapper';
import { Form, Spinner } from 'react-bootstrap';
import Input from '../utils/Input';
import Button from 'react-bootstrap/Button';
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
 * Generates input data for creating new quest
 */
export function generateQuestInput(): CreateQuestInput {
  return {
    name: '',
    description: '',
    type: 'QUIZ',
    data: {
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

  const editorRef = useRef<EditorJS>();
  const editorElementRef = useRef<HTMLDivElement>(null);
  const onEditorChangeCallback = useRef<(data: OutputData) => Promise<void>>();

  useEffect(() => {
    onEditorChangeCallback.current = async (editorData: OutputData) => {
      setInput({
        ...input,
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
          blocks: (input.data?.blocks || []) as OutputBlockData[],
          time: input.data?.time || undefined,
          version: input.data?.version || undefined,
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
        <Button
          className='m-1'
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
          ) : 'Create'}
        </Button>
      </Form>
    </ContentWrapper>
  );
}

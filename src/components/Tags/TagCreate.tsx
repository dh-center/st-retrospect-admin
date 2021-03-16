import commitMutation from 'relay-commit-mutation-promise';
import environment from '../../appEnv';
import graphql from 'babel-plugin-relay/macro';
import { CreateTagInput, TagCreateMutation, TagCreateMutationResponse } from './__generated__/TagCreateMutation.graphql';
import React, { FormEvent, ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import notifier from 'codex-notifier';
import handleApiError from '../../utils/handleApiError';
import ContentWrapper from '../ContentWrapper';
import { Form, Spinner } from 'react-bootstrap';
import Input from '../utils/Input';
import Button from 'react-bootstrap/Button';

/**
 * Mutation for creating new tag
 *
 * @param input - input data for creating
 */
function create(input: CreateTagInput): Promise<TagCreateMutationResponse> {
  return commitMutation<TagCreateMutation>(environment, {
    mutation: graphql`
      mutation TagCreateMutation($input: CreateTagInput!) {
        tag {
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
 * Generates input data for creating new tag
 */
function generateTagInput(): CreateTagInput {
  return {
    value: '',
  };
}

/**
 * Component implements tag create
 */
export default function TagCreate(): ReactElement {
  const [input, setInput] = useState<CreateTagInput>(generateTagInput);
  const [isLoading, setLoadingStatus] = useState(false);
  const history = useHistory();

  /**
   * Saves created tag to API
   *
   * @param e - form submit event
   */
  const saveTagToApi = async (e: FormEvent): Promise<void> => {
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
      history.push('/tags');
    } catch (error) {
      setLoadingStatus(false);
      handleApiError(error);
    }
  };

  return (
    <ContentWrapper>
      <Form onSubmit={saveTagToApi}>
        <Input
          label='Value'
          onChange={value => setInput({
            ...input,
            value: value,
          })}
          required
          value={input.value}
        />
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

import React, { FormEvent, useState } from 'react';
import commitMutation from 'relay-commit-mutation-promise';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';
import {
  CreateRelationTypeInput,
  RelationTypeCreateMutation,
  RelationTypeCreateMutationResponse
} from './__generated__/RelationTypeCreateMutation.graphql';
import { useHistory } from 'react-router-dom';
import notifier from 'codex-notifier';
import ContentWrapper from '../ContentWrapper';
import { Form, Spinner } from 'react-bootstrap';
import Input from '../utils/Input';
import Button from 'react-bootstrap/Button';
import { LabeledArrayOfInputs } from '../utils/ArrayOfInputs';

/**
 * Generates input data for creating new relation type
 */
function generateRelationTypeInput(): CreateRelationTypeInput {
  return {
    name: '',
    synonyms: [],
  };
}

/**
 * Mutation for creating new relation type
 *
 * @param input - input data for creating
 */
function create(input: CreateRelationTypeInput): Promise<RelationTypeCreateMutationResponse> {
  return commitMutation<RelationTypeCreateMutation>(environment, {
    mutation: graphql`
      mutation RelationTypeCreateMutation($input: CreateRelationTypeInput!) {
        relationType {
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
 * Component implements relation type create
 */
export default function RelationTypeCreate(): React.ReactElement {
  const [input, setInput] = useState<CreateRelationTypeInput>(generateRelationTypeInput);
  const [isLoading, setLoadingStatus] = useState(false);
  const history = useHistory();

  /**
   * Saves created relation type to API
   *
   * @param e - form submit event
   */
  const saveRelationTypeToApi = async (e: FormEvent): Promise<void> => {
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
      history.push('/relation-types');
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
      <Form onSubmit={saveRelationTypeToApi}>
        <Input
          label='Name'
          onChange={value => setInput({
            ...input,
            name: value,
          })}
          required
          value={input.name}
        />
        <LabeledArrayOfInputs
          addButtonText='Add synonym...'
          label='Synonyms'
          onChange={value => setInput({
            ...input,
            synonyms: value,
          })}
          removeButtonText='Remove synonym'
          value={input.synonyms || []}
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

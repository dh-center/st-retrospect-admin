import React, { FormEvent, ReactElement, useState } from 'react';
import commitMutation from 'relay-commit-mutation-promise';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';
import {
  CreateRelationInput,
  RelationCreateMutation,
  RelationCreateMutationResponse
} from './__generated__/RelationCreateMutation.graphql';
import { useHistory } from 'react-router-dom';
import ContentWrapper from '../ContentWrapper';
import { Form, Spinner } from 'react-bootstrap';
import notifier from 'codex-notifier';
import Button from 'react-bootstrap/Button';
import LabeledPersonsCustomSelect from '../CustomSelects/LabeledPersonsCustomSelect';
import LabeledRelationTypesCustomSelect from '../CustomSelects/LabeledRelationTypesCustomSelect';
import LabeledLocationInstancesCustomSelect from '../CustomSelects/LabeledLocationInstancesCustomSelect';

/**
 * Generates input data for creating new relation
 */
function generateRelationInput(): CreateRelationInput {
  return {
    personId: '',
    relationId: '',
    locationInstanceId: '',
    quote: '',
  };
}

/**
 * Mutation for creating new relation
 *
 * @param input - input data for creating
 */
function create(input: CreateRelationInput): Promise<RelationCreateMutationResponse> {
  return commitMutation<RelationCreateMutation>(environment, {
    mutation: graphql`
      mutation RelationCreateMutation($input: CreateRelationInput!) {
        relation {
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
 * Displays component for creating relations
 */
export default function RelationCreate(): ReactElement {
  const [input, setInput] = useState<CreateRelationInput>(generateRelationInput());
  const [isLoading, setLoadingStatus] = useState(false);
  const history = useHistory();

  /**
   * Saves new relation to api
   *
   * @param e - form submit event
   */
  const saveRelationToApi = async (e: FormEvent): Promise<void> => {
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
      history.push('/relations');
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
      <Form onSubmit={saveRelationToApi}>
        <LabeledPersonsCustomSelect
          label='Person'
          onChange={(selected) => {
            setInput({
              ...input,
              personId: selected,
            });
          }}
        />
        <LabeledRelationTypesCustomSelect
          label='Relation type'
          onChange={(selected) => {
            setInput({
              ...input,
              relationId: selected,
            });
          }}
        />
        <LabeledLocationInstancesCustomSelect
          label='Location instance'
          onChange={(selected) => {
            setInput({
              ...input,
              locationInstanceId: selected,
            });
          }}
        />
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

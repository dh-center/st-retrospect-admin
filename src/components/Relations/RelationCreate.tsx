import { FormEvent, ReactElement, useState } from 'react';
import commitMutation from 'relay-commit-mutation-promise';
import environment from '../../appEnv';
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
import { LabeledPersonsCustomSelect } from '../CustomSelects/PersonsCustomSelect';
import { LabeledRelationTypesCustomSelect } from '../CustomSelects/RelationTypesCustomSelect';
import { LabeledLocationInstancesCustomSelect } from '../CustomSelects/LocationInstancesCustomSelect';
import Textarea from '../utils/Textarea';
import Input from '../utils/Input';
import handleApiError from '../../utils/handleApiError';

/**
 * Generates input data for creating new relation
 */
function generateRelationInput(): CreateRelationInput {
  return {
    personId: '',
    relationId: '',
    locationInstanceId: '',
    quote: '',
    link: '',
    startDate: '',
    endDate: '',
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
    } catch (error) {
      setLoadingStatus(false);
      handleApiError(error);
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
        <Input
          label='Start date'
          onChange={(value) => {
            setInput({
              ...input,
              startDate: value,
            });
          }}
          value={input.startDate}
        />
        <Input
          label='End date'
          onChange={(value) => {
            setInput({
              ...input,
              endDate: value,
            });
          }}
          value={input.endDate}
        />
        <Textarea
          label='Description'
          onChange={(value) => {
            setInput({
              ...input,
              quote: value,
            });
          }}
          value={input.quote}
        />
        <Input
          label='Link'
          onChange={(value) => {
            setInput({
              ...input,
              link: value,
            });
          }}
          value={input.link}
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

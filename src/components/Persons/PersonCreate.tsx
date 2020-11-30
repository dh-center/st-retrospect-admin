import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import notifier from 'codex-notifier';
import ContentWrapper from '../ContentWrapper';
import Button from 'react-bootstrap/Button';
import { Form, Spinner } from 'react-bootstrap';
import commitMutation from 'relay-commit-mutation-promise';
import environment from '../../relay-env';
import {
  CreatePersonInput,
  PersonCreateMutation,
  PersonCreateMutationResponse
} from './__generated__/PersonCreateMutation.graphql';
import graphql from 'babel-plugin-relay/macro';
import Input from '../utils/Input';
import Textarea from '../utils/Textarea';
import { LabeledArrayOfInputs } from '../utils/ArrayOfInputs';

/**
 * Generates input data for creating new person
 */
function generatePersonInput(): CreatePersonInput {
  return {
    firstName: '',
    lastName: '',
    patronymic: '',
    pseudonym: '',
    professions: [],
    description: '',
    birthDate: '',
    deathDate: '',
    wikiLink: '',
  };
}

/**
 * Mutation for creating new person
 *
 * @param input - input data for creating
 */
function create(input: CreatePersonInput): Promise<PersonCreateMutationResponse> {
  return commitMutation<PersonCreateMutation>(environment, {
    mutation: graphql`
      mutation PersonCreateMutation($input: CreatePersonInput!) {
        person {
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
 * Component implements person create
 */
export default function PersonCreate(): React.ReactElement {
  const [input, setInput] = useState<CreatePersonInput>(generatePersonInput);
  const [isLoading, setLoadingStatus] = useState(false);
  const history = useHistory();

  /**
   * Saves created person to API
   *
   * @param e - form submit event
   */
  const savePersonToApi = async (e: FormEvent): Promise<void> => {
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
      history.push('/persons');
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
      <Form onSubmit={savePersonToApi}>
        <Input
          label='Last name'
          onChange={value => setInput({
            ...input,
            lastName: value,
          })}
          required
          value={input.lastName || ''}
        />
        <Input
          label='First name'
          onChange={value => setInput({
            ...input,
            firstName: value,
          })}
          required
          value={input.firstName || ''}
        />
        <Input
          label='Patronymic'
          onChange={value => setInput({
            ...input,
            patronymic: value,
          })}
          value={input.patronymic || ''}
        />
        <Input
          label='Pseudonym'
          onChange={value => setInput({
            ...input,
            pseudonym: value,
          })}
          value={input.pseudonym || ''}
        />
        <LabeledArrayOfInputs
          addButtonText='Add profession...'
          label='Professions'
          onChange={value => setInput({
            ...input,
            professions: value,
          })}
          removeButtonText='Remove profession'
          value={input.professions || []}
        />
        <Textarea
          label='Description'
          onChange={value => setInput({
            ...input,
            description: value,
          })}
          value={input.description || ''}
        />
        <Input
          label='Birth date'
          onChange={value => setInput({
            ...input,
            birthDate: value,
          })}
          value={input.birthDate || ''}
        />
        <Input
          label='Death date'
          onChange={value => setInput({
            ...input,
            deathDate: value,
          })}
          value={input.deathDate || ''}
        />
        <Input
          label='Wiki link'
          onChange={value => setInput({
            ...input,
            wikiLink: value,
          })}
          value={input.wikiLink || ''}
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

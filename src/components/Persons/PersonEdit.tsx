import React, { FormEvent, ReactElement, useState } from 'react';
import { useParams } from 'react-router';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { QueryRenderer } from 'react-relay';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';
import { Button, Form, Spinner } from 'react-bootstrap';
import { PersonEditQuery } from './__generated__/PersonEditQuery.graphql';
import notifier from 'codex-notifier';
import ContentWrapper from '../ContentWrapper';
import commitMutation from 'relay-commit-mutation-promise';
import {
  PersonEditUpdateMutation,
  PersonEditUpdateMutationResponse, UpdatePersonInput
} from './__generated__/PersonEditUpdateMutation.graphql';
import Input from '../utils/Input';
import Textarea from '../utils/Textarea';
import LoadingPlaceholder from '../utils/LoadingPlaceholder';

/**
 * Executes update mutation for person
 *
 * @param input - updated person object
 */
export function update(input: UpdatePersonInput): Promise<PersonEditUpdateMutationResponse> {
  return commitMutation<PersonEditUpdateMutation>(environment, {
    mutation: graphql`
      mutation PersonEditUpdateMutation($input: UpdatePersonInput!) {
        person {
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
 * Page with form for person editing
 */
export default function PersonEdit(): ReactElement {
  const { id } = useParams();

  const [input, setInput] = useState<UpdatePersonInput | null>(null);
  const [isLoading, setLoadingStatus] = useState(false);

  const history = useHistory();
  const location = useLocation();

  /**
   * Push location back to entity view page
   */
  const pushLocationBack = (): void => {
    const entityListPath = location.pathname.replace('/edit', '');

    history.push(entityListPath);
  };

  /**
   * Saves updated person to API
   *
   * @param e - submit form event
   */
  const updatePerson = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (!input) {
      notifier.show({
        message: 'Please make changes in person',
        style: 'error',
        time: 5000,
      });

      return;
    }

    setLoadingStatus(true);
    if ('id' in input) {
      try {
        await update(input);
        notifier.show({
          message: 'Successfully updated',
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
    }
  };

  return (
    <QueryRenderer<PersonEditQuery>
      environment={environment}
      query={graphql`
        query PersonEditQuery($id: GlobalId!) {
          person(id: $id) {
            id
            lastName
            firstName
            patronymic
            pseudonym
            profession
            description
            birthDate
            deathDate
            wikiLink
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          return <div>Error</div>;
        }

        if (!props) {
          return <LoadingPlaceholder
            alt='Loading person...'
          />;
        }

        if (!props.person) {
          notifier.show({
            message: `Person with id "${id}" wasn't found`,
            style: 'error',
            time: 5000,
          });

          return <Redirect to='/persons'/>;
        }

        return (
          <ContentWrapper>
            <Form onSubmit={updatePerson}>
              <Input
                label='Last name'
                onChange={value => setInput({
                  ...input,
                  id,
                  lastName: value,
                })}
                required
                value={input?.lastName || props.person.lastName}
              />
              <Input
                label='First name'
                onChange={value => setInput({
                  ...input,
                  id,
                  firstName: value,
                })}
                required
                value={input?.firstName || props.person.firstName}
              />
              <Input
                label='Patronymic'
                onChange={value => setInput({
                  ...input,
                  id,
                  patronymic: value,
                })}
                value={input?.patronymic || props.person.patronymic}
              />
              <Input
                label='Pseudonym'
                onChange={value => setInput({
                  ...input,
                  id,
                  pseudonym: value,
                })}
                value={input?.pseudonym || props.person.pseudonym}
              />
              <Input
                label='Profession'
                onChange={value => setInput({
                  ...input,
                  id,
                  profession: value,
                })}
                value={input?.profession || props.person.profession}
              />
              <Textarea
                label='Description'
                onChange={value => setInput({
                  ...input,
                  id,
                  description: value,
                })}
                value={input?.description || props.person.description}
              />
              <Input
                label='Birth date'
                onChange={value => setInput({
                  ...input,
                  id,
                  birthDate: value,
                })}
                value={input?.birthDate || props.person.birthDate}
              />
              <Input
                label='Death date'
                onChange={value => setInput({
                  ...input,
                  id,
                  deathDate: value,
                })}
                value={input?.deathDate || props.person.deathDate}
              />
              <Input
                label='Wiki link'
                onChange={value => setInput({
                  ...input,
                  id,
                  wikiLink: value,
                })}
                value={input?.wikiLink || props.person.wikiLink}
              />
              <div>
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
            </Form>
          </ContentWrapper>
        );
      }}
      variables={{ id }}
    />
  );
}

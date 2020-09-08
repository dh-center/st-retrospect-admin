import React, { ChangeEvent, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { DefaultInfoComponentProps } from '../../types/entities';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { PersonInfo_person } from './__generated__/PersonInfo_person.graphql';
import environment from '../../relay-env';
import {
  PersonInfoUpdateMutation,
  PersonInfoUpdateMutationResponse,
  UpdatePersonInput
} from './__generated__/PersonInfoUpdateMutation.graphql';
import commitMutation from 'relay-commit-mutation-promise';

/**
 * Props for PersonInfo rendering
 */
interface Props extends DefaultInfoComponentProps<UpdatePersonInput>{
  /**
   * Data about person
   */
  person: PersonInfo_person;
}

/**
 * Component of quest fields
 *
 * @param props - props of component
 */
function PersonInfo(props: Props): React.ReactElement {
  const onChange = props.onChange || ((e: PersonInfo_person): void => { /* do nothing */ });

  const [personCopy, setPersonCopy] = useState(props.person);

  useEffect(() => {
    setPersonCopy(props.person);
  }, [ props.person ]);

  useEffect(() => {
    onChange(personCopy);
  }, [ personCopy ]);

  const person = personCopy || props.person;

  return (
    <div>
      <Form.Group>
        <Form.Label htmlFor='lastName'>Last name</Form.Label>
        <Form.Control
          disabled={props.viewOnly}
          id='lastName'
          name='lastName'
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            setPersonCopy({
              ...person,
              lastName: e.target.value,
            });
          }}
          required
          type='text'
          value={person.lastName || ''}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='firstName'>First name</Form.Label>
        <Form.Control
          disabled={props.viewOnly}
          id='firstName'
          name='firstName'
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            setPersonCopy({
              ...person,
              firstName: e.target.value,
            });
          }}
          required
          type='text'
          value={person.firstName || ''}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='patronymic'>Patronymic</Form.Label>
        <Form.Control
          disabled={props.viewOnly}
          id='patronymic'
          name='patronymic'
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            setPersonCopy({
              ...person,
              patronymic: e.target.value,
            });
          }}
          type='text'
          value={person.patronymic || ''}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='pseudonym'>Pseudonym</Form.Label>
        <Form.Control
          disabled={props.viewOnly}
          id='pseudonym'
          name='pseudonym'
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            setPersonCopy({
              ...person,
              pseudonym: e.target.value,
            });
          }}
          type='text'
          value={person.pseudonym || ''}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='profession'>Profession</Form.Label>
        <Form.Control
          disabled={props.viewOnly}
          id='profession'
          name='profession'
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            setPersonCopy({
              ...person,
              profession: e.target.value,
            });
          }}
          type='text'
          value={person.profession || ''}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='description'>Description</Form.Label>
        <Form.Control
          as='textarea'
          disabled={props.viewOnly}
          id='description'
          name='description'
          onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => {
            setPersonCopy({
              ...person,
              description: e.target.value,
            });
          }}
          rows={15}
          value={person.description || ''}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='birthDate'>Birth date</Form.Label>
        <Form.Control
          disabled={props.viewOnly}
          id='birthDate'
          name='birthDate'
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            setPersonCopy({
              ...person,
              birthDate: e.target.value,
            });
          }}
          type='text'
          value={person.birthDate || ''}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='deathDate'>Death date</Form.Label>
        <Form.Control
          disabled={props.viewOnly}
          id='deathDate'
          name='deathDate'
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            setPersonCopy({
              ...person,
              deathDate: e.target.value,
            });
          }}
          type='text'
          value={person.deathDate || ''}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='wikiLink'>Wiki link</Form.Label>
        <Form.Control
          disabled={props.viewOnly}
          id='wikiLink'
          name='wikiLink'
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            setPersonCopy({
              ...person,
              wikiLink: e.target.value,
            });
          }}
          type='text'
          value={person.wikiLink || ''}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='photo'>Photo</Form.Label>
        <Form.File
          disabled
          id='photo'
          name='photo'
          type='text'
        />
      </Form.Group>
    </div>
  );
}

export default createFragmentContainer(
  PersonInfo,
  {
    person: graphql`
      fragment PersonInfo_person on Person {
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
    `,
  }
);

/**
 * Executes update mutation for person
 *
 * @param input - updated person object
 */
export async function updateInfo(input: UpdatePersonInput): Promise<PersonInfoUpdateMutationResponse> {
  const response = await commitMutation<PersonInfoUpdateMutation>(environment, {
    mutation: graphql`
      mutation PersonInfoUpdateMutation($input: UpdatePersonInput!) {
        person {
          update(input: $input) {
            recordId
          }
        }
      }
    `,
    variables: { input },
  });

  return response;
}

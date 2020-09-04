import React, { ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';
import { DefaultInfoComponentProps } from '../../types/entities';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { PersonInfo_person } from './__generated__/PersonInfo_person.graphql';

/**
 * Props for PersonInfo rendering
 */
interface Props extends DefaultInfoComponentProps<PersonInfo_person>{
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

  return (
    <div>
      <Form.Group>
        <Form.Label htmlFor='lastName'>Last name</Form.Label>
        <Form.Control
          disabled={props.viewOnly}
          id='lastName'
          name='lastName'
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            onChange({
              ...props.person,
              lastName: e.target.value,
            });
          }}
          required
          type='text'
          value={props.person.lastName || ''}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='firstName'>First name</Form.Label>
        <Form.Control
          disabled={props.viewOnly}
          id='firstName'
          name='firstName'
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            onChange({
              ...props.person,
              firstName: e.target.value,
            });
          }}
          required
          type='text'
          value={props.person.firstName || ''}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='patronymic'>Patronymic</Form.Label>
        <Form.Control
          disabled={props.viewOnly}
          id='patronymic'
          name='patronymic'
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            onChange({
              ...props.person,
              patronymic: e.target.value,
            });
          }}
          type='text'
          value={props.person.patronymic || ''}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='pseudonym'>Pseudonym</Form.Label>
        <Form.Control
          disabled={props.viewOnly}
          id='pseudonym'
          name='pseudonym'
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            onChange({
              ...props.person,
              pseudonym: e.target.value,
            });
          }}
          type='text'
          value={props.person.pseudonym || ''}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='profession'>Profession</Form.Label>
        <Form.Control
          disabled={props.viewOnly}
          id='profession'
          name='profession'
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            onChange({
              ...props.person,
              profession: e.target.value,
            });
          }}
          type='text'
          value={props.person.profession || ''}
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
            onChange({
              ...props.person,
              description: e.target.value,
            });
          }}
          rows={15}
          value={props.person.description || ''}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='birthDate'>Birth date</Form.Label>
        <Form.Control
          disabled={props.viewOnly}
          id='birthDate'
          name='birthDate'
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            onChange({
              ...props.person,
              birthDate: e.target.value,
            });
          }}
          type='text'
          value={props.person.birthDate || ''}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='deathDate'>Death date</Form.Label>
        <Form.Control
          disabled={props.viewOnly}
          id='deathDate'
          name='deathDate'
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            onChange({
              ...props.person,
              deathDate: e.target.value,
            });
          }}
          type='text'
          value={props.person.deathDate || ''}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='wikiLink'>Wiki link</Form.Label>
        <Form.Control
          disabled={props.viewOnly}
          id='wikiLink'
          name='wikiLink'
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            onChange({
              ...props.person,
              wikiLink: e.target.value,
            });
          }}
          type='text'
          value={props.person.wikiLink || ''}
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
      fragment PersonInfo_person on Person @relay(mask: false) {
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

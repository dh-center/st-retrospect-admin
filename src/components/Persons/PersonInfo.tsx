import React, { ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';
import { EntityInfoComponentProps, OmitId, Person } from '../../types/entities';

/**
 * Generates empty person
 */
export function generatePerson(): OmitId<Person> {
  return {
    description: '',
    lastName: '',
    patronymic: '',
    firstName: '',
    profession: '',
    pseudonym: '',
    birthDate: '',
    deathDate: '',
    wikiLink: '',
  };
}

/**
 * Component of quest fields
 *
 * @param props - props of component
 */
export default function PersonInfo(props: EntityInfoComponentProps<OmitId<Person>>): React.ReactElement {
  const onChange = props.onChange || ((e: OmitId<Person>): void => { /* do nothing */ });

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
              ...props.entity,
              lastName: e.target.value,
            });
          }}
          required
          type='text'
          value={props.entity.lastName || ''}
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
              ...props.entity,
              firstName: e.target.value,
            });
          }}
          required
          type='text'
          value={props.entity.firstName || ''}
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
              ...props.entity,
              patronymic: e.target.value,
            });
          }}
          type='text'
          value={props.entity.patronymic || ''}
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
              ...props.entity,
              pseudonym: e.target.value,
            });
          }}
          type='text'
          value={props.entity.pseudonym || ''}
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
              ...props.entity,
              profession: e.target.value,
            });
          }}
          type='text'
          value={props.entity.profession || ''}
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
              ...props.entity,
              description: e.target.value,
            });
          }}
          rows={15}
          value={props.entity.description || ''}
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
              ...props.entity,
              birthDate: e.target.value,
            });
          }}
          type='text'
          value={props.entity.birthDate || ''}
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
              ...props.entity,
              deathDate: e.target.value,
            });
          }}
          type='text'
          value={props.entity.deathDate || ''}
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
              ...props.entity,
              wikiLink: e.target.value,
            });
          }}
          type='text'
          value={props.entity.wikiLink || ''}
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

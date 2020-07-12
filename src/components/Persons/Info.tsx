import React, { ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';
import { EntityInfoComponentProps, OmitId, Person } from '../../types/entities';

/**
 * Component of quest fields
 *
 * @param props - props of component
 */
export default function PersonInfo(props: EntityInfoComponentProps<OmitId<Person>>): React.ReactElement {
  const onChange = props.onChange || ((e: OmitId<Person>): void => {});

  return (
    <div>
      <Form.Group>
        <Form.Label htmlFor={'lastName'}>Last name</Form.Label>
        <Form.Control
          type="text"
          id={'lastName'}
          name={'lastName'}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            onChange({
              ...props.entity,
              lastName: e.target.value,
            });
          }}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor={'firstName'}>First name</Form.Label>
        <Form.Control
          type="text"
          id={'firstName'}
          name={'firstName'}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            onChange({
              ...props.entity,
              firstName: e.target.value,
            });
          }}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor={'patronymic'}>Patronymic</Form.Label>
        <Form.Control
          type="text"
          id={'patronymic'}
          name={'patronymic'}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            onChange({
              ...props.entity,
              patronymic: e.target.value,
            });
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor={'pseudonym'}>Pseudonym</Form.Label>
        <Form.Control
          type="text"
          id={'pseudonym'}
          name={'pseudonym'}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            onChange({
              ...props.entity,
              pseudonym: e.target.value,
            });
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor={'profession'}>Profession</Form.Label>
        <Form.Control
          type="text"
          id={'profession'}
          name={'profession'}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            onChange({
              ...props.entity,
              profession: e.target.value,
            });
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor={'description'}>Description</Form.Label>
        <Form.Control
          id={'description'}
          as='textarea'
          rows={15}
          name={'description'}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => {
            onChange({
              ...props.entity,
              description: e.target.value,
            });
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor={'birthDate'}>Birth date</Form.Label>
        <Form.Control
          type="text"
          id={'birthDate'}
          name={'birthDate'}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            onChange({
              ...props.entity,
              birthDate: e.target.value,
            });
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor={'deathDate'}>Death date</Form.Label>
        <Form.Control
          type="text"
          id={'deathDate'}
          name={'deathDate'}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            onChange({
              ...props.entity,
              deathDate: e.target.value,
            });
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor={'wikiLink'}>Wiki link</Form.Label>
        <Form.Control
          type="text"
          id={'wikiLink'}
          name={'wikiLink'}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            onChange({
              ...props.entity,
              wikiLink: e.target.value,
            });
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor={'photo'}>Photo</Form.Label>
        <Form.File
          id={'photo'}
          type="text"
          name={'photo'}
          disabled
        />
      </Form.Group>
    </div>
  );
}

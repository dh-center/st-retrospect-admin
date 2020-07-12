import React, { ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';
import { EntityInfoComponentProps, Person } from '../../types/entities';

/**
 * Component of quest fields
 *
 * @param props - props of component
 */
export default function PersonInfo(props: EntityInfoComponentProps<Person>): React.ReactElement {
  return (
    <div>
      <Form.Group>
        <Form.Label htmlFor={'lastName'}>Last name</Form.Label>
        <Form.Control
          type="text"
          id={'lastName'}
          name={'lastName'}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            props.onChange && props.onChange(e);
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
            props.onChange && props.onChange(e);
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
            props.onChange && props.onChange(e);
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
            props.onChange && props.onChange(e);
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
            props.onChange && props.onChange(e);
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
            props.onChange && props.onChange(e);
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
            props.onChange && props.onChange(e);
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
            props.onChange && props.onChange(e);
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
            props.onChange && props.onChange(e);
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

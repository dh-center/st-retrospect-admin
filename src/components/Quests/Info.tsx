import React, { ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';

/**
 * Props of component
 */
interface Props {
  /**
   * Handler for changing input fields
   *
   * @param e - change event
   */
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

/**
 * Component of quest fields
 *
 * @param props - props of component
 */
export default function QuestInfo(props: Props): React.ReactElement {
  return (
    <Form>
      <Form.Group>
        <Form.Label htmlFor={'name'}>Name</Form.Label>
        <Form.Control
          type="text"
          id={'name'}
          name={'name'}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            props.onChange(e);
          }}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor={'description'}>Description</Form.Label>
        <Form.Control
          id={'description'}
          as='textarea'
          name={'description'}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => {
            props.onChange(e);
          }}
          required
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
      <Form.Group>
        <Form.Label htmlFor="">Type:</Form.Label>
        <Form.Check
          type="radio"
          name={'type'}
          value={'QUIZ'}
          label='Quiz'
          id={'quiz'}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            props.onChange(e);
          }}
          required
        />
        <Form.Check
          type="radio"
          name={'type'}
          value={'ROUTE'}
          label='Route'
          id={'route'}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            props.onChange(e);
          }}
          required
        />
      </Form.Group>
    </Form>
  );
}

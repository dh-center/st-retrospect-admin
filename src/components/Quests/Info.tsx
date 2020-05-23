import React, { ChangeEvent, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Image from '@editorjs/image';
import Delimiter from '@editorjs/delimiter';
import Marker from '@editorjs/marker';
import Quote from '@editorjs/quote';

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
  const editorRef = useRef<EditorJS>();
  const editorElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorElementRef.current) {
      editorRef.current = new EditorJS({
        holder: editorElementRef.current,
        placeholder: 'Click here to write an awesome route!',
        tools: {
          header: Header,
          list: List,
          image: Image,
          delimiter: Delimiter,
          quote: Quote,
          marker: Marker,
        },
      });
    }
  }, []);

  return (
    <div>
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
          rows={15}
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
        <Form.Label htmlFor="">Type</Form.Label>
        <div>
          <Form.Check
            inline
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
            inline
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
        </div>
      </Form.Group>
      <Form.Group>
        <h2>Route content</h2>
        <div style={{
          borderRadius: '8px',
          boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0px 36px 0px',
        }}>
          <div
            ref={editorElementRef}
          />
        </div>
      </Form.Group>
    </div>
  );
}

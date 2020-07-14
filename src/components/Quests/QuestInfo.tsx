import React, { ChangeEvent, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Image from '@editorjs/image';
import Delimiter from '@editorjs/delimiter';
import Marker from '@editorjs/marker';
import Quote from '@editorjs/quote';
import { EntityInfoComponentProps, OmitId, Quest } from '../../types/entities';

/**
 * Generates empty quest
 */
export function generateQuest(): OmitId<Quest> {
  return {
    name: '',
    description: '',
    type: 'QUIZ',
  };
}

/**
 * Component of quest fields
 *
 * @param props - props of component
 */
export default function QuestInfo(props: EntityInfoComponentProps<OmitId<Quest>>): React.ReactElement {
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
          image: {
            class: Image,
            config: {
              endpoints: {
                byFile: process.env.REACT_APP_API_ENDPOINT + 'upload/route', // Your backend file uploader endpoint
              },
            },
          },
          delimiter: Delimiter,
          quote: Quote,
          marker: Marker,
        },
      });
    }
  }, []);

  const onChange = props.onChange || ((e: OmitId<Quest>): void => { /* do nothing */ });

  return (
    <div>
      <Form.Group>
        <Form.Label htmlFor={'name'}>Name</Form.Label>
        <Form.Control
          type="text"
          id={'name'}
          name={'name'}
          value={props.entity.name}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            onChange({
              ...props.entity,
              name: e.target.value,
            });
          }}
          required
          disabled={props.viewOnly}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor={'description'}>Description</Form.Label>
        <Form.Control
          disabled={props.viewOnly}
          id={'description'}
          as='textarea'
          rows={15}
          value={props.entity.description || ''}
          name={'description'}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => {
            onChange({
              ...props.entity,
              description: e.target.value,
            });
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
            checked={props.entity.type === 'QUIZ'}
            onChange={(e: ChangeEvent<HTMLInputElement>): void => {
              onChange({
                ...props.entity,
                type: 'QUIZ',
              });
            }}
            required
            disabled={props.viewOnly}
          />
          <Form.Check
            inline
            type="radio"
            name={'type'}
            value={'ROUTE'}
            label='Route'
            checked={props.entity.type === 'ROUTE'}
            id={'route'}
            onChange={(e: ChangeEvent<HTMLInputElement>): void => {
              onChange({
                ...props.entity,
                type: 'ROUTE',
              });
            }}
            required
            disabled={props.viewOnly}
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

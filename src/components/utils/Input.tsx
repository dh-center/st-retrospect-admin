import Form from 'react-bootstrap/Form';
import React from 'react';
import useUniqueId from '../../utils/useUniqueId';

interface InputProps<T extends number | string> {
  onChange(value: T): void;
  value: T;
  label: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function Input<T extends number | string>(props: InputProps<T>): React.ReactElement {
  const id = useUniqueId('app-input');

  return (
    <Form.Group>
      {props.label && <Form.Label htmlFor={id`input`}>
        {props.label}
      </Form.Label>}
      <Form.Control
        disabled={props.disabled}
        id={id`input`}
        onChange={(e) => {
          const value = e.target.value;

          props.onChange(value as T);
        }}
        required={props.required}
        type={props.type}
        value={props.value}
      />
    </Form.Group>
  );
}

Input.defaultProps = {
  disabled: false,
  required: false,
  type: 'text',
};

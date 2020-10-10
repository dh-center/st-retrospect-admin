import Form from 'react-bootstrap/Form';
import React from 'react';
import useUniqueId from '../../utils/useUniqueId';
import styles from './Input.module.css';

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
    <Form.Group className={styles.container}>
      {props.label && <Form.Label className={styles.label} htmlFor={id`input`}>
        {props.label}:
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

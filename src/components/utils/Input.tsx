import Form from 'react-bootstrap/Form';
import React from 'react';
import useUniqueId from '../../utils/useUniqueId';
import styles from './Input.module.css';
import classNames from 'classnames';
import WithClassName from '../../types/withClassName';

interface InputProps<T extends number | string> {
  onChange(value: T): void;
  value: T | null;
  label?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function Input<T extends number | string>(props: InputProps<T> & WithClassName): React.ReactElement {
  const id = useUniqueId('app-input');

  return (
    <Form.Group className={classNames(styles.container, props.className)}>
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
        value={props.value || ''}
      />
    </Form.Group>
  );
}

Input.defaultProps = {
  disabled: false,
  required: false,
  type: 'text',
};

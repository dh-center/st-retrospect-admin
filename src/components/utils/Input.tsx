import Form from 'react-bootstrap/Form';
import React from 'react';
import useUniqueId from '../../utils/useUniqueId';
import styles from './Input.module.css';
import classNames from 'classnames';
import WithClassName from '../../types/withClassName';
import { FormControlProps } from 'react-bootstrap';

/**
 * Input component own props (not from Bootstrap)
 */
interface OwnInputProps<T extends number | string> extends WithClassName {
  /**
   * Handler to call when input value changed
   *
   * @param value - new value
   */
  onChange(value: T): void;

  /**
   * Input value
   */
  value: T | null;

  /**
   * Input label
   */
  label?: string;

  /**
   * Max input value (if type=number)
   */
  max?: number;

  /**
   * Min input value (if type=number)
   */
  min?: number;

  /**
   * Step value (if type=number)
   */
  step?: number;
}

/**
 * Full props type for Input component
 */
type InputProps<T extends string | number> = Omit<FormControlProps, keyof OwnInputProps<T>> & OwnInputProps<T>;

export default function Input<T extends number | string>(props: InputProps<T>): React.ReactElement {
  const id = useUniqueId('app-input');
  const { className, label, ...inputProps } = props;

  return (
    <Form.Group className={classNames(styles.container, className)}>
      {props.label &&
      <Form.Label className={styles.label} htmlFor={id`input`}>
        {label}:
      </Form.Label>
      }
      <Form.Control
        {...inputProps}
        id={id`input`}
        onChange={(e) => {
          const value = e.target.value;

          props.onChange(value as T);
        }}
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

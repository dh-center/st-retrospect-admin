import Form from 'react-bootstrap/Form';
import React from 'react';
import useUniqueId from '../../utils/useUniqueId';
import styles from './Textarea.module.css';

/**
 * Interface of Textarea props
 */
interface TextareaProps<T extends number | string> {
  /**
   * onChange event handler
   *
   * @param value - handled value
   */
  onChange(value: T): void;

  /**
   * Value for displaying
   */
  value: T | null;

  /**
   * Label for displaying
   */
  label: string;

  /**
   * Is field required
   */
  required?: boolean;

  /**
   * Is field disabled
   */
  disabled?: boolean;

  /**
   * Rows in textarea
   */
  rows?: number;
}

/**
 * Displays textarea with label
 *
 * @param props - props for textarea
 */
export default function Textarea<T extends number | string>(props: TextareaProps<T>): React.ReactElement {
  const id = useUniqueId('app-textarea');

  return (
    <Form.Group className={styles.container}>
      {props.label && <Form.Label className={styles.label} htmlFor={id`textarea`}>
        {props.label}:
      </Form.Label>}
      <Form.Control
        as='textarea'
        disabled={props.disabled}
        id={id`textarea`}
        onChange={(e) => {
          const value = e.target.value;

          props.onChange(value as T);
        }}
        required={props.required}
        rows={props.rows}
        value={props.value || ''}
      />
    </Form.Group>
  );
}

Textarea.defaultProps = {
  disabled: false,
  required: false,
  rows: 15,
};

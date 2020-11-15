import React, { ReactElement } from 'react';
import { Button, Form } from 'react-bootstrap';
import withLabel from './LabeledComponent';
import styles from './ArrayOfInputs.module.css';
import { CustomSelectProps } from '../CustomSelects/CustomSelectProps';

/**
 * ArrayOfInputs component props interface
 */
interface ArrayOfCustomSelectsProps {
  /**
   * onChange event handler
   *
   * @param value - value for changing
   */
  onChange(value: (string | null)[]): void;

  /**
   * Custom select component
   */
  CustomSelect: (props: CustomSelectProps) => ReactElement;

  /**
   * Default value
   */
  value: (string | null)[];

  /**
   * Text on adding button
   */
  addButtonText?: string;

  /**
   * Text on removing button
   */
  removeButtonText?: string;

  /**
   * Is component disabled
   */
  disabled?: boolean;
}

/**
 * Displays array of custom selects in one component
 *
 * @param props - props with data for displaying
 */
export default function ArrayOfCustomSelects(props: ArrayOfCustomSelectsProps): ReactElement {
  /**
   * Adds empty element to array
   */
  const addEmptyElement = (): void => {
    const newArray = [...props.value, ''];

    props.onChange(newArray);
  };

  /**
   * Removes element from array
   *
   * @param index - index of element for removing
   */
  const removeElement = (index: number): void => {
    const newArray = [ ...props.value ];

    newArray.splice(index, 1);
    props.onChange(newArray);
  };

  const inputList = props.value.map((dataItem, index) => {
    return (
      <Form.Row className={styles.inputLineItemWrapper} key={index}>
        <props.CustomSelect
          disabled={props.disabled}
          onChange={(value) => {
            const newArray = [ ...props.value ];

            newArray[index] = value;
            props.onChange(newArray);
          }}
          value={dataItem || undefined}
        />
        <Button
          className={styles.removeButton}
          disabled={props.disabled}
          onClick={() => removeElement(index)}
          variant='outline-danger'
        >
          {props.removeButtonText || '-'}
        </Button>
      </Form.Row>
    );
  });

  return (
    <>
      {inputList}
      <Button
        className={styles.addButton}
        disabled={props.disabled}
        onClick={addEmptyElement}
        variant='success'
      >
        {props.addButtonText || '+'}
      </Button>
    </>
  );
}

/**
 * Returns labeled ArrayOfSelects component
 */
export const LabeledArrayOfSelects = withLabel(ArrayOfCustomSelects);

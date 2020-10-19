import React, { ReactElement, useState } from 'react';
import Input from './Input';
import { Button, Form } from 'react-bootstrap';
import withLabel from './LabeledComponent';
import styles from './ArrayOfInputs.module.css';

/**
 * ArrayOfInputs component props interface
 */
interface ArrayOfInputsProps {
  /**
   * onChange event handler
   *
   * @param value - value for changing
   */
  onChange(value: (string | null)[]): void;

  /**
   * Default value
   */
  value?: (string | null)[];
}

/**
 * Displays array of inputs in one component
 *
 * @param props - props with data for displaying
 */
export default function ArrayOfInputs(props: ArrayOfInputsProps): ReactElement {
  const [dataArray, setDataArray] = useState(props.value || []);

  /**
   * Adds empty element to array
   */
  const addEmptyElement = (): void => {
    const newArray = dataArray;

    newArray.push('');
    setDataArray(() => {
      props.onChange(newArray);

      return newArray;
    });
  };

  /**
   * Removes element from array
   *
   * @param index - index of element for removing
   */
  const removeElement = (index: number): void => {
    const newArray = dataArray;

    newArray.splice(index, 1);
    setDataArray(() => {
      props.onChange(newArray);

      return newArray;
    });
  };

  const inputList = dataArray.map((dataItem, index) => {
    return (
      <Form.Row className={styles.inputLineItemWrapper} key={index}>
        <Input
          className={styles.input}
          onChange={(value) => {
            const newArray = dataArray;

            newArray[index] = value;
            setDataArray(() => {
              props.onChange(newArray);

              return newArray;
            });
          }}
          value={dataItem}
        />
        <Button
          className={styles.removeButton}
          onClick={() => removeElement(index)}
          variant='outline-danger'
        >
          Remove synonym
        </Button>
      </Form.Row>
    );
  });

  return (
    <>
      {inputList}
      <Button
        className={styles.addButton}
        onClick={addEmptyElement}
        variant='success'
      >
        Add synonym...
      </Button>
    </>
  );
}

/**
 * Returns labeled ArrayOfInputs component
 */
export const LabeledArrayOfInputs = withLabel(ArrayOfInputs);

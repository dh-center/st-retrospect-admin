import { ReactElement, useState } from 'react';
import Input from './Input';
import { Button, Form } from 'react-bootstrap';
import withLabel from './LabeledComponent';
import styles from './ArrayOfInputs.module.css';
import useUniqueId from '../../utils/useUniqueId';

/**
 * ArrayOfInputs component props interface
 */
interface ArrayOfInputsProps {
  /**
   * onChange event handler
   *
   * @param value - value for changing
   */
  onChange(value: string[]): void;

  /**
   * Default value
   */
  value?: string[];

  /**
   * Text on adding button
   */
  addButtonText?: string;

  /**
   * Text on removing button
   */
  removeButtonText?: string;

  /**
   * Displays radio buttons with inputs
   */
  withRadioButtons?: boolean;

  /**
   * Index of checked value
   */
  checkedValueIndex?: number;

  /**
   * On value check handler
   *
   * @param index - checked value index
   */
  onValueCheck?: (index: number) => void;
}

/**
 * Displays array of inputs in one component
 *
 * @param props - props with data for displaying
 */
export default function ArrayOfInputs(props: ArrayOfInputsProps): ReactElement {
  const [dataArray, setDataArray] = useState(props.value || []);
  const id = useUniqueId('app-array-of-inputs');

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
        { props.withRadioButtons &&
        <Form.Check
          checked={props.checkedValueIndex === index}
          inline
          name={id`array-of-inputs`}
          onChange={(): void => {
            if (props.onValueCheck) {
              props.onValueCheck(index);
            }
          }}
          type='radio'
        />
        }
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
          type='button'
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
        onClick={addEmptyElement}
        type='button'
        variant='success'
      >
        {props.addButtonText || '+'}
      </Button>
    </>
  );
}

/**
 * Returns labeled ArrayOfInputs component
 */
export const LabeledArrayOfInputs = withLabel(ArrayOfInputs);

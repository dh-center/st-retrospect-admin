import React, { ReactElement } from 'react';
import { Button, Form } from 'react-bootstrap';
import withLabel from './LabeledComponent';
import styles from './ArrayOfInputs.module.css';
import PersonsCustomSelect from '../CustomSelects/PersonsCustomSelect';
import LocationInstancesCustomSelect from '../CustomSelects/LocationInstancesCustomSelect';
import RelationTypesCustomSelect from '../CustomSelects/RelationTypesCustomSelect';
import { CustomSelectProps } from '../CustomSelects/CustomSelectProps';

/**
 * Enabled custom selects
 */
export enum CustomSelects {
  PERSONS = 'PERSONS',
  LOCATION_INSTANCES = 'LOCATION_INSTANCES',
  RELATION_TYPES = 'RELATION_TYPES'
}

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
   * Type of custom select
   */
  customSelect: CustomSelects;

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
  let CustomSelect: (props: CustomSelectProps) => ReactElement;

  switch (props.customSelect) {
    case CustomSelects.PERSONS:
      CustomSelect = PersonsCustomSelect;
      break;
    case CustomSelects.LOCATION_INSTANCES:
      CustomSelect = LocationInstancesCustomSelect;
      break;
    default:
      CustomSelect = RelationTypesCustomSelect;
      break;
  }

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
        <CustomSelect
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

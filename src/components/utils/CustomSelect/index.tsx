import React from 'react';
import SelectSearch, { SelectSearchOption } from 'react-select-search';
import './index.css';
import fuzzySearch from '../../../utils/fuzzySearch';

/**
 * Props for custom select component
 */
interface ComponentProps {
  /**
   * Options for displaying
   */
  options: SelectSearchOption[];

  /**
   * Default value
   */
  value?: string;

  /**
   * onChange event handler
   *
   * @param selected - selected value id
   */
  onChange: (selected: string) => void;

  /**
   * Placeholder in input field
   */
  placeholder: string;

  /**
   * Is component disabled
   */
  disabled?: boolean;
}

/**
 * Custom select component
 *
 * @param props - CustomSelect component props
 */
export default function CustomSelect(props: ComponentProps): React.ReactElement {
  const onChange = props.onChange;

  return (
    <SelectSearch
      disabled={props.disabled}
      filterOptions={fuzzySearch}
      onChange={(selected): void => {
        onChange(selected.toString());
      }}
      options={props.options}
      placeholder={props.placeholder}
      search
      value={props.value}
    />
  );
}

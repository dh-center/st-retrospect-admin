import React, { useState } from 'react';
import SelectSearch, { SelectSearchOption } from 'react-select-search';
import './index.css';

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
  value: string | undefined;

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
}

/**
 * Custom select component
 *
 * @param props - CustomSelect component props
 */
export default function CustomSelect(props: ComponentProps): React.ReactElement {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(props.value);
  const onChange = props.onChange;

  return (
    <SelectSearch
      onChange={(selected): void => {
        setSelectedValue(selected.toString());
        onChange(selected.toString());
      }}
      options={props.options}
      placeholder={props.placeholder}
      search
      value={selectedValue}
    />
  );
}

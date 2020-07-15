import React, { useState } from 'react';
import SelectSearch, { SelectedOptionValue, SelectSearchOption } from 'react-select-search';
import './index.css';

interface ComponentProps {
  options: SelectSearchOption[];
}

/**
 * Custom select component
 *
 * @param props - CustomSelect component props
 */
export default function CustomSelect(props: ComponentProps): React.ReactElement {
  const [selectedValue, setSelectedValue] = useState<SelectedOptionValue | SelectedOptionValue[]>();

  return (
    <SelectSearch
      options={props.options}
      placeholder={'Select a location...'}
      onChange={(selected): void => setSelectedValue(selected)}
    />
  );
}

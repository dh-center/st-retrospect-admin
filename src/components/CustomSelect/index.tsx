import React, { useState } from 'react';
import SelectSearch, { SelectedOptionValue, SelectSearchOption } from 'react-select-search';
import './index.css';

interface ComponentProps {
  options: SelectSearchOption[];
  value: string | undefined;
  onChange: (selected: string) => void;
}

/**
 * Custom select component
 *
 * @param props - CustomSelect component props
 */
export default function CustomSelect(props: ComponentProps): React.ReactElement {
  const [selectedValue, setSelectedValue] = useState<SelectedOptionValue | SelectedOptionValue[]>();
  const onChange = props.onChange;

  return (
    <SelectSearch
      options={props.options}
      value={props.value}
      placeholder={'Select a location...'}
      onChange={(selected): void => {
        setSelectedValue(selected);
        onChange(selected.toString());
      }}
      search={true}
    />
  );
}

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-unused-vars-experimental
  const [selectedValue, setSelectedValue] = useState<SelectedOptionValue | SelectedOptionValue[]>();
  const onChange = props.onChange;

  return (
    <SelectSearch
      onChange={(selected): void => {
        setSelectedValue(selected);
        onChange(selected.toString());
      }}
      options={props.options}
      placeholder='Select a location...'
      search
      value={props.value}
    />
  );
}

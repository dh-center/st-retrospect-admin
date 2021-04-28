import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

interface SearchFormProps {
  /**
   * Callback to call when user submits query input
   *
   * @param query - submitted query
   */
  onSubmit(query: string): void

  /**
   * Initial form query
   */
  initialState: string
}

const StyledForm = styled.form`
  display: flex;
  padding: 0 5px;
`;

const SearchLine = styled(Form.Control)`
  margin-right: 5px;
` as typeof Form.Control;

/**
 * Form for input search queries
 *
 * @param props - props for component rendering
 */
export default function SearchForm(props: SearchFormProps): React.ReactElement {
  const [query, setQuery] = useState(props.initialState);

  return (
    <StyledForm
      onSubmit={e => {
        e.preventDefault();
        props.onSubmit(query);
      }}
    >
      <SearchLine onChange={(e) => setQuery(e.target.value)} type='text' value={query}/>
      <Button variant='primary'>Search</Button>
    </StyledForm>
  );
}

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

  /**
   * Suggested text from search engine
   */
  suggest: string | null
}

const StyledForm = styled.form`
  padding: 0 5px;
`;

const SearchLine = styled(Form.Control)`
  margin-right: 5px;
` as typeof Form.Control;

const Suggest = styled.span`
  color: blue;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Row = styled.div`
  display: flex;
`;

/**
 * Form for input search queries
 *
 * @param props - props for component rendering
 */
export default function SearchForm(props: SearchFormProps): React.ReactElement { /* eslint-disable @typescript-eslint/naming-convention */
  const [query, setQuery] = useState(props.initialState);

  return (
    <StyledForm
      onSubmit={e => {
        e.preventDefault();
        props.onSubmit(query);
      }}
    >
      <Row>
        <SearchLine onChange={(e) => setQuery(e.target.value)} type='text' value={query}/>
        <Button variant='primary'>Search</Button>
      </Row>
      {props.suggest &&
      <div>
        Did you mean {' '}
        <Suggest
          dangerouslySetInnerHTML={{ __html: props.suggest }}
          onClick={() => {
            const queryString =props.suggest?.replace(/(<([^>]+)>)/gi, '') || '';

            setQuery(queryString);
            props.onSubmit(queryString);
          }}
        />
      </div>
      }
    </StyledForm>
  );
}

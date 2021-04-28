import React, { useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

interface SearchFormProps {
  /**
   * Callback to call when user submits query input
   *
   * @param query - submitted query
   */
  onSubmit(query: string): void
}

/**
 * Form for input search queries
 *
 * @param props - props for component rendering
 */
export default function SearchForm(props: SearchFormProps): React.ReactElement {
  const [query, setQuery] = useState('');

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        props.onSubmit(query);
      }}
    >
      <Form.Row>
        <Col>
          <Form.Control onChange={(e) => setQuery(e.target.value)} type='text' value={query}/>
        </Col>
        <Col>
          <Button variant='primary'>Search</Button>
        </Col>
      </Form.Row>
    </Form>
  );
}

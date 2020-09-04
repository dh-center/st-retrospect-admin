import React, { useState } from 'react';
import { useParams } from 'react-router';
import { QueryRenderer } from 'react-relay';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';
import PersonInfo from './PersonInfo';
import { Button, Form } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { PersonEditQuery, PersonEditQueryResponse } from './__generated__/PersonEditQuery.graphql';

/**
 * Page with form for person editing
 *
 * @param props
 */
function PersonEdit(props: PersonEditQueryResponse): React.ReactElement {
  const { id } = useParams();

  /**
   * Editable person object in state
   */
  const [editablePerson, setPerson] = useState(props.person);

  const history = useHistory();
  const location = useLocation();

  /**
   * Push location back to entity view page
   */
  const pushLocationBack = (): void => {
    const entityListPath = location.pathname.replace('/edit', '');

    history.push(entityListPath);
  };

  return (
    <QueryRenderer<PersonEditQuery>
      environment={environment}
      query={graphql`
        query PersonEditQuery($id: ID!) {
          person(id: $id) {
            ...PersonInfo_person
          }
        }
      `}
      render={({ error }) => {
        if (error) {
          return <div>Error</div>;
        }

        if (!props) {
          return <div>Loading</div>;
        }

        if (!props.person) {
          return <div>There is no person with provided id</div>;
        }

        return (
          <div className='d-flex justify-content-center' >
            <div
              style={{
                maxWidth: '800px',
                width: '100%',
              }}
            >
              <PersonInfo onChange={(e): void => setPerson(e)} person={props.person}/>
              <Button className='m-1' type='submit'>Save</Button>
              <Button
                className='m-1'
                onClick={(event): void => pushLocationBack()}
                variant='outline-danger'
              >Cancel</Button>
            </div>
          </div>
        );
      }}
      variables={{ id }}
    />
  );
}

export default PersonEdit;

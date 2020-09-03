import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import environment from '../../relay-env';
import { useParams } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { PersonViewQuery } from './__generated__/PersonViewQuery.graphql';
import PersonInfo from './PersonInfo';

function PersonView(): React.ReactElement {
  const { id } = useParams();

  return (
    <QueryRenderer<PersonViewQuery>
      environment={environment}
      query={graphql`
        query PersonViewQuery($id: ID!) {
          person(id: $id) {
            ...PersonInfo_person
          }
        }
      `}
      render={({ error, props }) => {
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
              <PersonInfo person={props.person} viewOnly/>
              <LinkContainer to={`${id}/edit`}>
                <Button className='m-1' variant='outline-warning'>Edit</Button>
              </LinkContainer>
            </div>
          </div>
        );
      }}
      variables={{ id }}
    />
  );
}

export default PersonView;

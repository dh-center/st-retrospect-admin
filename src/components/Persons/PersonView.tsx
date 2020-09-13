import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import environment from '../../relay-env';
import { useParams } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { PersonViewQuery } from './__generated__/PersonViewQuery.graphql';
import PersonInfo from './PersonInfo';
import notifier from 'codex-notifier';
import { Redirect } from 'react-router-dom';
import ContentWrapper from '../ContentWrapper';

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
          notifier.show({
            message: `Person with id "${id}" wasn't found`,
            style: 'error',
            time: 5000,
          });

          return <Redirect to='/persons'/>;
        }

        return (
          <ContentWrapper>
            <PersonInfo person={props.person} viewOnly/>
            <LinkContainer to={`${id}/edit`}>
              <Button className='m-1' variant='outline-warning'>Edit</Button>
            </LinkContainer>
          </ContentWrapper>
        );
      }}
      variables={{ id }}
    />
  );
}

export default PersonView;

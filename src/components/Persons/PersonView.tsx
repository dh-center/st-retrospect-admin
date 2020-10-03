import React, { useState } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import environment from '../../relay-env';
import { useParams } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Spinner } from 'react-bootstrap';
import { PersonViewQuery } from './__generated__/PersonViewQuery.graphql';
import PersonInfo, { deleteInfo } from './PersonInfo';
import notifier from 'codex-notifier';
import { Redirect, useHistory, useLocation } from 'react-router-dom';

function PersonView(): React.ReactElement {
  const { id } = useParams();
  const [isDeleting, setDeletingStatus] = useState(false);

  const history = useHistory();
  const location = useLocation();

  /**
   * Push location back to persons page
   */
  const pushToPersonsPage = (): void => {
    const entityListPath = location.pathname.replace(`/${id}`, '');

    history.push(entityListPath);
  };

  /**
   * Creates notifier window and executes delete mutation for current person
   */
  const deletePerson = async (): Promise<void> => {
    notifier.show({
      message: 'Are you sure you want to delete this person?',
      type: 'confirm',
      style: 'error',
      okText: 'Yes',
      okHandler: async () => {
        setDeletingStatus(true);
        try {
          await deleteInfo(id);
          setDeletingStatus(false);
          pushToPersonsPage();
        } catch {
          setDeletingStatus(false);
          notifier.show({
            message: 'Something went wrong',
            style: 'error',
            time: 5000,
          });
        }
      },
    });
  };

  return (
    <QueryRenderer<PersonViewQuery>
      environment={environment}
      query={graphql`
        query PersonViewQuery($id: GlobalId!) {
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
              <Button className='m-1' onClick={() => deletePerson()} variant='outline-danger'>
                {isDeleting ? (
                  <Spinner
                    animation='border'
                    aria-hidden='true'
                    as='span'
                    role='status'
                    size='sm'
                  />
                ) : ('Delete')}
              </Button>
            </div>
          </div>
        );
      }}
      variables={{ id }}
    />
  );
}

export default PersonView;

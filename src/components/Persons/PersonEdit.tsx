import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { QueryRenderer } from 'react-relay';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';
import PersonInfo, { updateInfo } from './PersonInfo';
import { Button, Spinner } from 'react-bootstrap';
import { PersonEditQuery } from './__generated__/PersonEditQuery.graphql';
import { UpdatePersonInput } from './__generated__/PersonInfoUpdateMutation.graphql';
import notifier from 'codex-notifier';

/**
 * Page with form for person editing
 */
function PersonEditPageRenderer(): React.ReactElement {
  const { id } = useParams();

  const [input, setInput] = useState<UpdatePersonInput|null>(null);
  const [isLoading, setLoadingStatus] = useState(false);

  const history = useHistory();
  const location = useLocation();

  /**
   * Push location back to entity view page
   */
  const pushLocationBack = (): void => {
    const entityListPath = location.pathname.replace('/edit', '');

    history.push(entityListPath);
  };

  /**
   * Saves updated person to API
   */
  const savePersonToApi = async (): Promise<void> => {
    if (!input) {
      return;
    }

    setLoadingStatus(true);
    try {
      await updateInfo(input);
      notifier.show({
        message: `Person "${input.lastName} ${input.firstName}" successfully saved`,
        style: 'success',
        time: 5000,
      });
      setLoadingStatus(false);
      pushLocationBack();
    } catch {
      setLoadingStatus(false);
      notifier.show({
        message: 'Something went wrong',
        style: 'error',
        time: 5000,
      });
    }
  };

  return (
    <QueryRenderer<PersonEditQuery>
      environment={environment}
      query={graphql`
        query PersonEditQuery($id: ID!) {
          person(id: $id) {
            id
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
              <PersonInfo
                onChange={(e): void => {
                  setInput(e);
                }}
                person={props.person!}
              />
              <Button
                className='m-1'
                onClick={() => savePersonToApi()}
                type='submit'
              >
                {isLoading ? (
                  <Spinner
                    animation='border'
                    aria-hidden='true'
                    as='span'
                    role='status'
                    size='sm'
                  />
                ) : ('Save')}
              </Button>
              <Button
                className='m-1'
                onClick={() => pushLocationBack()}
                variant='outline-danger'
              >
                Cancel
              </Button>
            </div>
          </div>
        );
      }}
      variables={{ id }}
    />
  );
}

export default PersonEditPageRenderer;

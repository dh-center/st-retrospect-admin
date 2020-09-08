import React, { useState } from 'react';
import { useParams } from 'react-router';
import { QueryRenderer } from 'react-relay';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';
import PersonInfo, { updateInfo } from './PersonInfo';
import { Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { PersonEditQuery, PersonEditQueryResponse } from './__generated__/PersonEditQuery.graphql';
import { UpdatePersonInput } from './__generated__/PersonInfoUpdateMutation.graphql';

function PersonEditPageContent(props: PersonEditQueryResponse): React.ReactElement {
  const [input, setInput] = useState<UpdatePersonInput|null>(null);

  const history = useHistory();
  const location = useLocation();

  /**
   * Push location back to entity view page
   */
  const pushLocationBack = (): void => {
    const entityListPath = location.pathname.replace('/edit', '');

    history.push(entityListPath);
  };

  if (!props.person) {
    return <div>Loading</div>;
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
            console.log(e);
            setInput(e);
          }}
          person={props.person}
        />
        <Button
          className='m-1'
          onClick={() => {
            if (input) {
              console.log(input)
              updateInfo(input);
            }
          }}
          type='submit'
        >
          Save
        </Button>
        <Button
          className='m-1'
          onClick={() => pushLocationBack()}
          variant='outline-danger'
        >Cancel</Button>
      </div>
    </div>
  );
}

/**
 * Page with form for person editing
 */
function PersonEditPageRenderer(): React.ReactElement {
  const { id } = useParams();

  return (
    <QueryRenderer<PersonEditQuery>
      environment={environment}
      query={graphql`
        query PersonEditQuery($id: ID!) {
          person(id: $id) {
            id
            ...PersonInfo_person
          }
          temp {
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

        return (
          <PersonEditPageContent person={props.person} temp={props.temp}/>
        );
      }}
      variables={{ id }}
    />
  );
}

export default PersonEditPageRenderer;

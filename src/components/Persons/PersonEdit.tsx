import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { commitLocalUpdate, QueryRenderer } from 'react-relay';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';
import PersonInfo from './PersonInfo';
import { Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { PersonEditQuery, PersonEditQueryResponse } from './__generated__/PersonEditQuery.graphql';
import { PersonInfo_person } from './__generated__/PersonInfo_person.graphql';

function PersonEditPageContent(props: PersonEditQueryResponse): React.ReactElement {
  useEffect(() => {
    commitLocalUpdate(environment, store => {
      const root = store.getRoot();
      const record = root.getOrCreateLinkedRecord('temp', 'Person');

      if (props.person) {
        const proxy = store.get(props.person.id);

        if (proxy) {
          record.copyFieldsFrom(proxy);
        }
      }

      record.setValue(record.getDataID(), 'id');
    });
  }, []);

  const setPerson = (person: PersonInfo_person): void => {
    commitLocalUpdate(environment, store => {
      const root = store.getRoot();
      const record = root.getOrCreateLinkedRecord('temp', 'Person');

      if (props.person) {
        // const proxy = store.get(props.person.id);
        (Object.keys(person) as Array<keyof PersonInfo_person>).forEach((key) => record.setValue(person[key], key));
      }

      record.setValue(record.getDataID(), 'id');
    });
  };

  const history = useHistory();
  const location = useLocation();

  /**
   * Push location back to entity view page
   */
  const pushLocationBack = (): void => {
    const entityListPath = location.pathname.replace('/edit', '');

    history.push(entityListPath);
  };

  if (!props.temp) {
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
            setPerson(e);
          }}
          person={props.temp}
        />
        <Button className='m-1' type='submit'>Save</Button>
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

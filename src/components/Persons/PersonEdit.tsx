import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { commitLocalUpdate, QueryRenderer, LocalQueryRenderer } from 'react-relay';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';
import PersonInfo from './PersonInfo';
import { Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { PersonEditQuery, PersonEditQueryResponse } from './__generated__/PersonEditQuery.graphql';
import { PersonEditLocalQuery } from './__generated__/PersonEditLocalQuery.graphql';
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
  });

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

  // const history = useHistory();
  // const location = useLocation();

  /**
   * Push location back to entity view page
   */
  // const pushLocationBack = (): void => {
  //   const entityListPath = location.pathname.replace('/edit', '');
  //
  //   history.push(entityListPath);
  // };

  return (
    <div className='d-flex justify-content-center' >
      <LocalQueryRenderer<PersonEditLocalQuery>
        environment={environment}
        query={graphql`
          query PersonEditLocalQuery {
            temp {
              __typename
               ...PersonInfo_person
            }
            ... on Query {
            __typename
            }
          }
        `}
        render={({ error, props: p }) => {
          if (error) {
            return <div>Error occurred while loading person</div>;
          }

          if (!p?.temp) {
            return <div>There is no person with provided id</div>;
          }

          return <div
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
              person={p.temp}
            />
            <Button className='m-1' type='submit'>Save</Button>
            <Button
              className='m-1'
              // onClick={(event): void => pushLocationBack()}
              variant='outline-danger'
            >Cancel</Button>
          </div>;
        }}
        variables={{}}
      />
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
          <PersonEditPageContent person={props.person}/>
        );
      }}
      variables={{ id }}
    />
  );
}

export default PersonEditPageRenderer;

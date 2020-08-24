import makeEditPage from '../Entities/makeEditPage';
import graphql from 'babel-plugin-relay/macro';
import PersonInfo from './PersonInfo';
import { useParams } from 'react-router';
import environment from '../../relay-env';
import { QueryRenderer } from 'react-relay';
import React from 'react';
import { PersonEditQuery } from './__generated__/PersonEditQuery.graphql';

const EditComponent = makeEditPage(
  PersonInfo,
  graphql`
    mutation PersonEditMutation($input: UpdatePersonInput!) {
      person {
        update(input: $input) {
          recordId
        }
      }
    }`
);

const PersonEditComponent = (): React.ReactElement => {
  const { id } = useParams();

  return <QueryRenderer<PersonEditQuery>
    environment={environment}
    query={graphql`
      query PersonEditQuery($id: ID!) {
        entity: person(id: $id) {
          id
          lastName
          firstName
          patronymic
          pseudonym
          birthDate
          description
          deathDate
          profession
          wikiLink
        }
      }
    `}
    variables={{ id }}
    render={({ error, props }): React.ReactNode => {
      if (error) {
        return <div>Error!</div>;
      }
      if (!props) {
        return <div>Loading...</div>;
      }

      return <EditComponent entity={props.entity!}/>;
    }}>
  </QueryRenderer>;
};

export default PersonEditComponent;

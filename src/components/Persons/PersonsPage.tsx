import React, { ReactElement } from 'react';
import { createPaginationContainer, QueryRenderer } from 'react-relay';
import { PersonsPageQuery } from './__generated__/PersonsPageQuery.graphql';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';
import { ENTITIES_PER_PAGE } from '../../constants';
import EntitiesList, { EntitiesListProps } from '../Entities/EntitiesList';
import { PersonsPage_entityConnection as PersonsPageEntityConnection } from './__generated__/PersonsPage_entityConnection.graphql';
import PrivateRoute from '../PrivateRoute';
import { Switch } from 'react-router-dom';
import makeCreationPage from '../Entities/makeCreationPage';
import PersonInfo from './Info';
import { OmitId, Person } from '../../types/entities';
import makeViewPage from '../Entities/makeViewPage';
import QuestInfo from '../Quests/Info';

const PersonsList = createPaginationContainer<EntitiesListProps<PersonsPageEntityConnection>>(
  EntitiesList,
  {
    entityConnection: graphql`
      fragment PersonsPage_entityConnection on Query @argumentDefinitions (
        first: {type: "Int", defaultValue: 10}
        after: {type: "Cursor"}
      ) {
        entities: persons(
          first: $first
          after: $after
        ) @connection(key: "PersonsPage_entities") {
          totalCount
          edges {
            node {
              id
              lastName
              firstName
              patronymic
              pseudonym
              birthDate
              deathDate
              profession
            }
          }
        }
      }
    `,
  },
  {
    direction: 'forward',
    query: graphql`
      query PersonsPageForwardQuery(
        $first: Int,
        $after: Cursor,
      ) {
        ...PersonsPage_entityConnection @arguments(first: $first, after: $after)
      }
    `,
    getVariables(props, paginationInfo) {
      return {
        first: paginationInfo.count,
        after: paginationInfo.cursor,
      };
    },
  }
);

/**
 *
 */
function generatePerson(): OmitId<Person> {
  return {
    description: '',
    lastName: '',
    patronymic: '',
    firstName: '',
    profession: '',
    pseudonym: '',
    birthDate: '',
    deathDate: '',
    wikiLink: '',
  };
}

const CreateComponent = makeCreationPage(
  PersonInfo,
  generatePerson,
  graphql`
    mutation PersonsPageCreateMutation($input: CreatePersonInput!) {
      person {
        create(input: $input) {
          recordId
        }
      }
    }`
);

const ViewComponent = makeViewPage(
  QuestInfo,
  graphql`
    query PersonsPagePersonQuery($id: ID!) {
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
    }`
);

/**
 * Page for displaying persons
 */
export default function PersonsPage(): ReactElement {
  return (
    <Switch>
      <PrivateRoute path={'/persons/create'}>
        <CreateComponent/>
      </PrivateRoute>
      <PrivateRoute path={'/persons/:id'}>
        <ViewComponent/>
      </PrivateRoute>
      <PrivateRoute path={'/persons'}>
        <QueryRenderer<PersonsPageQuery>
          environment={environment}
          query={graphql`
          query PersonsPageQuery (
            $first: Int,
            $after: Cursor
          ) {
             ...PersonsPage_entityConnection @arguments(first: $first, after: $after)
          }
        `}
          variables={{
            first: ENTITIES_PER_PAGE,
            after: null,
          }}
          render={({ error, props }): React.ReactNode => {
            if (error) {
              return <div>Error!</div>;
            }
            if (!props) {
              return <div>Loading persons...</div>;
            }

            return <PersonsList entityName='persons' entityConnection={props}/>;
          }}
        />
      </PrivateRoute>
    </Switch>
  );
}

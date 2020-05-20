import React, { ReactElement } from 'react';
import { createPaginationContainer, QueryRenderer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import EntitiesList, { EntitiesListProps } from '../TableView/EntitiesList';
import { QuestsPageQuery } from './__generated__/QuestsPageQuery.graphql';
import { QuestsPage_entityConnection as QuestsPageEntityConnection } from './__generated__/QuestsPage_entityConnection.graphql';
import environment from '../../relay-env';
import { ENTITIES_PER_PAGE } from '../../constants';
import { NavLink, Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import { createComponent } from '../Entities/CreateHOC';
import QuestInfo from './Info';

const QuestsList = createPaginationContainer<EntitiesListProps<QuestsPageEntityConnection>>(
  EntitiesList,
  {
    entityConnection: graphql`
      fragment QuestsPage_entityConnection on Query @argumentDefinitions (
        first: {type: "Int", defaultValue: 10}
        after: {type: "Cursor"}
      ) {
        entities: quests(
          first: $first
          after: $after
        ) @connection(key: "QuestsPage_entities") {
          totalCount
          edges {
            node {
              id
              name
              description
            }
          }
        }
      }
    `,
  },
  {
    direction: 'forward',
    query: graphql`
      query QuestsPageForwardQuery(
        $first: Int,
        $after: Cursor
      ) {
        ...QuestsPage_entityConnection @arguments(first: $first, after: $after)
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

const CreateComponent = createComponent(
  QuestInfo,
  graphql`
    mutation QuestsPageCreateMutation($input: CreateQuestInput) {
      quest {
        create(input: $input) {
          recordId
        }
      }
    }`
);

/**
 * Functional component for quests view
 */
export default function QuestsPage(): ReactElement {
  return (
    <Switch>
      <PrivateRoute path={'/quests/create'}>
        <CreateComponent/>
      </PrivateRoute>
      <PrivateRoute path={'/quests'}>
        <NavLink className="navigation__link" activeClassName="navigation__link--active" to="/quests/create">Create</NavLink>
        <QueryRenderer<QuestsPageQuery>
          environment={environment}
          query={graphql`
              query QuestsPageQuery (
                $first: Int,
                $after: Cursor
              ) {
                ...QuestsPage_entityConnection @arguments(first: $first, after: $after)
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
              return <div>Loading quests...</div>;
            }

            return <QuestsList entityConnection={props}/>;
          }}
        />
      </PrivateRoute>
    </Switch>
  );
}

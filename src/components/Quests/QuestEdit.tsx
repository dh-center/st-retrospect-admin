import { ReactElement } from 'react';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import { QueryRenderer } from 'react-relay';
import environment from '../../appEnv';
import graphql from 'babel-plugin-relay/macro';
import { QuestEditQuery } from './__generated__/QuestEditQuery.graphql';
import LoadingPlaceholder from '../utils/LoadingPlaceholder';
import QuestEditForm from './QuestEditForm';
import notifier from 'codex-notifier';

/**
 * Page with form for quest editing
 */
export default function QuestEdit(): ReactElement {
  const { id } = useParams<{id: string}>();

  return (
    <QueryRenderer<QuestEditQuery>
      environment={environment}
      query={graphql`
        query QuestEditQuery($id: GlobalId!) {
          quest(id: $id) {
            ...QuestEditForm_originalQuest
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          return <div>Error</div>;
        }

        if (!props) {
          return <LoadingPlaceholder
            alt='Loading quest...'
          />;
        }

        if (!props.quest) {
          notifier.show({
            message: `Quest with id "${id}" wasn't found`,
            style: 'error',
            time: 5000,
          });

          return <Redirect to='/quests'/>;
        }

        return <QuestEditForm originalQuest={props.quest}/>;
      }}
      variables={{ id }}
    />
  );
}

import makeCreationPage from '../Entities/makeCreationPage';
import graphql from 'babel-plugin-relay/macro';
import QuestInfo, { generateQuest } from './QuestInfo';

const QuestCreateComponent = makeCreationPage(
  QuestInfo,
  generateQuest,
  graphql`
    mutation QuestCreateMutation($input: CreateQuestInput!) {
      quest {
        create(input: $input) {
          recordId
        }
      }
    }`
);

export default QuestCreateComponent;

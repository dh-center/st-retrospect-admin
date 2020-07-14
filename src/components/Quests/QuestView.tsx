import makeViewPage from '../Entities/makeViewPage';
import QuestInfo from './QuestInfo';
import graphql from 'babel-plugin-relay/macro';

const QuestViewComponent = makeViewPage(
  QuestInfo,
  graphql`
    query QuestViewQuery($id: ID!) {
      entity: quest(id: $id) {
        id
        name
        description
        type
      }
    }`
);

export default QuestViewComponent;

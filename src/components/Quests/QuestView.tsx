import makeViewPage from '../Entities/makeViewPage';
import QuestInfo from './QuestInfo';
import graphql from 'babel-plugin-relay/macro';

const QuestViewComponent = makeViewPage(
  QuestInfo,
  graphql`
    query QuestViewQuery($id: GlobalId!) {
      entity: quest(id: $id) {
        id
        name
        description
        type
        data {
          time
          version
          blocks
        }
      }
    }`
);

export default QuestViewComponent;

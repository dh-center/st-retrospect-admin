import makeViewPage from '../Entities/makeViewPage';
import graphql from 'babel-plugin-relay/macro';
import PersonInfo from './PersonInfo';

const PersonViewComponent = makeViewPage(
  PersonInfo,
  graphql`
    query PersonViewQuery($id: ID!) {
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

export default PersonViewComponent;

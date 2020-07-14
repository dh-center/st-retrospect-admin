import makeCreationPage from '../Entities/makeCreationPage';
import graphql from 'babel-plugin-relay/macro';
import PersonInfo, { generatePerson } from './PersonInfo';

const PersonCreateComponent = makeCreationPage(
  PersonInfo,
  generatePerson,
  graphql`
    mutation PersonCreateMutation($input: CreatePersonInput!) {
      person {
        create(input: $input) {
          recordId
        }
      }
    }`
);

export default PersonCreateComponent;

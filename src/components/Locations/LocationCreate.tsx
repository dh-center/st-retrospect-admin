import makeCreationPage from '../Entities/makeCreationPage';
import graphql from 'babel-plugin-relay/macro';
import LocationInfo, { generateLocation } from './LocationInfo';

const LocationCreateComponent = makeCreationPage(
  LocationInfo,
  generateLocation,
  graphql`
    mutation LocationCreateMutation($input: CreateQuestInput!) {
      quest {
        create(input: $input) {
          recordId
        }
      }
    }`
);

export default LocationCreateComponent;

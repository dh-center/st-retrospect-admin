import makeViewPage from '../Entities/makeViewPage';
import LocationInfo from './LocationInfo';
import graphql from 'babel-plugin-relay/macro';

const LocationViewComponent = makeViewPage(
  LocationInfo,
  graphql`
    query LocationViewQuery($id: ID!) {
      entity: location(id: $id) {
        id
        instances {
          id
          name
          demolitionDate
          constructionDate
          architects {
            id
            firstName
            lastName
            patronymic
          }
          startDate
          endDate
          description
          locationTypes {
            id
            name
          }
        }
      }
    }`
);

export default LocationViewComponent;

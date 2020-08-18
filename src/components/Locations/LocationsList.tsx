import React from 'react';
import { createPaginationContainer, RelayPaginationProp } from 'react-relay';
import EntitiesList, { EntitiesListProps } from '../Entities/EntitiesList';
import { LocationsList_entityConnection as LocationsPageEntityConnection } from './__generated__/LocationsList_entityConnection.graphql';
import graphql from 'babel-plugin-relay/macro';

interface Props {
  /**
   * Entity connection
   */
  entityConnection: LocationsPageEntityConnection;

  /**
   * Entity name for creating links
   */
  entityName: string;

  /**
   * Prop for accessing relay functionality
   */
  relay: RelayPaginationProp;
}

/**
 * @param props
 */
function UpdatedLocationsList(props: Props): React.ReactElement {
  return (
    <EntitiesList<LocationsPageEntityConnection>
      entityConnection={props.entityConnection}
      entityName={props.entityName}
      relay={props.relay}
      header={<>
        <tr>
          <th rowSpan={2}>№</th>
          <th rowSpan={2}>id</th>
          <th rowSpan={2}>coordinateX</th>
          <th rowSpan={2}>coordinateY</th>
          <th colSpan={2}>instances</th>
        </tr>
        <tr>
          <th>name</th>
          <th>description</th>
        </tr>
      </>}
      row={(p) => {
        const instancesRows = p.entity.instances.map(instance => <React.Fragment key={instance.id}>
          <td>{instance.name}</td>
          <td>{instance.description}</td>
        </React.Fragment>);

        const rowSpan = instancesRows.length;

        return <>
          <tr>
            <td rowSpan={rowSpan}>{p.index + 1}</td>
            <td rowSpan={rowSpan}>{p.entity.id}</td>
            <td rowSpan={rowSpan}>{p.entity.coordinateX}</td>
            <td rowSpan={rowSpan}>{p.entity.coordinateX}</td>
            {instancesRows.shift()}
          </tr>
          {instancesRows.map((row, index) => <tr key={index}>{row}</tr>)}
        </>;
      }
      }
    />
  );
}

const LocationsList = createPaginationContainer<EntitiesListProps<LocationsPageEntityConnection>>(
  UpdatedLocationsList,
  {
    entityConnection: graphql`
      fragment LocationsList_entityConnection on Query @argumentDefinitions (
        first: {type: "Int", defaultValue: 10}
        after: {type: "Cursor"}
      ) {
        entities: locations(
          first: $first
          after: $after
        ) @connection(key: "LocationsPage_entities") {
          totalCount
          edges {
            node {
              id
              coordinateX
              coordinateY
              instances {
                id
                name
                description
              }
            }
          }
        }
      }
    `,
  },
  {
    direction: 'forward',
    query: graphql`
      query LocationsListForwardQuery(
        $first: Int,
        $after: Cursor
      ) {
        ...LocationsList_entityConnection @arguments(first: $first, after: $after)
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

export default LocationsList;

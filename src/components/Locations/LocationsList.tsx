import React from 'react';
import { useHistory } from 'react-router';
import { createPaginationContainer, RelayPaginationProp } from 'react-relay';
import EntitiesList, { EntitiesListProps } from '../EntitiesList';
import { LocationsList_entityConnection as LocationsPageEntityConnection } from './__generated__/LocationsList_entityConnection.graphql';
import graphql from 'babel-plugin-relay/macro';
import { EntityRowProps } from '../EntitiesList/EntitiesListSection';
import { Entity } from '../../types/entities';

/**
 * Props for UpdatedLocationsList component
 */
interface LocationsListProps {
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
 * Table row with location info
 *
 * @param props - props for component rendering
 */
function LocationRow(props: EntityRowProps<Entity<LocationsPageEntityConnection>>): React.ReactElement {
  const history = useHistory();

  const instancesRows = props.entity.instances.map(instance => <React.Fragment key={instance.id}>
    <td>{instance.name}</td>
    <td>{instance.description}</td>
  </React.Fragment>);

  const onClick = (): void => {
    history.push(`/locations/${props.entity.id}`);
  };

  const rowSpan = instancesRows.length;

  return <>
    <tr onClick={onClick}>
      <td rowSpan={rowSpan}>{props.index + 1}</td>
      <td rowSpan={rowSpan}>{(
        props.entity.addresses &&
        props.entity.addresses[0] &&
        props.entity.addresses[0].address?.length !== 0
      ) ? props.entity.addresses[0].address : '—'}</td>
      <td rowSpan={rowSpan}>{props.entity.latitude}</td>
      <td rowSpan={rowSpan}>{props.entity.longitude}</td>
      {instancesRows.shift()}
    </tr>
    {instancesRows.map((row, index) => <tr key={index} onClick={onClick}>{row}</tr>)}
  </>;
}

/**
 * Location list with custom header and rows
 *
 * @param props - props for rendering
 */
function UpdatedLocationsList(props: LocationsListProps): React.ReactElement {
  return (
    <EntitiesList<LocationsPageEntityConnection>
      entityConnection={props.entityConnection}
      entityName={props.entityName}
      header={<>
        <tr>
          <th rowSpan={2}>№</th>
          <th rowSpan={2}>address</th>
          <th rowSpan={2}>latitude</th>
          <th rowSpan={2}>longitude</th>
          <th colSpan={2}>instances</th>
        </tr>
        <tr>
          <th>name</th>
          <th>description</th>
        </tr>
      </>}
      relay={props.relay}
      row={LocationRow}
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
              latitude
              longitude
              addresses {
                address
              }
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

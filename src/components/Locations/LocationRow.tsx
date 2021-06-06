import React from 'react';
import { useHistory } from 'react-router';
import { useFragment } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { Cell, TableBody } from '../utils/table';
import { LocationRow_location$key } from './__generated__/LocationRow_location.graphql';

/**
 * Props for location Row rendering
 */
interface LocationRowProps {
  /**
   * Location data to display
   */
  location: LocationRow_location$key;

  /**
   * Row index in the table
   */
  index: number;
}

/**
 * Table row with location info
 *
 * @param props - props for component rendering
 */
export default function LocationRow(props: LocationRowProps): React.ReactElement {
  const history = useHistory();

  const location = useFragment(graphql`
    fragment LocationRow_location on Location {
      id
      longitude
      latitude
      addresses {
        address
      }
      instances {
        id
        name
        description
        tags {
          id
          value
        }
      }
    }
  `, props.location);

  const instancesRows = location.instances.map(instance =>
    <React.Fragment key={instance.id}>
      <Cell>{instance.name}</Cell>
      <Cell>{instance.description}</Cell>
      <Cell>{instance.tags.map(tag => tag.value).join(', ')}</Cell>
    </React.Fragment>
  );

  const onClick = (): void => {
    history.push(`/locations/${location.id}`);
  };

  /**
   * Returns address from addresses array or '—' if it isn't
   *
   * @param addresses - array of addresses
   */
  const getAddress = (addresses: readonly {
    address: string | null;
  }[] | null): string => {
    return (
      addresses &&
      addresses[0] &&
      addresses[0].address &&
      addresses[0].address.length !== 0
    )
      ? addresses[0].address
      : '—';
  };

  const rowSpan = instancesRows.length || 1;

  return (
    <TableBody>
      <tr onClick={onClick}>
        <Cell rowSpan={rowSpan}>{props.index + 1}</Cell>
        <Cell rowSpan={rowSpan}>{getAddress(location.addresses)}</Cell>
        <Cell rowSpan={rowSpan}>{location.latitude}</Cell>
        <Cell rowSpan={rowSpan}>{location.longitude}</Cell>
        {instancesRows.shift() || <><Cell/><Cell/></>}
      </tr>
      {instancesRows.map((row, index) => <tr key={index} onClick={onClick}>{row}</tr>)}
    </TableBody>
  );
}

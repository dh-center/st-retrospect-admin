/* eslint-disable no-unused-vars,@typescript-eslint/naming-convention */
import { useFragment, useLazyLoadQuery } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import React, { useEffect, useState } from 'react';
import { LocationsPageQuery } from './__generated__/LocationsPageQuery.graphql';
import { useHistory } from 'react-router';
import { LocationsPage_location$key } from './__generated__/LocationsPage_location.graphql';
import styled from 'styled-components';
import SearchForm from '../utils/SearchForm';
import Button from 'react-bootstrap/Button';
import PaginationControls from '../utils/PaginationControls';
import { LinkContainer } from 'react-router-bootstrap';

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const Cell = styled.td`
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border: 1px solid #dee2e6;
  padding: .3rem;
`;

const HeadCell = styled(Cell)`
  font-weight: bold;
  vertical-align: bottom;
`;

const TableBody = styled.tbody`
  &:nth-child(odd) {
    background: rgba(0,0,0,.05);;
  }

  &:hover td[rowspan],
  & tr:hover td {
    background: rgba(0,0,0,.075);;
  }
`;

const ControlsPanel = styled.div`
  bottom: 0;
  position: sticky;
  background-color: rgba(255,255,255,.8);
  padding: 5px;
  backdrop-filter: blur(6px);
`;

interface LocationRowProps {
  location: LocationsPage_location$key;
  index: number;
}

/**
 * Table row with location info
 *
 * @param props - props for component rendering
 */
function LocationRow(props: LocationRowProps): React.ReactElement {
  const history = useHistory();

  const location = useFragment(graphql`
    fragment LocationsPage_location on Location {
      id
      longitude
      latitude
      addresses {
        address
      }
      instances {
        id
        id
        name
        description
      }
    }
  `, props.location);

  const instancesRows = location.instances.map(instance =>
    <React.Fragment key={instance.id}>
      <Cell>{instance.name}</Cell>
      <Cell>{instance.description}</Cell>
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

  return <TableBody>
    <tr onClick={onClick}>
      <Cell rowSpan={rowSpan}>{props.index + 1}</Cell>
      <Cell rowSpan={rowSpan}>{getAddress(location.addresses)}</Cell>
      <Cell rowSpan={rowSpan}>{location.latitude}</Cell>
      <Cell rowSpan={rowSpan}>{location.longitude}</Cell>
      {instancesRows.shift() || <><Cell/><Cell/></>}
    </tr>
    {instancesRows.map((row, index) => <tr key={index} onClick={onClick}>{row}</tr>)}
  </TableBody>;
}


export default function LocationsPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [query, setQuery] = useState('');
  const history = useHistory();

  const data = useLazyLoadQuery<LocationsPageQuery>(
    graphql`
        query LocationsPageQuery($query: String!, $skip: Int!, $first: Int!) {
          locationsSearch(input: {query: $query, windowedPagination: {skip: $skip, first: $first}}) {
            edges {
              node {
                id
                ...LocationsPage_location
              }
            }
            totalCount
            suggest
          }
        }
    `, {
      query,
      skip: currentPage * pageSize,
      first: pageSize,
    }
  );

  useEffect(() => {
    const params = new URLSearchParams();

    if (query) {
      params.append('query', query);
    } else {
      params.delete('query');
    }

    history.push({ search: params.toString() });
  }, [query, history]);


  return (
    <div>
      <SearchForm onSubmit={value => setQuery(value)}/>
      <Table>
        <thead>
          <tr>
            <HeadCell rowSpan={2}>№</HeadCell>
            <HeadCell rowSpan={2}>Address</HeadCell>
            <HeadCell rowSpan={2}>Latitude</HeadCell>
            <HeadCell rowSpan={2}>Longitude</HeadCell>
            <HeadCell colSpan={2}>Instances</HeadCell>
          </tr>
          <tr>
            <HeadCell>Name</HeadCell>
            <HeadCell>Description</HeadCell>
          </tr>
        </thead>

        {data.locationsSearch.edges.map((edge, index) =>
          <LocationRow index={currentPage * pageSize + index} key={edge.node.id} location={edge.node}/>
        )}
      </Table>
      <ControlsPanel>
        <LinkContainer to='/locations/create'>
          <Button variant='outline-success'>
            Create
          </Button>
        </LinkContainer>

        <PaginationControls
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSize={pageSize}
          totalCount={data.locationsSearch.totalCount}
        />
      </ControlsPanel>
    </div>
  );
}

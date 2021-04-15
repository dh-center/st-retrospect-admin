/* eslint-disable no-unused-vars */
import { useFragment, useLazyLoadQuery } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import React, { useState } from 'react';
import { LocationsPageQuery } from './__generated__/LocationsPageQuery.graphql';
import { useHistory } from 'react-router';
import { LocationsPage_location$key } from './__generated__/LocationsPage_location.graphql';
import PaginationControl from 'rc-pagination';
import locale from 'rc-pagination/lib/locale/ru_RU';
import styled from 'styled-components';

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
  const [currentQuery, setCurrentQuery] = useState('');

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


  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        setQuery(currentQuery);
      }
      }>
        <input onChange={(e) => setCurrentQuery(e.target.value)} type='text' value={currentQuery}/>
        <button>Search</button>
      </form>
      {/* eslint-disable-next-line @typescript-eslint/naming-convention */}
      {data.locationsSearch.suggest && <div>Maybe you meant <span dangerouslySetInnerHTML={{ __html:data.locationsSearch.suggest }}/></div>}
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

      <div className='d-flex justify-content-center'>
        <PaginationControl
          current={currentPage + 1}
          locale={locale}
          onChange={(page) => setCurrentPage(page - 1)}
          pageSize={pageSize}
          total={data.locationsSearch.totalCount}
        />
        <select
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
          value={pageSize}
        >
          {[10, 25, 50, 100].map(size => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

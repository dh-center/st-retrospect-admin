import { useLazyLoadQuery } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { LocationsPageQuery } from './__generated__/LocationsPageQuery.graphql';
import styled from 'styled-components';
import SearchForm from '../utils/SearchForm';
import Button from 'react-bootstrap/Button';
import PaginationControls from '../utils/PaginationControls';
import { LinkContainer } from 'react-router-bootstrap';
import useStateWithUrlParams from '../../utils/useStateWithUrlParams';
import { Table, HeadCell } from '../utils/table';
import LocationRow from './LocationRow';

const ControlsPanel = styled.div`
  bottom: 0;
  position: sticky;
  background-color: rgba(255, 255, 255, .8);
  padding: 5px;
  backdrop-filter: blur(6px);
`;


/**
 * Page with locations table
 */
export default function LocationsPage(): React.ReactElement {
  const [currentPage, setCurrentPage] = useStateWithUrlParams('page', 1);
  const [pageSize, setPageSize] = useStateWithUrlParams('size', 25);
  const [query, setQuery] = useStateWithUrlParams('query', '');

  const pageIndex = currentPage - 1;

  const data = useLazyLoadQuery<LocationsPageQuery>(
    graphql`
      query LocationsPageQuery($query: String!, $skip: Int!, $first: Int!) {
        locationsSearch(input: {query: $query, skip: $skip, first: $first}) {
          nodes {
            id
            ...LocationRow_location
          }
          totalCount
          suggest
        }
      }
    `, {
      query,
      skip: pageIndex * pageSize,
      first: pageSize,
    }
  );

  return (
    <div>
      <SearchForm
        initialState={query}
        onSubmit={value => setQuery(value)}
        suggest={data.locationsSearch.suggest}
      />
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
        {data.locationsSearch.nodes.map((node, index) =>
          <LocationRow index={pageIndex * pageSize + index} key={node.id} location={node}/>
        )}
      </Table>
      <ControlsPanel>
        <LinkContainer to='/locations/create'>
          <Button variant='outline-success'>
            Create
          </Button>
        </LinkContainer>

        <PaginationControls
          currentPage={pageIndex}
          onCurrentPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSize={pageSize}
          totalCount={data.locationsSearch.totalCount}
        />
      </ControlsPanel>
    </div>
  );
}

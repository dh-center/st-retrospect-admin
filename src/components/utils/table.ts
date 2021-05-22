import styled from 'styled-components';

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 5px;
`;

export const Cell = styled.td`
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border: 1px solid #dee2e6;
  padding: .3rem;
`;

export const HeadCell = styled(Cell)`
  font-weight: bold;
  vertical-align: bottom;
`;

export const TableBody = styled.tbody`
  &:nth-child(odd) {
    background: rgba(0,0,0,.05);
  }

  &:hover td[rowspan],
  & tr:hover td {
    background: rgba(0,0,0,.075);
  }
`;

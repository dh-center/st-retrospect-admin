import React from 'react';
import PaginationControl from 'rc-pagination';
import locale from 'rc-pagination/lib/locale/ru_RU';
import styled from 'styled-components';

interface Props {
  currentPage: number;
  onCurrentPageChange(value: number): void
  pageSize: number;
  onPageSizeChange(value: number): void;
  totalCount: number;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const Select = styled.select`
  position: absolute;
  right: 0;
  bottom: 0;
`;

export default function PaginationControls(props: Props): React.ReactElement {
  return (
    <Wrapper>
      <PaginationControl
        current={props.currentPage + 1}
        locale={locale}
        onChange={(page) => props.onCurrentPageChange(page - 1)}
        pageSize={props.pageSize}
        total={props.totalCount}
      />
      <Select
        onChange={e => {
          props.onPageSizeChange(Number(e.target.value));
        }}
        value={props.pageSize}
      >
        {[10, 25, 50, 100].map(size => (
          <option key={size} value={size}>
            Show {size}
          </option>
        ))}
      </Select>

    </Wrapper>
  );
}

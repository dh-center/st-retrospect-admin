import React from 'react';
import PaginationControl from 'rc-pagination';
import locale from 'rc-pagination/lib/locale/ru_RU';
import styled from 'styled-components';

/**
 * Props for PaginationControls component
 */
interface Props {
  /**
   * Viewed page index
   */
  currentPage: number;

  /**
   * Callback for handling page index change
   */
  onCurrentPageChange(value: number): void;

  /**
   * How many items to display
   */
  pageSize: number;

  /**
   * Callback for handling page size change
   * @param value - new page size
   */
  onPageSizeChange(value: number): void;

  /**
   * Total count of available items
   */
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

/**
 * Displays controls for pagination
 * @param props - props for component rendering
 */
export default function PaginationControls(props: Props): React.ReactElement {
  return (
    <Wrapper>
      <PaginationControl
        current={props.currentPage + 1}
        locale={locale}
        onChange={(page) => props.onCurrentPageChange(page)}
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

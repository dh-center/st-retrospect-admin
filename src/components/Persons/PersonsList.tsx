import React, { ReactElement, useEffect, useState } from 'react';
import { createPaginationContainer, RelayPaginationProp } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { PersonsList_personsConnection as PersonsConnection } from './__generated__/PersonsList_personsConnection.graphql';
import { ENTITIES_PER_PAGE } from '../../constants';
import PaginationControl from 'rc-pagination';
import './PersonsList.css';
import 'rc-pagination/assets/index.css';
import locale from 'rc-pagination/lib/locale/ru_RU';

/**
 * Props for PersonsList component
 */
interface Props {
  /**
   * Persons connection
   */
  personsConnection: PersonsConnection;

  /**
   * Prop for accessing relay functionality
   */
  relay: RelayPaginationProp;
}

/**
 * Component for displaying persons list
 *
 * @param props - react component props
 */
function PersonsList(props: Props): ReactElement<Props> {
  const pagesCount = Math.floor(props.personsConnection.persons.totalCount / ENTITIES_PER_PAGE) + 1;
  const [viewingPages, setViewingPages] = useState<boolean[]>(Array<boolean>(pagesCount).fill(false));

  const loadMore = (): void => {
    props.relay.loadMore(ENTITIES_PER_PAGE);
  };

  const goToPage = (current: number): void => {
    props.relay.loadMore(current * ENTITIES_PER_PAGE - props.personsConnection.persons.edges.length);
  };

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
      const viewingPagesCopy = [ ...viewingPages ];

      console.log('orig', viewingPages);
      console.log('copy', viewingPagesCopy);
      entries.forEach(entry => {
        const page = entry.target.getAttribute('data-page');

        if (page) {
          console.log(page, entry.isIntersecting);
          viewingPagesCopy[+page - 1] = entry.isIntersecting;
        }
      });

      console.log('set', viewingPagesCopy);

      setViewingPages(viewingPagesCopy);
    };

    const observer = new window.IntersectionObserver(observerCallback);

    console.log('new observer');
  });

  return (
    <div className={'persons-page'}>
      <div className={'persons-page__page-control'}>
        {props.personsConnection.persons.totalCount}
        <button onClick={loadMore}>Load more</button>
        <PaginationControl
          pageSize={ENTITIES_PER_PAGE}
          total={props.personsConnection.persons.totalCount}
          onChange={goToPage}
          locale={locale}
        />
        {viewingPages.map((page, index) =>
          <span key={index} className={page ? 'true' : 'false'}>{index} — {page ? 'true' : 'false'} </span>
        )}
      </div>
      <table className={'persons-page__table'}>
        <thead>
          <tr>
            <th>№</th>
            <th>id</th>
            <th>first name</th>
            <th>last name</th>
            <th>patronymic</th>
          </tr>
        </thead>
        <tbody>
          {props.personsConnection.persons.edges.map((person, index) => (
            <React.Fragment key={person.node.id}>
              {{(index) % 25 === 0 &&}
               <PageSectionRow
                 key={(index) / 25 + 1}
                 pageNumber={(index) / 25 + 1}
                 observer={observer}
               />
               }
              <tr key={person.node.id}>
                <td>{index + 1}</td>
                <td>{person.node.id}</td>
                <td>{person.node.firstName}</td>
                <td>{person.node.lastName}</td>
                <td>{person.node.patronymic}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * @param props
 */
class PageSectionRow extends React.Component<{
  pageNumber: number;
  observer: IntersectionObserver;
}> {
  private row = React.createRef<HTMLTableRowElement>();

  /**
   *
   */
  public componentDidMount(): void {
    this.props.observer.observe(this.row.current!);
  }

  /**
   *
   */
  public componentWillUnmount(): void {
    this.props.observer.unobserve(this.row.current!);
  }

  /**
   *
   */
  public render(): ReactElement {
    return (
      <tr ref={this.row} data-page={this.props.pageNumber}>
        <td colSpan={5}>Page number {this.props.pageNumber}</td>
      </tr>
    );
  }
}

export default createPaginationContainer(
  PersonsList,
  {
    personsConnection: graphql`
      fragment PersonsList_personsConnection on Query @argumentDefinitions (
        first: {type: "Int", defaultValue: 10}
        after: {type: "Cursor"}
      ) {
        persons(
          first: $first
          after: $after
        ) @connection(key: "PersonsList_persons") {
          totalCount
          edges {
            node {
              id
              firstName
              lastName
              patronymic
            }
          }
        }
      }
    `,
  },
  {
    direction: 'forward',
    query: graphql`
      query PersonsListForwardQuery(
        $first: Int,
        $after: Cursor,
      ) {
        ...PersonsList_personsConnection @arguments(first: $first, after: $after)
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

import React, { ReactElement } from 'react';
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

interface State {
  viewingPages: boolean[];
  currentPage: number;
}

/**
 * erferf
 *
 * @param entries
 * @param observer
 * @param current
 */
class PersonsList extends React.Component<Props, State> {
  private readonly observer: IntersectionObserver;

  /**
   * @param props - component's props
   */
  constructor(props: Props) {
    super(props);
    const pagesCount = Math.floor(props.personsConnection.persons.totalCount / ENTITIES_PER_PAGE) + 1;

    this.state = {
      viewingPages: Array(pagesCount).fill(false),
      currentPage: 0,
    };

    this.observer = new window.IntersectionObserver(this.observerCallback);
  }

  /**
   *
   */
  public render(): ReactElement {
    return (
      <div className={'persons-page'}>
        <div className={'persons-page__page-control'}>
          {this.props.personsConnection.persons.totalCount}
          <button onClick={this.loadMore}>Load more</button>
          <PaginationControl
            pageSize={ENTITIES_PER_PAGE}
            total={this.props.personsConnection.persons.totalCount}
            onChange={this.goToPage}
            locale={locale}
            current={this.state.currentPage + 1}
          />
          Current page: {this.state.currentPage + 1}
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
            {this.props.personsConnection.persons.edges.map((person, index) => (
              <React.Fragment key={person.node.id}>
                {(index) % 25 === 0 &&
                  <PageSectionRow
                    key={(index) / 25 + 1}
                    pageNumber={(index) / 25 + 1}
                    observer={this.observer}
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

  private loadMore = (): void => {
    this.props.relay.loadMore(ENTITIES_PER_PAGE);
  };

  private goToPage = (current: number): void => {
    this.props.relay.loadMore(current * ENTITIES_PER_PAGE - this.props.personsConnection.persons.edges.length);
  };

  private observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
    const viewingPagesCopy = [ ...this.state.viewingPages ];

    entries.forEach(entry => {
      const page = entry.target.getAttribute('data-page');

      if (page) {
        viewingPagesCopy[+page - 1] = entry.isIntersecting;
      }
    });

    this.setState({
      viewingPages: viewingPagesCopy,
      currentPage: viewingPagesCopy.findIndex(Boolean),
    });
  };
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
    if (this.row.current) {
      this.props.observer.observe(this.row.current);
    }
  }

  /**
   *
   */
  public componentWillUnmount(): void {
    if (this.row.current) {
      this.props.observer.unobserve(this.row.current);
    }
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

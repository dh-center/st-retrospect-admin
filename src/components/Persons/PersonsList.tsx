import React, { ReactElement } from 'react';
import { createPaginationContainer, RelayPaginationProp } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { PersonsList_personsConnection as PersonsConnection } from './__generated__/PersonsList_personsConnection.graphql';
import { ENTITIES_PER_PAGE } from '../../constants';
import PaginationControl from 'rc-pagination';
import './PersonsList.css';
import 'rc-pagination/assets/index.css';
import locale from 'rc-pagination/lib/locale/ru_RU';
import TablePage from './TablePage';

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
 * State of PersonsList component
 */
interface State {
  /**
   * Boolean array represents what pages user sees
   */
  viewingPages: boolean[];

  /**
   * Page number that  user sees
   */
  currentPage: number;
}

/**
 * List with persons
 */
class PersonsList extends React.Component<Props, State> {
  /**
   * Observer for tracking pages that user sees
   */
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

    this.observer = new window.IntersectionObserver(this.observerCallback, {
      rootMargin: '-50%',
    });
  }

  /**
   * Rendering
   */
  public render(): ReactElement {
    const pagesCount = Math.ceil(this.props.personsConnection.persons.edges.length / ENTITIES_PER_PAGE);
    const sectionsList: ReactElement[] = [];

    for (let i = 1; i <= pagesCount; i++) {
      sectionsList.push(<TablePage
        key={i}
        pageNumber={i}
        observer={this.observer}
        personsConnection={this.props.personsConnection}/>);
    }

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
          {sectionsList}
        </table>
      </div>
    );
  }

  /**
   * Loading more persons
   */
  private loadMore = (): void => {
    this.props.relay.loadMore(ENTITIES_PER_PAGE);
  };

  /**
   * Scrolling to page
   *
   * @param current - page number
   */
  private goToPage = (current: number): void => {
    const personsCountToLoad = current * ENTITIES_PER_PAGE - this.props.personsConnection.persons.edges.length;

    if (personsCountToLoad > 0) {
      this.props.relay.loadMore(personsCountToLoad, () => {
        const element = document.getElementById('page-' + current);

        if (element) {
          element.scrollIntoView(true);
        }
      });
    } else {
      const element = document.getElementById('page-' + current);

      if (element) {
        element.scrollIntoView(true);
      }
    }
  };

  /**
   * Observer callback for tracking pages that user sees
   *
   * @param entries - entries to observe
   */
  private observerCallback = (entries: IntersectionObserverEntry[]): void => {
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

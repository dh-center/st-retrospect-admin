import React, { ReactElement } from 'react';
import { RelayPaginationProp } from 'react-relay';
import { ENTITIES_PER_PAGE } from '../../constants';
import PaginationControl from 'rc-pagination';
import './EntitiesList.css';
import 'rc-pagination/assets/index.css';
import locale from 'rc-pagination/lib/locale/ru_RU';
import TablePage from './TablePage';
import { EntityConnection } from '../../types/entities';
import {NavLink} from "react-router-dom";

/**
 * Props for EntitiesList component
 */
export interface EntitiesListProps<ENTITY_CONNECTION_TYPE> {
  /**
   * Entity connection
   */
  entityConnection: ENTITY_CONNECTION_TYPE;

  /**
   * Prop for accessing relay functionality
   */
  relay: RelayPaginationProp;
}

/**
 * State of EntitiesList component
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
 * List with entities
 */
class EntitiesList<ENTITY_CONNECTION_TYPE extends EntityConnection> extends React.Component<EntitiesListProps<ENTITY_CONNECTION_TYPE>, State> {
  /**
   * Observer for tracking pages that user sees
   */
  private readonly observer: IntersectionObserver;

  /**
   * @param props - component's props
   */
  constructor(props: EntitiesListProps<ENTITY_CONNECTION_TYPE>) {
    super(props);
    const pagesCount = Math.floor(props.entityConnection.entities.totalCount / ENTITIES_PER_PAGE) + 1;

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
    const pagesCount = Math.ceil(this.props.entityConnection.entities.edges.length / ENTITIES_PER_PAGE);
    const sectionsList: ReactElement[] = [];

    for (let i = 1; i <= pagesCount; i++) {
      sectionsList.push(<TablePage<ENTITY_CONNECTION_TYPE>
        key={i}
        pageNumber={i}
        observer={this.observer}
        entityConnection={this.props.entityConnection}/>);
    }

    return (
      <div className={'entities-page'}>
        <NavLink className="navigation__link" activeClassName="navigation__link--active" to="/quests/create">Create</NavLink>
        {this.props.entityConnection.entities.edges.length > 0 ? (
          <>
            <table className={'entities-page__table'}>
              <thead>
                <tr>
                  <th>№</th>
                  {Object.keys(this.props.entityConnection.entities.edges[0].node).map((key) => {
                    if (key === '__typename') {
                      return undefined;
                    }

                    return <th key={key}>{key}</th>;
                  }
                  )}
                </tr>
              </thead>
              {sectionsList}
            </table>
            <div className={'entities-page__page-control'}>
              <button onClick={this.loadMore} className={'entities-page__load-more-btn'}>Load more</button>
              <PaginationControl
                pageSize={ENTITIES_PER_PAGE}
                total={this.props.entityConnection.entities.totalCount}
                onChange={this.goToPage}
                locale={locale}
                current={this.state.currentPage + 1}
              />
            </div>
          </>
        ) : (<div>There is no entities in DataBase</div>)
        }

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
    const personsCountToLoad = current * ENTITIES_PER_PAGE - this.props.entityConnection.entities.edges.length;

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

export default EntitiesList;

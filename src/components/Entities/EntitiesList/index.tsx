import React, { ReactElement } from 'react';
import { RelayPaginationProp } from 'react-relay';
import { ENTITIES_PER_PAGE } from '../../../constants';
import PaginationControl from 'rc-pagination';
import './index.css';
import 'rc-pagination/assets/index.css';
import locale from 'rc-pagination/lib/locale/ru_RU';
import EntitiesListSection, { EntityRowProps } from './EntitiesListSection';
import { Entity, EntityConnection } from '../../../types/entities';
import { Table, Button, Spinner } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

/**
 * Props for EntitiesList component
 */
export interface EntitiesListProps<T extends EntityConnection> {
  /**
   * Entity connection
   */
  entityConnection: T;

  /**
   * Entity name for creating links
   */
  entityName: string;

  /**
   * Prop for accessing relay functionality
   */
  relay: RelayPaginationProp;

  /**
   * Custom list header
   */
  header?: React.ReactNode;

  /**
   * Custom entity table row
   */
  row?: (p: EntityRowProps<Entity<T>>) => React.ReactElement;
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

  /**
   * Represents loading state of new entities
   */
  isLoading: boolean;
}

/**
 * List with entities
 */
export default class EntitiesList<T extends EntityConnection> extends React.Component<EntitiesListProps<T>, State> {
  /**
   * Observer for tracking pages that user sees
   */
  private readonly observer: IntersectionObserver;

  /**
   * @param props - component's props
   */
  constructor(props: EntitiesListProps<T>) {
    super(props);
    const pagesCount = Math.floor(props.entityConnection.entities.totalCount / ENTITIES_PER_PAGE) + 1;

    this.state = {
      viewingPages: Array(pagesCount).fill(false),
      currentPage: 0,
      isLoading: false,
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
      sectionsList.push(<EntitiesListSection
        entityConnection={this.props.entityConnection}
        entityName={this.props.entityName}
        key={i}
        observer={this.observer}
        pageNumber={i}
        row={this.props.row}/>);
    }

    return (
      <div className='entities-page'>
        {this.props.entityConnection.entities.edges.length > 0 ? (
          <Table bordered className='m-0' hover responsive size='sm' striped>
            <thead>
              {this.props.header || (
                <tr>
                  <th>№</th>
                  {Object.keys(this.props.entityConnection.entities.edges[0].node).map((key) => {
                    if (key === '__typename' || key === 'id') {
                      return undefined;
                    }

                    return <th key={key}>{key}</th>;
                  }
                  )}
                </tr>

              )}
            </thead>
            {sectionsList}
          </Table>
        ) : (<div>There is no entities in DataBase</div>)
        }
        <div className='entities-page__page-control p-0 pb-2'>
          <div>
            <LinkContainer to={`/${this.props.entityName}/create`}>
              <Button className='m-1' variant='outline-success'>Create</Button>
            </LinkContainer>
            <Button disabled={!this.props.relay.hasMore()} onClick={this.loadMore} variant='outline-info'>
              {this.props.relay.isLoading() ? (
                <Spinner
                  animation='border'
                  aria-hidden='true'
                  as='span'
                  role='status'
                  size='sm'
                />
              ) : ('Load more')
              }

            </Button>
          </div>
          <div className='d-flex justify-content-center'>
            <PaginationControl
              current={this.state.currentPage + 1}
              locale={locale}
              onChange={this.goToPage}
              pageSize={ENTITIES_PER_PAGE}
              total={this.props.entityConnection.entities.totalCount}
            />
          </div>
        </div>
      </div>
    );
  }

  /**
   * Loading more persons
   */
  private loadMore = (): void => {
    this.setState({
      isLoading: true,
    });
    this.props.relay.loadMore(ENTITIES_PER_PAGE, () => {
      this.setState({
        isLoading: false,
      });
    });
  };

  /**
   * Scrolling to page
   *
   * @param current - page number
   */
  private goToPage = (current: number): void => {
    const personsCountToLoad = current * ENTITIES_PER_PAGE - this.props.entityConnection.entities.edges.length;

    if (personsCountToLoad > 0) {
      this.setState({
        isLoading: true,
      });

      this.props.relay.loadMore(personsCountToLoad, () => {
        const element = document.getElementById('page-' + current);

        if (element) {
          element.scrollIntoView(true);
        }
        this.setState({
          isLoading: false,
        });
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

import React, { ReactElement } from 'react';
import { ENTITIES_PER_PAGE } from '../../../constants';
import { EntityConnection } from '../../../types/entities';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

/**
 * Props for List component
 */
interface Props<ENTITY_CONNECTION_TYPE> {
  /**
   * Number of page
   */
  pageNumber: number;

  /**
   * Observer for tracking pages that user sees
   */
  observer: IntersectionObserver;

  /**
   * List with entities
   */
  entityConnection: ENTITY_CONNECTION_TYPE;

  /**
   * Entity name for creating links
   */
  entityName: string;
}

/**
 * Page of entity table
 */
export class EntitiesListSection<ENTITY_CONNECTION_TYPE extends EntityConnection> extends React.Component<RouteComponentProps & Props<ENTITY_CONNECTION_TYPE>> {
  /**
   * Ref to the components root HTML element
   */
  private htmlElement = React.createRef<HTMLTableSectionElement>();

  /**
   * React lifecycle hook
   * Setup intersection observer
   */
  public componentDidMount(): void {
    if (this.htmlElement.current) {
      this.props.observer.observe(this.htmlElement.current);
    }
  }

  /**
   * React lifecycle hook
   * Remove intersection observer
   */
  public componentWillUnmount(): void {
    if (this.htmlElement.current) {
      this.props.observer.unobserve(this.htmlElement.current);
    }
  }

  /**
   * Rendering
   */
  public render(): ReactElement {
    const entityList: ReactElement[] = [];

    for (let i = (this.props.pageNumber - 1) * ENTITIES_PER_PAGE; i < Math.min(this.props.pageNumber * ENTITIES_PER_PAGE, this.props.entityConnection.entities.edges.length); i++) {
      const entity = this.props.entityConnection.entities.edges[i].node;
      const row =
        <tr key={entity.id}>
          <td>{i + 1}</td>
          {Object.keys(entity).map((key) => {
            if (key === '__typename') {
              return undefined;
            }

            return (
              <td
                key={key}
                onClick={(): void => {
                  this.props.history.push(`/${this.props.entityName}/${entity.id}`);
                }}
              >
                {entity[key]}
              </td>
            );
          }
          )}
        </tr>;

      entityList.push(row);
    }

    return (
      <tbody ref={this.htmlElement} data-page={this.props.pageNumber} >
        <tr className='table-info'>
          <td colSpan={100} id={'page-' + this.props.pageNumber}>Page number {this.props.pageNumber}</td>
        </tr>
        {entityList}
      </tbody>
    );
  }
}

export default withRouter(EntitiesListSection);

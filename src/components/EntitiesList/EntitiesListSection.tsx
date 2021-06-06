import React from 'react';
import { ENTITIES_PER_PAGE } from '../../constants';
import { Entity, EntityConnection } from '../../types/entities';
import { withRouter, useHistory } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

/**
 * Props for entity row in table
 */
export interface EntityRowProps<T extends Entity> {
  /**
   * Entity name e.g. locations, persons, etc
   */
  entityName: string;

  /**
   * Entity data
   */
  entity: T;

  /**
   * Entity serial number
   */
  index: number;
}

/**
 * Default row representation with entity data
 *
 * @param props - props for rendering
 */
export function DefaultEntityRow<T extends Entity>(props: EntityRowProps<T>): React.ReactElement {
  const history = useHistory();
  const cells = Object.keys(props.entity).map((key) => {
    if (key === '__typename' || key === 'id') {
      return undefined;
    }

    const keyValue = key==='tags'
      ? props.entity.tags.map((tag: {value: string}) => tag.value).join(', ')
      : props.entity[key] && props.entity[key].toString();

    return (
      <td
        key={key}
      >
        {keyValue}
      </td>
    );
  });

  return <tr onClick={(): void => {
    history.push(`/${props.entityName}/${props.entity.id}`);
  }}>
    <td>{props.index + 1}</td>
    {cells}
  </tr>;
}

/**
 * Props for List component
 */
interface Props<T extends EntityConnection> {
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
  entityConnection: T;

  /**
   * Entity name for creating links
   */
  entityName: string;

  /**
   * Custom entity table row
   */
  row?: (p: EntityRowProps<Entity<T>>) => React.ReactElement;
}

/**
 * Page of entity table
 */
export class EntitiesListSection<T extends EntityConnection> extends React.Component<RouteComponentProps & Props<T>> {
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
  public render(): React.ReactElement {
    const entityList: React.ReactElement[] = [];

    for (let i = (this.props.pageNumber - 1) * ENTITIES_PER_PAGE; i < Math.min(this.props.pageNumber * ENTITIES_PER_PAGE, this.props.entityConnection.entities.edges.length); i++) {
      const entity = this.props.entityConnection.entities.edges[i].node;
      const RowElement = this.props.row || DefaultEntityRow;

      entityList.push(<RowElement entity={entity} entityName={this.props.entityName} index={i} key={entity.id}/>);
    }

    return (
      <tbody data-page={this.props.pageNumber} ref={this.htmlElement} >
        <tr className='table-info'>
          <td colSpan={100} id={'page-' + this.props.pageNumber}>Page number {this.props.pageNumber}</td>
        </tr>
        {entityList}
      </tbody>
    );
  }
}

export default withRouter(EntitiesListSection);

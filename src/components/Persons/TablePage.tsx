import React, { ReactElement } from 'react';
import { PersonsList_personsConnection as PersonsConnection } from './__generated__/PersonsList_personsConnection.graphql';
import { ENTITIES_PER_PAGE } from '../../constants';

/**
 * Props for PersonsList component
 */
interface Props {
  /**
   * Number of page
   */
  pageNumber: number;

  /**
   * Observer for tracking pages that user sees
   */
  observer: IntersectionObserver;

  /**
   * List with persons
   */
  personsConnection: PersonsConnection;
}

/**
 * Page of persons table
 */
export default class TablePage extends React.Component<Props> {
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
    const personsList: ReactElement[] = [];

    for (let i = (this.props.pageNumber - 1) * ENTITIES_PER_PAGE; i < Math.min(this.props.pageNumber * ENTITIES_PER_PAGE, this.props.personsConnection.persons.edges.length); i++) {
      const person = this.props.personsConnection.persons.edges[i].node;
      const row =
        <tr key={person.id}>
          <td>{i + 1}</td>
          <td>{person.id}</td>
          <td>{person.firstName}</td>
          <td>{person.lastName}</td>
          <td>{person.patronymic}</td>
        </tr>;

      personsList.push(row);
    }

    return (
      <tbody ref={this.htmlElement} data-page={this.props.pageNumber} >
        <tr>
          <td colSpan={5} id={'page-' + this.props.pageNumber}>Page number {this.props.pageNumber}</td>
        </tr>
        {personsList}
      </tbody>
    );
  }
}

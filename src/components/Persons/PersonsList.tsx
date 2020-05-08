import React, { ReactElement, useEffect } from 'react';
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
  const loadMore = (): void => {
    props.relay.loadMore(ENTITIES_PER_PAGE);
  };

  const goToPage = (current: number): void => {
    props.relay.loadMore(current * ENTITIES_PER_PAGE - props.personsConnection.persons.edges.length);
  };

  const onScroll = (e: Event): void => {
    console.log(document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return function cleanup(): void {
      window.removeEventListener('scroll', onScroll);
    };
  });

  // const pageCount = Math.floor(props.personsConnection.persons.totalCount / ENTITIES_PER_PAGE) + 1;

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
              <tr key={person.node.id}>
                <td>{index + 1}</td>
                <td>{person.node.id}</td>
                <td>{person.node.firstName}</td>
                <td>{person.node.lastName}</td>
                <td>{person.node.patronymic}</td>
              </tr>
              {(index + 1) % 25 === 0 &&
                  <tr key={(index + 1) / 25 + 1}>
                    <td colSpan={5}>Page number {(index + 1) / 25 + 1}</td>
                  </tr>
              }
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
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

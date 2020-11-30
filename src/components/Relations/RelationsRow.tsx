import React from 'react';
import { EntityRowProps } from '../EntitiesList/EntitiesListSection';
import { RelationsList_entityConnection } from './__generated__/RelationsList_entityConnection.graphql';
import { Entity } from '../../types/entities';
import { useHistory } from 'react-router';
import personsFullName from '../../utils/personsFullname';

/**
 * Displays relation row in relations list
 *
 * @param props - props with information about relation for displaying
 */
export default function RelationsRow(props: EntityRowProps<Entity<RelationsList_entityConnection>>): React.ReactElement {
  const history = useHistory();

  const onClick = (): void => {
    history.push(`/relations/${props.entity.id}`);
  };

  return (
    <tr onClick={onClick}>
      <td>{props.index + 1}</td>
      <td>{props.entity.person ? personsFullName(props.entity.person) : '—'}</td>
      <td>{props.entity.relationType ? props.entity.relationType.name : '—'}</td>
      <td>{props.entity.locationInstance ? props.entity.locationInstance.name : '—'}</td>
    </tr>
  );
}

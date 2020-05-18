import React from 'react';
import QuestInfo from '../Quests/Info';
import { commitMutation, GraphQLTaggedNode } from 'react-relay';
import { Entity, EntityTypes } from '../../types/entities';
import environment from '../../relay-env';

interface Props {
  entityType: EntityTypes;
}

/**
 * @param props
 */
export default function Create(props: Props): React.ReactElement {
  return (
    <div className={'create-entity'}>
      <form onSubmit={handleSubmit}>
        {props.entityType}
        <QuestInfo/>
        <button type={'submit'}>Save</button>
      </form>
    </div>
  );
}

/**
 * @param event
 */
function handleSubmit(event: React.FormEvent): void {
  event.preventDefault();
  console.log(event);
}

/**
 * @param mutation
 * @param entity
 */
function saveEntityToApi(mutation: GraphQLTaggedNode, entity: Entity): void {
  commitMutation(
    environment,
    {
      mutation,
      variables: {
        entity,
      },
    }
  );
}

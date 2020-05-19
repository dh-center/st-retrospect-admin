import React, { ChangeEvent, FormEvent, useState } from 'react';
import QuestInfo from '../Quests/Info';
import { commitMutation, GraphQLTaggedNode } from 'react-relay';
import { Entity, EntityTypes } from '../../types/entities';
import environment from '../../relay-env';

/**
 * Props of component
 */
interface Props {
  /**
   * Entity type (using for render Info component)
   */
  entityType: EntityTypes;
}

/**
 * Create entity component
 *
 * @param props - default props
 */
export default function Create(props: Props): React.ReactElement {
  /**
   * Entity object in state
   */
  const [entity, setEntity] = useState({});

  /**
   * Submit form handler
   *
   * @param event - submit event
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log(entity);
    // Save entity to API
  };

  /**
   * Update entity in state
   *
   * @param e - change event in form
   */
  const handleUpdateEntity = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const name = e.target.getAttribute('name') as string;
    const value = e.target.value;

    setEntity(prevState => ({
      ...prevState,
      [name]: value,
    })
    );
  };

  return (
    <div className={'create-entity'}>
      <form onSubmit={handleSubmit}>
        {props.entityType}
        <QuestInfo onChange={handleUpdateEntity}/>
        <button type={'submit'}>Save</button>
      </form>
    </div>
  );
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

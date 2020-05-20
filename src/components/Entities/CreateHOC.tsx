import { commitMutation, GraphQLTaggedNode } from 'react-relay';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Entity } from '../../types/entities';
import environment from '../../relay-env';

/**
 * Props of component
 */
interface InfoComponentProps {
  /**
   * Handler for changing input fields
   *
   * @param e - change event
   */
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const createComponent = <P extends object>(
  InfoComponent: React.ComponentType<InfoComponentProps>,
  mutation: GraphQLTaggedNode
): React.FC<P> => (props: P) => {
  /**
   * Entity object in state
   */
    const [entity, setEntity] = useState({});

    /**
     * @param mutation
     * @param entity
     */
    const saveEntityToApi = (mutation: GraphQLTaggedNode, entity: Entity): void => {
      commitMutation(
        environment,
        {
          mutation,
          variables: {
            entity,
          },
        }
      );
    };

    /**
     * Submit form handler
     *
     * @param event - submit event
     */
    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      saveEntityToApi(mutation, entity as Entity);
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
          <InfoComponent onChange={handleUpdateEntity}/>
          <button type={'submit'}>Save</button>
        </form>
      </div>
    );
  };

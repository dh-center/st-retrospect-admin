import { commitMutation, GraphQLTaggedNode } from 'react-relay';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import environment from '../../relay-env';
import notifier from 'codex-notifier';
import { useHistory, useLocation } from 'react-router-dom';

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

export function createComponent<P extends object>(
  InfoComponent: React.ComponentType<InfoComponentProps>,
  mutation: GraphQLTaggedNode
): React.FC<P>{
  return (props: P): React.ReactElement => {
    /**
     * Entity object in state
     */
    const [entity, setEntity] = useState({});

    const history = useHistory();
    const location = useLocation();

    /**
     * Save entity to API
     */
    const saveEntityToApi = (): void => {
      commitMutation(
        environment,
        {
          mutation,
          variables: {
            input: entity,
          },
          onCompleted: () => {
            notifier.show({
              message: 'Entity successfully saved',
              style: 'success',
              time: 5000,
            });
            const entitiesListPath = location.pathname.replace('/create', '');

            history.push(entitiesListPath);
          },
          onError: () => {
            notifier.show({
              message: 'Something went wrong',
              style: 'error',
              time: 5000,
            });
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
      saveEntityToApi();
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
}

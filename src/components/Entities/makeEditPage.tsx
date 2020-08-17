import { commitMutation, GraphQLTaggedNode } from 'react-relay';
import React, { FormEvent, useState } from 'react';
import environment from '../../relay-env';
import notifier from 'codex-notifier';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { EntityInfoComponentProps, OmitId } from '../../types/entities';

/**
 * Return edit component with Info fields
 *
 * @param InfoComponent - wrapped component
 * @param entity - entity for editing
 * @param mutation - updating mutation
 * @param componentName - info component name for debugging messages
 */
export default function makeEditPage<P extends object>(
  InfoComponent: React.ComponentType<EntityInfoComponentProps<OmitId<P>>>,
  entity: OmitId<P>,
  mutation: GraphQLTaggedNode,
  componentName?: string
): React.FC {
  componentName = InfoComponent.displayName ?? InfoComponent.name;

  /**
   * Wrapper for info-components for editing entities
   */
  function EditComponent(): React.ReactElement {
    /**
     * Editable entity object in state
     */
    const [editableEntity, setEntity] = useState(entity);

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
            input: editableEntity,
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

    return (
      <div className='d-flex justify-content-center'>
        <Form
          onSubmit={handleSubmit}
          className='p-2'
          style={{
            maxWidth: '800px',
            width: '100%',
          }}
        >
          <InfoComponent
            onChange={(e): void => setEntity(e)}
            entity={editableEntity}
          />
          <Button type={'submit'}>Save</Button>
          <Button variant={'outline-danger'}>Cancel</Button> {/* Push back */}
        </Form>
      </div>
    );
  }
  EditComponent.displayName = `makeEditPage(${componentName})`;

  return EditComponent;
}

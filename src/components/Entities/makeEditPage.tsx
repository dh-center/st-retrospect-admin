import { commitMutation, GraphQLTaggedNode } from 'react-relay';
import React, { FormEvent, useState } from 'react';
import environment from '../../relay-env';
import notifier from 'codex-notifier';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { EntityInfoComponentProps, OmitId } from '../../types/entities';

/**
 * Edit component props
 */
interface EditComponentProps<P> {
  entity: OmitId<P>;
}

/**
 * Return edit component with Info fields
 *
 * @param InfoComponent - wrapped component
 * @param mutation - updating mutation
 * @param componentName - info component name for debugging messages
 */
export default function makeEditPage<P extends object>(
  InfoComponent: React.ComponentType<EntityInfoComponentProps<OmitId<P>>>,
  mutation: GraphQLTaggedNode,
  componentName?: string
): React.FC<EditComponentProps<P>> {
  componentName = InfoComponent.displayName ?? InfoComponent.name;

  /**
   * Wrapper for info-components for editing entities
   *
   * @param props - Edit component props
   */
  function EditComponent(props: EditComponentProps<P>): React.ReactElement {
    /**
     * Editable entity object in state
     */
    const [editableEntity, setEntity] = useState(props.entity);

    const history = useHistory();
    const location = useLocation();

    /**
     * Push location back to entity view page
     */
    const pushLocationBack = (): void => {
      const entityListPath = location.pathname.replace('/edit', '');

      history.push(entityListPath);
    };

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
            pushLocationBack();
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
          className='p-2'
          onSubmit={handleSubmit}
          style={{
            maxWidth: '800px',
            width: '100%',
          }}
        >
          <InfoComponent
            entity={editableEntity}
            onChange={(e): void => setEntity(e)}
          />
          <Button className='m-1' type='submit'>Save</Button>
          <Button
            className='m-1'
            onClick={(event): void => pushLocationBack()}
            variant='outline-danger'
          >Cancel</Button>
        </Form>
      </div>
    );
  }
  EditComponent.displayName = `makeEditPage(${componentName})`;

  return EditComponent;
}

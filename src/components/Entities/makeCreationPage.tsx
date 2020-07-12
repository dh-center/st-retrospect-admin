import { commitMutation, GraphQLTaggedNode } from 'react-relay';
import React, { FormEvent, useState } from 'react';
import environment from '../../relay-env';
import notifier from 'codex-notifier';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { EntityInfoComponentProps, OmitId } from '../../types/entities';

/**
 * Return create component with Info fields
 *
 * @param InfoComponent - wrapped component
 * @param generateEntity
 * @param mutation - creating mutation
 */
export default function createComponent<P extends object>(
  InfoComponent: React.ComponentType<EntityInfoComponentProps<OmitId<P>>>,
  generateEntity: () => OmitId<P>,
  mutation: GraphQLTaggedNode
): React.FC {
  return (): React.ReactElement => {
    /**
     * Entity object in state
     */
    const [entity, setEntity] = useState(generateEntity());

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
            entity={entity}
          />
          <Button type={'submit'}>Save</Button>
        </Form>
      </div>
    );
  };
}

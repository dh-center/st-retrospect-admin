import React, { FormEvent, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import useUniqueId from '../../utils/useUniqueId';
import { createRefetchContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { LocationInstanceInfoDialog_locationInstance } from './__generated__/LocationInstanceInfoDialog_locationInstance.graphql';
import ContentWrapper from '../ContentWrapper';
import commitMutation from 'relay-commit-mutation-promise';
import environment from '../../relay-env';
import type {
  LocationInstanceInfoDialogUpdateMutation,
  LocationInstanceInfoDialogUpdateMutationResponse,
  UpdateLocationInstanceInput
} from './__generated__/LocationInstanceInfoDialogUpdateMutation.graphql';
import type {
  CreateLocationInstanceInput,
  LocationInstanceInfoDialogCreateMutation,
  LocationInstanceInfoDialogCreateMutationResponse
} from './__generated__/LocationInstanceInfoDialogCreateMutation.graphql';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import {
  LocationInstanceInfoDialogDeleteMutation,
  LocationInstanceInfoDialogDeleteMutationResponse
} from './__generated__/LocationInstanceInfoDialogDeleteMutation.graphql';
import notifier from 'codex-notifier';
import ImageGallery from '../utils/ImageGallery';
import ImageUploader from '../utils/ImageUploader';
import styles from './LocationInstanceInfoDialog.module.css';
import ArrayOfCustomSelects from '../utils/ArrayOfCustomSelects';
import {
  AddArchitectInput, LocationInstanceInfoDialogAddArchitectMutation,
  LocationInstanceInfoDialogAddArchitectMutationResponse
} from './__generated__/LocationInstanceInfoDialogAddArchitectMutation.graphql';
import {
  LocationInstanceInfoDialogRemoveArchitectMutation, LocationInstanceInfoDialogRemoveArchitectMutationResponse,
  RemoveArchitectInput
} from './__generated__/LocationInstanceInfoDialogRemoveArchitectMutation.graphql';
import PersonsCustomSelect from '../CustomSelects/PersonsCustomSelect';
import handleApiError from '../../utils/handleApiError';

/**
 * Union type for inputs for creating and updating location instances
 */
type LocationInstanceInputs = CreateLocationInstanceInput | UpdateLocationInstanceInput;

/**
 * Props for LocationInstanceInfoDialog
 */
interface Props {
  /**
   * Handler for hiding dialog
   */
  onHide(): void;

  /**
   * If true, dialog is visible
   */
  isShown: boolean;

  /**
   * Location instance to display
   * Null for location instance creating
   */
  locationInstance: LocationInstanceInfoDialog_locationInstance | null;
}

/**
 * Returns true if input is for updating location instance
 *
 * @param input - input to check
 */
function isUpdateInput(input: LocationInstanceInputs): input is UpdateLocationInstanceInput {
  return 'id' in input;
}

/**
 * Generates empty input for creating location instance
 *
 * @param locationId - location id new instance belongs to
 */
function generateLocationInstanceInput(locationId: string): CreateLocationInstanceInput {
  return {
    constructionDate: '',
    demolitionDate: '',
    description: '',
    endDate: '',
    name: '',
    startDate: '',
    source: '',
    locationId,
  };
}

/**
 * Generates empty array of architects
 */
function generateArchitects(): string[] {
  return [];
}

/**
 * Converts provided instance to input type
 *
 * @param instance - instance to convert. Null for instance creating
 * @param locationId - location id new instance belongs to
 */
function instanceToInput(instance: LocationInstanceInfoDialog_locationInstance | null, locationId: string): LocationInstanceInputs {
  if (!instance) {
    return generateLocationInstanceInput(locationId);
  }

  return {
    constructionDate: instance.constructionDate,
    demolitionDate: instance.demolitionDate,
    description: instance.description || '',
    source: instance.source || '',
    mainPhotoLink: instance.mainPhotoLink,
    photoLinks: [ ...instance.photoLinks || [] ],
    endDate: instance.endDate,
    name: instance.name || '',
    startDate: instance.startDate,
    id: instance.id,
  };
}

/**
 * Generates array of architects
 *
 * @param instance - current location instance
 */
function architectsToInput(instance: LocationInstanceInfoDialog_locationInstance | null): (string | null)[] {
  if (!instance) {
    return generateArchitects();
  }

  return instance.architects?.map(architect => architect?.id || null) || [];
}

/**
 * Mutation for creating LocationInstance
 *
 * @param input - input data for creating
 */
export function create(input: CreateLocationInstanceInput): Promise<LocationInstanceInfoDialogCreateMutationResponse> {
  return commitMutation<LocationInstanceInfoDialogCreateMutation>(environment, {
    mutation: graphql`
      mutation LocationInstanceInfoDialogCreateMutation($input: CreateLocationInstanceInput!) {
        locationInstances {
          create(input: $input) {
            recordId
            record {
              id
              location {
                ...LocationInfo_location
              }
            }
          }
        }
      }
    `,
    variables: { input },
  });
}

/**
 * Creates architect in api
 *
 * @param input - mutation input
 */
function createArchitect(input: AddArchitectInput): Promise<LocationInstanceInfoDialogAddArchitectMutationResponse> {
  return commitMutation<LocationInstanceInfoDialogAddArchitectMutation>(environment, {
    mutation: graphql`
      mutation LocationInstanceInfoDialogAddArchitectMutation($input: AddArchitectInput!) {
        locationInstances {
          addArchitect(input: $input) {
            recordId
          }
        }
      }
    `,
    variables: { input },
  });
}

/**
 * Removes architect from api
 *
 * @param input - mutation input
 */
function removeArchitect(input: RemoveArchitectInput): Promise<LocationInstanceInfoDialogRemoveArchitectMutationResponse> {
  return commitMutation<LocationInstanceInfoDialogRemoveArchitectMutation>(environment, {
    mutation: graphql`
      mutation LocationInstanceInfoDialogRemoveArchitectMutation($input: RemoveArchitectInput!) {
        locationInstances {
          removeArchitect(input: $input) {
            recordId
          }
        }
      }
    `,
    variables: { input },
  });
}

/**
 * Mutation for updating LocationInstance info
 *
 * @param input - input data for updating
 */
export function update(input: UpdateLocationInstanceInput): Promise<LocationInstanceInfoDialogUpdateMutationResponse> {
  return commitMutation<LocationInstanceInfoDialogUpdateMutation>(environment, {
    mutation: graphql`
      mutation LocationInstanceInfoDialogUpdateMutation($input: UpdateLocationInstanceInput!) {
        locationInstances {
          update(input: $input) {
            recordId
            record {
              id
              location {
                ...LocationInfo_location
              }
            }
          }
        }
      }
    `,
    variables: { input },
  });
}

/**
 * Mutation for deleting LocationInstance
 *
 * @param locationInstance - instance id to remove
 */
export function remove(locationInstance: LocationInstanceInfoDialog_locationInstance): Promise<LocationInstanceInfoDialogDeleteMutationResponse> {
  return commitMutation<LocationInstanceInfoDialogDeleteMutation>(environment, {
    mutation: graphql`
      mutation LocationInstanceInfoDialogDeleteMutation($id: GlobalId!) {
        locationInstances {
          delete(id: $id) {
            recordId
          }
        }
      }
    `,
    variables: { id: locationInstance.id },
    updater: (proxyStore) => {
      const locationProxy = proxyStore
        .get(locationInstance.location.id);

      if (!locationProxy) {
        return;
      }

      const instances = locationProxy.getLinkedRecords('instances');

      if (instances) {
        const newInstancesList = instances.filter(inst => inst.getDataID() !== locationInstance.id);

        locationProxy.setLinkedRecords(newInstancesList, 'instances');
      }

      proxyStore.delete(locationInstance.id);
    },
  });
}

/**
 * Dialog with location instance info
 *
 * @param props - props for component rendering
 */
function LocationInstanceInfoDialog(props: Props): React.ReactElement {
  const { id: locationId } = useParams<{id: string}>();
  const id = useUniqueId('location-instance-info-dialog');
  const [isEditing, setIsEditing] = useState(!props.locationInstance);
  const [input, setInput] = useState<LocationInstanceInputs>(instanceToInput(props.locationInstance, locationId));
  const [architectsInput, setArchitectsInput] = useState<(string | null)[]>(architectsToInput(props.locationInstance));

  useEffect(() => {
    setInput(instanceToInput(props.locationInstance, locationId));
    setArchitectsInput(architectsToInput(props.locationInstance));
    setIsEditing(!props.locationInstance);
  }, [props.locationInstance, locationId]);

  /**
   * Updates architects in API
   *
   * @param locationInstanceId - location instance id for creating new relations
   * @param oldArchitects - array of old architects
   * @param updatedArchitects - array of updated architects
   */
  const updateArchitects = async (locationInstanceId: string, oldArchitects: (string | null)[] = [], updatedArchitects: (string | null)[] = []): Promise<void> => {
    const updatedArchitectsSet = new Set(updatedArchitects);
    const oldArchitectsSet = new Set(oldArchitects);
    const architectsForDeleting = Array.from(oldArchitectsSet).filter(architect => !updatedArchitectsSet.has(architect));
    const architectsForCreating = Array.from(updatedArchitectsSet).filter(architect => !oldArchitectsSet.has(architect));

    await Promise.all(architectsForDeleting.map(async architect => {
      if (architect) {
        await removeArchitect({
          architectId: architect,
          locationInstanceId: locationInstanceId,
        });
      }
    }));

    await Promise.all(architectsForCreating.map(async architect => {
      if (architect) {
        await createArchitect({
          architectId: architect,
          locationInstanceId: locationInstanceId,
        });
      }
    }));
  };

  const submit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();
    if (isUpdateInput(input)) {
      try {
        const response = await update(input);

        /**
         * Update architects in database
         */
        await updateArchitects(
          response.locationInstances.update.recordId,
          props.locationInstance?.architects?.map(architect => architect?.id || null),
          architectsInput
        );

        notifier.show({
          message: `Successfully updated`,
          style: 'success',
          time: 5000,
        });
      } catch (error) {
        handleApiError(error);
      }
    } else {
      try {
        const locationInstance = await create(input);

        /**
         * Add architects to API
         */
        await updateArchitects(locationInstance.locationInstances.create.recordId, [], architectsInput);

        notifier.show({
          message: `Successfully created`,
          style: 'success',
          time: 5000,
        });
      } catch (error) {
        handleApiError(error);
      }
    }

    props.onHide();
  };

  const removeInstance = async (): Promise<void> => {
    if (props.locationInstance) {
      try {
        await remove(props.locationInstance);

        notifier.show({
          message: `Successfully deleted`,
          style: 'success',
          time: 5000,
        });
        props.onHide();
      } catch {
        notifier.show({
          message: 'Something went wrong',
          style: 'error',
          time: 5000,
        });
      }
    }
  };

  return (
    <Modal onHide={props.onHide} show={props.isShown} size='xl'>
      <ContentWrapper>
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Label htmlFor={id`name`}>Name</Form.Label>
            <Form.Control
              disabled={!isEditing}
              id={id`name`}
              onChange={(e) => {
                setInput({
                  ...input,
                  name: e.target.value,
                });
              }}
              type='text'
              value={input.name || ''}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor={id`description`}>Description</Form.Label>
            <Form.Control
              as='textarea'
              disabled={!isEditing}
              id={id`description`}
              onChange={(e) => {
                setInput({
                  ...input,
                  description: e.target.value,
                });
              }}
              rows={20}
              value={input.description || ''}

            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor={id`source`}>Source</Form.Label>
            <Form.Control
              disabled={!isEditing}
              id={id`source`}
              onChange={(e) => {
                setInput({
                  ...input,
                  source: e.target.value,
                });
              }}
              type='text'
              value={input.source || ''}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor={id`architects`}>Architects</Form.Label>
            <ArrayOfCustomSelects
              CustomSelect={PersonsCustomSelect}
              addButtonText='Add architect...'
              disabled={!isEditing}
              onChange={value => {
                setArchitectsInput(value);
              }}
              removeButtonText='Remove architect'
              value={architectsInput}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor={id`constructionDate`}>Construction date of location</Form.Label>
            <Form.Control
              disabled={!isEditing}
              id={id`constructionDate`}
              onChange={(e) => {
                setInput({
                  ...input,
                  constructionDate: e.target.value,
                });
              }}
              type='text'
              value={input.constructionDate || ''}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor={id`demolitionDate`}>Demolition date of location</Form.Label>
            <Form.Control
              disabled={!isEditing}
              id={id`demolitionDate`}
              onChange={(e) => {
                setInput({
                  ...input,
                  demolitionDate: e.target.value,
                });
              }}
              type='text'
              value={input.demolitionDate || ''}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor={id`startDate`}>Start date of the period of this location instance</Form.Label>
            <Form.Control
              disabled={!isEditing}
              id={id`startDate`}
              onChange={(e) => {
                setInput({
                  ...input,
                  startDate: e.target.value,
                });
              }}
              type='text'
              value={input.startDate || ''}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor={id`endDate`}>End date of the period of this location instance</Form.Label>
            <Form.Control
              disabled={!isEditing}
              id={id`endDate`}
              onChange={(e) => {
                setInput({
                  ...input,
                  endDate: e.target.value,
                });
              }}
              type='text'
              value={input.endDate || ''}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Main photo</Form.Label>
            <ImageGallery
              className={styles.mainPhoto}
              images={input.mainPhotoLink ? [ input.mainPhotoLink ] : undefined}
              onChange={([ link ]) => setInput({
                ...input,
                mainPhotoLink: link,
              })}
              viewOnly={!isEditing}
            />
            {
              isEditing &&
              <ImageUploader
                entityName='location'
                onImageUpload={(url) => {
                  setInput({
                    ...input,
                    mainPhotoLink: url,
                  });
                }}
              />
            }
          </Form.Group>
          <Form.Group>
            <Form.Label>Photos</Form.Label>
            <ImageGallery
              className={styles.photosGallery}
              images={input.photoLinks || undefined}
              onChange={(urls) => {
                setInput({
                  ...input,
                  photoLinks: urls,
                });
              }}
              viewOnly={!isEditing}
            />
            {
              isEditing &&
              <ImageUploader
                entityName='location'
                onImageUpload={(url) => {
                  setInput({
                    ...input,
                    photoLinks: [...(input.photoLinks || []), url],
                  });
                }}
              />
            }
          </Form.Group>
          <div>
            {!props.locationInstance &&
            <Button type='submit'>Create</Button>
            }
            {props.locationInstance &&
            <>
              {!isEditing &&
              <Button
                className='m-1'
                onClick={() => setIsEditing(true)}
                variant='outline-warning'
              >
                Edit
              </Button>
              }
              {
                isEditing &&
                <Button type='submit'>Save</Button>
              }
              <Button
                className='m-1'
                onClick={removeInstance}
                type='button'
                variant='outline-danger'
              >
                Delete
              </Button>
            </>
            }
          </div>
        </Form>
      </ContentWrapper>
    </Modal>
  );
}

export default createRefetchContainer(
  LocationInstanceInfoDialog,
  {
    locationInstance: graphql`
      fragment LocationInstanceInfoDialog_locationInstance on LocationInstance {
        id
        name
        description
        source
        constructionDate
        demolitionDate
        startDate
        endDate
        mainPhotoLink
        photoLinks
        architects {
          id
        }
        location {
          id
        }
      }
    `,
  },
  graphql`
    query LocationInstanceInfoDialogRefetchQuery($locationInstaceId: GlobalId!) {
      locationInstance(id: $locationInstaceId) {
        ...LocationInstanceInfoDialog_locationInstance
      }
    }
  `
);

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
import ArrayOfCustomSelects, { CustomSelects } from '../utils/ArrayOfCustomSelects';

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
    locationId,
  };
}

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
    mainPhotoLink: instance.mainPhotoLink,
    photoLinks: [ ...instance.photoLinks || [] ],
    endDate: instance.endDate,
    name: instance.name || '',
    startDate: instance.startDate,
    id: instance.id,
  };
}

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
  const { id: locationId } = useParams();
  const id = useUniqueId('location-instance-info-dialog');
  const [isEditing, setIsEditing] = useState(!props.locationInstance);
  const [input, setInput] = useState<LocationInstanceInputs>(instanceToInput(props.locationInstance, locationId));
  const [architectsInput, setArchitectsInput] = useState<(string | null)[]>(architectsToInput(props.locationInstance));

  useEffect(() => {
    setInput(instanceToInput(props.locationInstance, locationId));
    setIsEditing(!props.locationInstance);
  }, [props.locationInstance, locationId]);

  const submit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();
    if (isUpdateInput(input)) {
      try {
        await update(input);
        notifier.show({
          message: `Successfully updated`,
          style: 'success',
          time: 5000,
        });
      } catch {
        notifier.show({
          message: 'Something went wrong',
          style: 'error',
          time: 5000,
        });
      }
    } else {
      try {
        await create(input);
        notifier.show({
          message: `Successfully created`,
          style: 'success',
          time: 5000,
        });
      } catch {
        notifier.show({
          message: 'Something went wrong',
          style: 'error',
          time: 5000,
        });
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
            <Form.Label htmlFor={id`architects`}>Architects</Form.Label>
            <ArrayOfCustomSelects
              addButtonText='Add architect...'
              customSelect={CustomSelects.PERSONS}
              disabled={!isEditing}
              onChange={value => {
                setArchitectsInput(value);
              }}
              removeButtonText='Remove architect'
              value={architectsInput}
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

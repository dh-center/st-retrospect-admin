import React, { FormEvent, Suspense, useState } from 'react';
import { createFragmentContainer } from 'react-relay';
import Button from 'react-bootstrap/cjs/Button';
import Spinner from 'react-bootstrap/cjs/Spinner';
import graphql from 'babel-plugin-relay/macro';
import Input from '../utils/Input';
import { LabeledArrayOfInputs } from '../utils/ArrayOfInputs';
import { PersonEditForm_originalPerson } from './__generated__/PersonEditForm_originalPerson.graphql';
import deepCopy from '../../utils/deepCopy';
import ContentWrapper from '../ContentWrapper';
import { Form } from 'react-bootstrap';
import commitMutation from 'relay-commit-mutation-promise';
import environment from '../../appEnv';
import {
  PersonEditFormUpdateMutation,
  PersonEditFormUpdateMutationResponse,
  UpdatePersonInput
} from './__generated__/PersonEditFormUpdateMutation.graphql';
import notifier from 'codex-notifier';
import Textarea from '../utils/Textarea';
import ImageGallery from '../utils/ImageGallery';
import styles from './Images.module.css';
import ImageUploader from '../utils/ImageUploader';
import handleApiError from '../../utils/handleApiError';
import { LabeledTagsInput } from '../utils/TagsInput';
import useLeaveEditPage from '../../utils/useLeaveEditPage';

/**
 * Executes update mutation for person
 *
 * @param input - updated person object
 */
export function update(input: UpdatePersonInput): Promise<PersonEditFormUpdateMutationResponse> {
  return commitMutation<PersonEditFormUpdateMutation>(environment, {
    mutation: graphql`
      mutation PersonEditFormUpdateMutation($input: UpdatePersonInput!) {
        person {
          update(input: $input) {
            recordId
          }
        }
      }
    `,
    variables: { input },
  });
}

/**
 * Props for PersonEditForm
 */
interface Props {
  /**
   * Data about original person for editing
   */
  originalPerson: PersonEditForm_originalPerson;
}

/**
 * Form for editing persons
 *
 * @param props - props for component rendering
 */
function PersonEditForm(props: Props): React.ReactElement {
  const originalPerson = {
    ...props.originalPerson,
    tagIds: props.originalPerson.tags.map(tag => tag.id),
    tags: undefined,
  };
  const [input, setInput] = useState(() => deepCopy(originalPerson as UpdatePersonInput));

  const [isLoading, setLoadingStatus] = useState(false);

  const leaveEditPage = useLeaveEditPage();

  /**
   * Saves updated person to API
   *
   * @param e - submit form event
   */
  const updatePerson = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if ('id' in input) {
      setLoadingStatus(true);
      try {
        await update(input);
        notifier.show({
          message: 'Successfully updated',
          style: 'success',
          time: 5000,
        });
        setLoadingStatus(false);
        leaveEditPage();
      } catch (error) {
        setLoadingStatus(false);
        handleApiError(error);
      }
    }
  };

  return (
    <ContentWrapper>
      <Form onSubmit={updatePerson}>
        <Input
          label='Last name'
          onChange={value => setInput({
            ...input,
            lastName: value,
          })}
          required
          value={input.lastName || ''}
        />
        <Input
          label='First name'
          onChange={value => setInput({
            ...input,
            firstName: value,
          })}
          required
          value={input.firstName || ''}
        />
        <Input
          label='Patronymic'
          onChange={value => setInput({
            ...input,
            patronymic: value,
          })}
          value={input.patronymic || ''}
        />
        <Input
          label='Pseudonym'
          onChange={value => setInput({
            ...input,
            pseudonym: value,
          })}
          value={input.pseudonym || ''}
        />
        <ImageGallery
          className={styles.mainPhoto}
          images={input.mainPhotoLink ? [ input.mainPhotoLink ] : undefined}
          label='Main photo'
          onChange={([ link ]) => setInput({
            ...input,
            mainPhotoLink: link,
          })}
          viewOnly={false}
        />
        <ImageUploader
          entityName='person'
          onImageUpload={(url) => {
            setInput({
              ...input,
              mainPhotoLink: url,
            });
          }}
        />
        <LabeledArrayOfInputs
          addButtonText='Add profession...'
          label='Professions'
          onChange={value => setInput({
            ...input,
            professions: value,
          })}
          removeButtonText='Remove profession'
          value={input.professions || []}
        />
        <Textarea
          label='Description'
          onChange={value => setInput({
            ...input,
            description: value,
          })}
          value={input.description || ''}
        />
        <Input
          label='Birth date'
          onChange={value => setInput({
            ...input,
            birthDate: value,
          })}
          value={input.birthDate || ''}
        />
        <Input
          label='Death date'
          onChange={value => setInput({
            ...input,
            deathDate: value,
          })}
          value={input.deathDate || ''}
        />
        <ImageGallery
          className={styles.photosGallery}
          images={input.photoLinks || undefined}
          label='Photos'
          onChange={(urls) => {
            setInput({
              ...input,
              photoLinks: urls,
            });
          }}
          viewOnly={false}
        />
        <ImageUploader
          entityName='person'
          onImageUpload={(url) => {
            setInput({
              ...input,
              photoLinks: [...(input.photoLinks || []), url],
            });
          }}
        />
        <Suspense fallback='Loading tags...'>
          <LabeledTagsInput
            label='Tags'
            onChange={value => {
              setInput({
                ...input,
                tagIds: value,
              });
            }}
            value={input.tagIds || []}
          />
        </Suspense>
        <Input
          label='Wiki link'
          onChange={value => setInput({
            ...input,
            wikiLink: value,
          })}
          value={input.wikiLink || ''}
        />
        <div>
          <Button
            className='m-1'
            type='submit'
          >
            {isLoading
              ? (
                <Spinner
                  animation='border'
                  aria-hidden='true'
                  as='span'
                  role='status'
                  size='sm'
                />
              )
              : ('Save')}
          </Button>
          <Button
            className='m-1'
            onClick={() => leaveEditPage()}
            variant='outline-danger'
          >
            Cancel
          </Button>
        </div>
      </Form>
    </ContentWrapper>
  );
}

export default createFragmentContainer(
  PersonEditForm,
  {
    originalPerson: graphql`
      fragment PersonEditForm_originalPerson on Person {
        id
        lastName
        firstName
        patronymic
        pseudonym
        mainPhotoLink
        professions
        description
        birthDate
        deathDate
        photoLinks
        wikiLink
        tags {
          id
        }
      }
    `,
  }
);

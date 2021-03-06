import React, { FormEvent, useState, Suspense } from 'react';
import { useHistory } from 'react-router-dom';
import notifier from 'codex-notifier';
import ContentWrapper from '../ContentWrapper';
import Button from 'react-bootstrap/Button';
import { Form, Spinner } from 'react-bootstrap';
import commitMutation from 'relay-commit-mutation-promise';
import environment from '../../appEnv';
import {
  CreatePersonInput,
  PersonCreateMutation,
  PersonCreateMutationResponse
} from './__generated__/PersonCreateMutation.graphql';
import graphql from 'babel-plugin-relay/macro';
import Input from '../utils/Input';
import Textarea from '../utils/Textarea';
import { LabeledArrayOfInputs } from '../utils/ArrayOfInputs';
import ImageGallery from '../utils/ImageGallery';
import styles from './Images.module.css';
import ImageUploader from '../utils/ImageUploader';
import handleApiError from '../../utils/handleApiError';
import { LabeledTagsInput } from '../utils/TagsInput';

/**
 * Generates input data for creating new person
 */
function generatePersonInput(): CreatePersonInput {
  return {
    firstName: '',
    lastName: '',
    patronymic: '',
    pseudonym: '',
    mainPhotoLink: null,
    cardPhotoLink: null,
    professions: [],
    description: '',
    birthDate: '',
    deathDate: '',
    photoLinks: [],
    wikiLink: '',
    tagIds: [],
  };
}

/**
 * Mutation for creating new person
 *
 * @param input - input data for creating
 */
function create(input: CreatePersonInput): Promise<PersonCreateMutationResponse> {
  return commitMutation<PersonCreateMutation>(environment, {
    mutation: graphql`
      mutation PersonCreateMutation($input: CreatePersonInput!) {
        person {
          create(input: $input) {
            recordId
          }
        }
      }
    `,
    variables: { input },
  });
}

/**
 * Component implements person create
 */
export default function PersonCreate(): React.ReactElement {
  const [input, setInput] = useState<CreatePersonInput>(generatePersonInput);
  const [isLoading, setLoadingStatus] = useState(false);
  const history = useHistory();

  /**
   * Saves created person to API
   *
   * @param e - form submit event
   */
  const savePersonToApi = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (!input) {
      return;
    }

    setLoadingStatus(true);
    try {
      await create(input);
      notifier.show({
        message: `Successfully created`,
        style: 'success',
        time: 5000,
      });
      setLoadingStatus(false);
      history.push('/persons');
    } catch (error) {
      setLoadingStatus(false);
      handleApiError(error);
    }
  };

  return (
    <ContentWrapper>
      <Form onSubmit={savePersonToApi}>
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
        <ImageGallery
          className={styles.mainPhoto}
          images={input.cardPhotoLink ? [ input.cardPhotoLink ] : undefined}
          label='Card photo'
          onChange={([ link ]) => setInput({
            ...input,
            cardPhotoLink: link,
          })}
          viewOnly={false}
        />
        <ImageUploader
          entityName='person'
          onImageUpload={(url) => {
            setInput({
              ...input,
              cardPhotoLink: url,
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
            : 'Create'}
        </Button>
      </Form>
    </ContentWrapper>
  );
}

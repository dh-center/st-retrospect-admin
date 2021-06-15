import React, { useState } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import environment from '../../appEnv';
import { useParams } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Spinner } from 'react-bootstrap';
import { PersonViewQuery } from './__generated__/PersonViewQuery.graphql';
import notifier from 'codex-notifier';
import { Redirect, useHistory } from 'react-router-dom';
import commitMutation from 'relay-commit-mutation-promise';
import {
  PersonViewDeleteMutation,
  PersonViewDeleteMutationResponse
} from './__generated__/PersonViewDeleteMutation.graphql';
import ContentWrapper from '../ContentWrapper';
import LabeledText from '../utils/LabeledText';
import LoadingPlaceholder from '../utils/LoadingPlaceholder';
import ImageGallery from '../utils/ImageGallery';
import styles from './Images.module.css';
import handleApiError from '../../utils/handleApiError';

/**
 * Removes person by its id
 *
 * @param id - person id to remove
 */
function remove(id: string): Promise<PersonViewDeleteMutationResponse> {
  return commitMutation<PersonViewDeleteMutation>(environment, {
    mutation: graphql`
      mutation PersonViewDeleteMutation($id: GlobalId!) {
        person {
          delete(id: $id) {
            recordId
          }
        }
      }
    `,
    variables: { id },
  });
}

function PersonView(): React.ReactElement {
  const { id } = useParams<{id: string}>();
  const [isDeleting, setDeletingStatus] = useState(false);
  const history = useHistory();

  /**
   * Creates notifier window and executes delete mutation for current person
   */
  const removePerson = async (): Promise<void> => {
    notifier.show({
      message: 'Are you sure you want to delete this person?',
      type: 'confirm',
      style: 'error',
      okText: 'Yes',
      okHandler: async () => {
        setDeletingStatus(true);
        try {
          await remove(id);
          setDeletingStatus(false);
          history.push('/persons');
        } catch (error) {
          setDeletingStatus(false);
          handleApiError(error);
        }
      },
    });
  };

  return (
    <QueryRenderer<PersonViewQuery>
      environment={environment}
      query={graphql`
        query PersonViewQuery($id: GlobalId!) {
          person(id: $id) {
            id
            lastName
            firstName
            patronymic
            pseudonym
            mainPhotoLink
            cardPhotoLink
            professions
            description
            birthDate
            deathDate
            photoLinks
            wikiLink
            tags {
              value
            }
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          return <div>Error</div>;
        }

        if (!props) {
          return <LoadingPlaceholder
            alt='Loading person...'
          />;
        }

        if (!props.person) {
          notifier.show({
            message: `Person with id "${id}" wasn't found`,
            style: 'error',
            time: 5000,
          });

          return <Redirect to='/persons'/>;
        }

        return (
          <ContentWrapper>
            <div>
              <LabeledText
                content={props.person.lastName}
                label='Last name'
              />
              <LabeledText
                content={props.person.firstName}
                label='First name'
              />
              <LabeledText
                content={props.person.patronymic}
                label='Patronymic'
              />
              <LabeledText
                content={props.person.pseudonym}
                label='Pseudonym'
              />
              <ImageGallery
                className={styles.mainPhoto}
                images={props.person.mainPhotoLink ? [ props.person.mainPhotoLink ] : undefined}
                label='Main photo'
                viewOnly
              />
              <ImageGallery
                className={styles.mainPhoto}
                images={props.person.cardPhotoLink ? [ props.person.cardPhotoLink ] : undefined}
                label='Card photo'
                viewOnly
              />
              <LabeledText
                content={props.person.professions
                  ?.filter(profession => profession !== null)
                  .join('; ')}
                label='Professions'
              />
              <LabeledText
                content={props.person.description}
                label='Description'
              />
              <LabeledText
                content={props.person.birthDate}
                label='Birth date'
              />
              <LabeledText
                content={props.person.deathDate}
                label='Death date'
              />
              <ImageGallery
                className={styles.photosGallery}
                images={props.person.photoLinks?.filter(photoLink => photoLink) as string[] || undefined}
                label='Photos'
                viewOnly
              />
              <LabeledText
                content={props.person.tags
                  .map(tag => tag.value)
                  .join('; ')}
                label='Tags'
              />
              <LabeledText
                content={props.person.wikiLink}
                label='Wiki links'
              />
            </div>
            <div>
              <LinkContainer to={`/persons/${id}/edit`}>
                <Button className='m-1' variant='outline-warning'>Edit</Button>
              </LinkContainer>
              <Button className='m-1' onClick={() => removePerson()} variant='outline-danger'>
                {isDeleting
                  ? (
                    <Spinner
                      animation='border'
                      aria-hidden='true'
                      as='span'
                      role='status'
                      size='sm'
                    />
                  )
                  : ('Delete')}
              </Button>
            </div>
          </ContentWrapper>
        );
      }}
      variables={{ id }}
    />
  );
}

export default PersonView;

import React, { ReactElement, useState } from 'react';
import commitMutation from 'relay-commit-mutation-promise';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';
import {
  RelationTypeEditMutation,
  RelationTypeEditMutationResponse, UpdateRelationTypeInput
} from './__generated__/RelationTypeEditMutation.graphql';
import { useParams } from 'react-router';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import notifier from 'codex-notifier';
import { QueryRenderer } from 'react-relay';
import LoadingPlaceholder from '../utils/LoadingPlaceholder';
import ContentWrapper from '../ContentWrapper';
import { Button, Spinner } from 'react-bootstrap';
import { RelationTypeEditQuery } from './__generated__/RelationTypeEditQuery.graphql';
import Input from '../utils/Input';
import { LabeledArrayOfInputs } from '../utils/ArrayOfInputs';

/**
 * Mutation for save edited relation type
 *
 * @param input - input data for saving
 */
function update(input: UpdateRelationTypeInput): Promise<RelationTypeEditMutationResponse> {
  return commitMutation<RelationTypeEditMutation>(environment, {
    mutation: graphql`
      mutation RelationTypeEditMutation($input: UpdateRelationTypeInput!) {
        relationType {
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
 * Displays edit component for relation type
 */
export default function RelationTypeEdit(): ReactElement {
  const { id } = useParams();

  const [input, setInput] = useState<UpdateRelationTypeInput | null>(null);
  const [isLoading, setLoadingStatus] = useState(false);

  const history = useHistory();
  const location = useLocation();

  /**
   * Push location back to entity view page
   */
  const pushLocationBack = (): void => {
    const entityPath = location.pathname.replace('/edit', '');

    history.push(entityPath);
  };

  /**
   * Saves updated relation type to API
   */
  const saveRelationTypeToApi = async (): Promise<void> => {
    if (!input) {
      notifier.show({
        message: 'Please make changes in relation type',
        style: 'error',
        time: 5000,
      });

      return;
    }

    setLoadingStatus(true);
    try {
      await update(input);
      notifier.show({
        message: `Relation type successfully saved`,
        style: 'success',
        time: 5000,
      });
      setLoadingStatus(false);
      pushLocationBack();
    } catch {
      setLoadingStatus(false);
      notifier.show({
        message: 'Something went wrong',
        style: 'error',
        time: 5000,
      });
    }
  };

  return (
    <QueryRenderer<RelationTypeEditQuery>
      environment={environment}
      query={graphql`
        query RelationTypeEditQuery($id: GlobalId!) {
          relationType(id: $id) {
            id
            name
            synonyms
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          return <div>Error</div>;
        }

        if (!props) {
          return <LoadingPlaceholder
            alt='Loading relation type...'
          />;
        }

        if (!props.relationType) {
          notifier.show({
            message: `Relation type with id "${id}" wasn't found`,
            style: 'error',
            time: 5000,
          });

          return <Redirect to='/relationTypes'/>;
        }

        return (
          <ContentWrapper>
            <Input
              label='Name'
              onChange={value => setInput({
                ...input,
                id,
                name: value,
              })}
              required
              value={input?.name || props.relationType.name}
            />
            <LabeledArrayOfInputs
              addButtonText='Add synonym...'
              label='Synonyms'
              onChange={value => setInput({
                ...input,
                id,
                synonyms: value,
              })}
              removeButtonText='Remove synonym'
              /**
               * Converts ReadonlyArray to simple array
               */
              value={input?.synonyms || props.relationType.synonyms.concat()}
            />
            <div>
              <Button
                className='m-1'
                onClick={() => saveRelationTypeToApi()}
                type='submit'
              >
                {isLoading ? (
                  <Spinner
                    animation='border'
                    aria-hidden='true'
                    as='span'
                    role='status'
                    size='sm'
                  />
                ) : ('Save')}
              </Button>
              <Button
                className='m-1'
                onClick={() => pushLocationBack()}
                variant='outline-danger'
              >
                Cancel
              </Button>
            </div>
          </ContentWrapper>
        );
      }}
      variables={{ id }}
    />
  );
}

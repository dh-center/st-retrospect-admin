import React, { ReactElement, useState } from 'react';
import { useParams } from 'react-router';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import notifier from 'codex-notifier';
import commitMutation from 'relay-commit-mutation-promise';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';
import {
  RelationEditMutation,
  RelationEditMutationResponse,
  UpdateRelationInput
} from './__generated__/RelationEditMutation.graphql';
import { QueryRenderer } from 'react-relay';
import ContentWrapper from '../ContentWrapper';
import { Button, Spinner } from 'react-bootstrap';
import { RelationEditQuery } from './__generated__/RelationEditQuery.graphql';
import { LabeledPersonsCustomSelect } from '../CustomSelects/PersonsCustomSelect';
import { LabeledRelationTypesCustomSelect } from '../CustomSelects/RelationTypesCustomSelect';
import { LabeledLocationInstancesCustomSelect } from '../CustomSelects/LocationInstancesCustomSelect';

/**
 * Mutation for save edited relation
 *
 * @param input - input data for saving
 */
function update(input: UpdateRelationInput): Promise<RelationEditMutationResponse> {
  return commitMutation<RelationEditMutation>(environment, {
    mutation: graphql`
      mutation RelationEditMutation($input: UpdateRelationInput!) {
        relation {
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
 * Displays edit component for relations
 */
export default function RelationEdit(): ReactElement {
  const { id } = useParams();

  const [input, setInput] = useState<UpdateRelationInput | null>(null);
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
   * Saves updated relation to API
   */
  const saveRelationToApi = async (): Promise<void> => {
    if (!input) {
      notifier.show({
        message: 'Please make changes in relation',
        style: 'error',
        time: 5000,
      });

      return;
    }

    setLoadingStatus(true);
    try {
      await update(input);
      notifier.show({
        message: `Relation successfully saved`,
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
    <QueryRenderer<RelationEditQuery>
      environment={environment}
      query={graphql`
        query RelationEditQuery($id: GlobalId!) {
          relation(id: $id) {
            id
            person {
              id
            }
            relationType {
              id
            }
            locationInstance {
              id
            }
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          return <div>Error</div>;
        }

        if (!props) {
          return <div>Loading...</div>;
        }

        if (!props.relation) {
          notifier.show({
            message: `Relation with id "${id}" wasn't found`,
            style: 'error',
            time: 5000,
          });

          return <Redirect to='/relations'/>;
        }

        return (
          <ContentWrapper>
            <LabeledPersonsCustomSelect
              label='Person'
              onChange={(selected) => {
                setInput({
                  ...input,
                  id,
                  personId: selected,
                });
              }}
              value={input?.personId || props.relation.person?.id}
            />
            <LabeledRelationTypesCustomSelect
              label='Relation type'
              onChange={(selected) => {
                setInput({
                  ...input,
                  id,
                  relationId: selected,
                });
              }}
              value={input?.relationId || props.relation.relationType?.id}
            />
            <LabeledLocationInstancesCustomSelect
              label='Location instance'
              onChange={(selected) => {
                setInput({
                  ...input,
                  id,
                  locationInstanceId: selected,
                });
              }}
              value={input?.locationInstanceId || props.relation.locationInstance?.id}
            />
            <div>
              <Button
                className='m-1'
                onClick={() => saveRelationToApi()}
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

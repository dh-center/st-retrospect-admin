import commitMutation from 'relay-commit-mutation-promise';
import environment from '../../relay-env';
import graphql from 'babel-plugin-relay/macro';
import {
  RelationEditFormUpdateMutation,
  RelationEditFormUpdateMutationResponse, UpdateRelationInput
} from './__generated__/RelationEditFormUpdateMutation.graphql';
import React, { FormEvent, useState } from 'react';
import deepCopy from '../../utils/deepCopy';
import { useHistory, useLocation } from 'react-router-dom';
import notifier from 'codex-notifier';
import ContentWrapper from '../ContentWrapper';
import { Form } from 'react-bootstrap';
import Textarea from '../utils/Textarea';
import Button from 'react-bootstrap/cjs/Button';
import Spinner from 'react-bootstrap/cjs/Spinner';
import { createFragmentContainer } from 'react-relay';
import { LabeledPersonsCustomSelect } from '../CustomSelects/PersonsCustomSelect';
import { LabeledRelationTypesCustomSelect } from '../CustomSelects/RelationTypesCustomSelect';
import { LabeledLocationInstancesCustomSelect } from '../CustomSelects/LocationInstancesCustomSelect';
import { RelationEditForm_originalRelation } from './__generated__/RelationEditForm_originalRelation.graphql';
import Input from '../utils/Input';

/**
 * Mutation for save edited relation
 *
 * @param input - input data for saving
 */
function update(input: UpdateRelationInput): Promise<RelationEditFormUpdateMutationResponse> {
  return commitMutation<RelationEditFormUpdateMutation>(environment, {
    mutation: graphql`
      mutation RelationEditFormUpdateMutation($input: UpdateRelationInput!) {
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
 * Props for RelationEditForm
 */
interface Props {
  /**
   * Data about original relation for editing
   */
  originalRelation: RelationEditForm_originalRelation;
}

/**
 * Form for editing persons
 *
 * @param props - props for component rendering
 */
function RelationEditForm(props: Props): React.ReactElement {
  const [input, setInput] = useState(() => {
    return deepCopy({
      id: props.originalRelation.id,
      quote: props.originalRelation.quote,
      locationInstanceId: props.originalRelation.locationInstance?.id,
      personId: props.originalRelation.person?.id,
      relationId: props.originalRelation.relationType?.id,
      link: props.originalRelation.link,
      startDate: props.originalRelation.startDate,
      endDate: props.originalRelation.endDate,
    } as UpdateRelationInput);
  });

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
   *
   * @param e - submit form event
   */
  const saveRelationToApi = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if ('id' in input) {
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
    }
  };

  return (
    <ContentWrapper>
      <Form onSubmit={saveRelationToApi}>
        <LabeledPersonsCustomSelect
          label='Person'
          onChange={(selected) => {
            setInput({
              ...input,
              personId: selected,
            });
          }}
          value={input.personId || undefined}
        />
        <LabeledRelationTypesCustomSelect
          label='Relation type'
          onChange={(selected) => {
            setInput({
              ...input,
              relationId: selected,
            });
          }}
          value={input.relationId || undefined}
        />
        <LabeledLocationInstancesCustomSelect
          label='Location instance'
          onChange={(selected) => {
            setInput({
              ...input,
              locationInstanceId: selected,
            });
          }}
          value={input.locationInstanceId || undefined}
        />
        <Input
          label='Start date'
          onChange={(value) => {
            setInput({
              ...input,
              startDate: value,
            });
          }}
          value={input.startDate || ''}
        />
        <Input
          label='End date'
          onChange={(value) => {
            setInput({
              ...input,
              endDate: value,
            });
          }}
          value={input.endDate || ''}
        />
        <Textarea
          label='Quote'
          onChange={(value) => {
            setInput({
              ...input,
              quote: value,
            });
          }}
          value={input.quote || ''}
        />
        <Input
          label='Link'
          onChange={(value) => {
            setInput({
              ...input,
              link: value,
            });
          }}
          value={input.link || ''}
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
            onClick={() => pushLocationBack()}
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
  RelationEditForm,
  {
    originalRelation: graphql`
      fragment RelationEditForm_originalRelation on Relation {
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
        startDate
        endDate
        quote
        link
      }
    `,
  }
);

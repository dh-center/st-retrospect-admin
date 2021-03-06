import React, { FormEvent, useState } from 'react';
import {
  RelationTypeEditFormMutation, RelationTypeEditFormMutationResponse,
  UpdateRelationTypeInput
} from './__generated__/RelationTypeEditFormMutation.graphql';
import environment from '../../appEnv';
import commitMutation from 'relay-commit-mutation-promise';
import graphql from 'babel-plugin-relay/macro';
import { useHistory, useLocation } from 'react-router-dom';
import notifier from 'codex-notifier';
import ContentWrapper from '../ContentWrapper';
import Input from '../utils/Input';
import { createFragmentContainer } from 'react-relay';
import deepCopy from '../../utils/deepCopy';
import Button from 'react-bootstrap/cjs/Button';
import Spinner from 'react-bootstrap/cjs/Spinner';
import { LabeledArrayOfInputs } from '../utils/ArrayOfInputs';
import { RelationTypeEditForm_originalRelationType } from './__generated__/RelationTypeEditForm_originalRelationType.graphql';
import { Form } from 'react-bootstrap';
import handleApiError from '../../utils/handleApiError';

/**
 * Mutation for save edited relation type
 *
 * @param input - input data for saving
 */
function update(input: UpdateRelationTypeInput): Promise<RelationTypeEditFormMutationResponse> {
  return commitMutation<RelationTypeEditFormMutation>(environment, {
    mutation: graphql`
      mutation RelationTypeEditFormMutation($input: UpdateRelationTypeInput!) {
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
 * Props for RelationTypeEditForm
 */
interface Props {
  /**
   * Original relation type for editing
   */
  originalRelationType: RelationTypeEditForm_originalRelationType;
}

/**
 * Form for editing relation type properties
 *
 * @param props - props for component rendering
 */
export function RelationTypeEditForm(props: Props): React.ReactElement {
  const [input, setInput] = useState<UpdateRelationTypeInput>(() => deepCopy(props.originalRelationType));
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
   *
   * @param e - submit form event
   */
  const saveRelationTypeToApi = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      setLoadingStatus(true);
      await update(input);
      notifier.show({
        message: `Relation type successfully saved`,
        style: 'success',
        time: 5000,
      });
      setLoadingStatus(false);
      pushLocationBack();
    } catch (error) {
      setLoadingStatus(false);
      handleApiError(error);
    }
  };

  return (
    <ContentWrapper>
      <Form onSubmit={saveRelationTypeToApi}>
        <Input
          label='Name'
          onChange={value => setInput({
            ...input,
            name: value,
          })}
          required
          value={input.name || ''}
        />
        <LabeledArrayOfInputs
          addButtonText='Add synonym...'
          label='Synonyms'
          onChange={value => setInput({
            ...input,
            synonyms: value,
          })}
          removeButtonText='Remove synonym'
          value={input.synonyms || []}
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
  RelationTypeEditForm,
  {
    originalRelationType: graphql`
        fragment RelationTypeEditForm_originalRelationType on RelationType {
          id
          name
          synonyms
        }
    `,
  }
);

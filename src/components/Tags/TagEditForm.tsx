import commitMutation from 'relay-commit-mutation-promise';
import environment from '../../appEnv';
import graphql from 'babel-plugin-relay/macro';
import {
  TagEditFormMutation,
  TagEditFormMutationResponse,
  UpdateTagInput
} from './__generated__/TagEditFormMutation.graphql';
import React, { FormEvent, ReactElement, useState } from 'react';
import deepCopy from '../../utils/deepCopy';
import { useHistory, useLocation } from 'react-router-dom';
import notifier from 'codex-notifier';
import handleApiError from '../../utils/handleApiError';
import ContentWrapper from '../ContentWrapper';
import { Form } from 'react-bootstrap';
import Input from '../utils/Input';
import Button from 'react-bootstrap/cjs/Button';
import Spinner from 'react-bootstrap/cjs/Spinner';
import { createFragmentContainer } from 'react-relay';
import { TagEditForm_originalTag } from './__generated__/TagEditForm_originalTag.graphql';

/**
 * Mutation for save edited tag
 *
 * @param input - input data for saving
 */
function update(input: UpdateTagInput): Promise<TagEditFormMutationResponse> {
  return commitMutation<TagEditFormMutation>(environment, {
    mutation: graphql`
      mutation TagEditFormMutation($input: UpdateTagInput!) {
        tag {
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
 * Props of TagEditForm component
 */
interface TagEditFormProps {
  /**
   * Original tag for editing
   */
  originalTag: TagEditForm_originalTag;
}

/**
 * Form for editing tag properties
 *
 * @param props - props for component rendering
 */
export function TagEditForm(props: TagEditFormProps): ReactElement {
  const [input, setInput] = useState<UpdateTagInput>(() => deepCopy(props.originalTag));
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
   * Saves updated tag to API
   *
   * @param e - submit form event
   */
  const saveTagToApi = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      setLoadingStatus(true);
      await update(input);
      notifier.show({
        message: `Tag successfully saved`,
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
      <Form onSubmit={saveTagToApi}>
        <Input
          label='Value'
          onChange={value => setInput({
            ...input,
            value: value,
          })}
          required
          value={input.value || ''}
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
  TagEditForm,
  {
    originalTag: graphql`
      fragment TagEditForm_originalTag on Tag {
        id
        value
      }
    `,
  }
);

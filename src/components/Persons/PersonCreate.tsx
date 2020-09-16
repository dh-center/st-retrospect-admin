import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import notifier from 'codex-notifier';
import ContentWrapper from '../ContentWrapper';
import Button from 'react-bootstrap/Button';
import { Spinner } from 'react-bootstrap';
import PersonInfo, { create } from './PersonInfo';
import { CreatePersonInput } from './__generated__/PersonInfoCreateMutation.graphql';

/**
 *
 */
export default function PersonCreate(): React.ReactElement {
  const [input, setInput] = useState<CreatePersonInput | null>(null);
  const [isLoading, setLoadingStatus] = useState(false);
  const history = useHistory();

  /**
   * Saves created person to API
   */
  const savePersonToApi = async (): Promise<void> => {
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
    <ContentWrapper>
      <PersonInfo
        onChange={setInput}
        person={null}
      />
      <Button
        className='m-1'
        onClick={() => savePersonToApi()}
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
        ) : 'Create'}
      </Button>
    </ContentWrapper>
  );
}

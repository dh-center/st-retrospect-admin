import { ReactElement, useEffect, useState } from 'react';
import graphql from 'babel-plugin-relay/macro';
import Button from 'react-bootstrap/Button';
import LabeledText from '../utils/LabeledText';
import ContentWrapper from '../ContentWrapper';
import Form from 'react-bootstrap/Form';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import { useHistory, useParams } from 'react-router';
import { UserEditQuery } from './__generated__/UserEditQuery.graphql';
import { UserEditMutation } from './__generated__/UserEditMutation.graphql';
import Spinner from 'react-bootstrap/Spinner';
import { useLocation } from 'react-router-dom';

const userEditQuery = graphql`
  query UserEditQuery ($id: GlobalId!) {
    user(id: $id) {
      id
      username
      firstName
      lastName
      photo
      permissions
    }
  }
`;

const userEditMutation = graphql`
  mutation UserEditMutation($input: UpdateUserInput!) {
    user {
      update(input: $input) {
        record {
          id
          permissions
        }
      }
    }
  }
`;

export default function UserEdit(): ReactElement {
  const { id } = useParams<{ id: string }>();

  const [commit, isInFlight] = useMutation<UserEditMutation>(userEditMutation);

  const [isAdmin, setIsAdmin] = useState(false);

  const data = useLazyLoadQuery<UserEditQuery>(userEditQuery, { id });
  const user = data.user;

  useEffect(() => {
    if (user) {
      setIsAdmin(user.permissions.some(per => per === 'admin'));
    } else {
      setIsAdmin(false);
    }
  }, [ user ]);

  const history = useHistory();
  const location = useLocation();

  /**
   * Push location back to entity view page
   */
  const pushLocationBack = (): void => {
    const entityPath = location.pathname.replace('/edit', '');

    history.push(entityPath);
  };

  if (!user) {
    return <div>No user was found</div>;
  }

  return (
    <div>
      <ContentWrapper>
        <div>
          <LabeledText
            content={user.username}
            label='Username'
          />
          <LabeledText
            content={user.firstName}
            label='First name'
          />
          <LabeledText
            content={user.lastName}
            label='Last name'
          />
          <Form.Check
            checked={isAdmin}
            label='Admin'
            onChange={(e) => setIsAdmin(e.target.checked)}
            type='checkbox'
          />
        </div>
        <div>
          <Button
            className='m-1'
            onClick={() => commit({
              variables: {
                input: {
                  id,
                  permissions: isAdmin? [ 'admin' ]: [],
                },
              },
            })}
            type='submit'
          >
            {isInFlight
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

      </ContentWrapper>
    </div>
  );
}

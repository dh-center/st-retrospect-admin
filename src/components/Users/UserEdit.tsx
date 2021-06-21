import { ReactElement, useEffect, useState } from 'react';
import graphql from 'babel-plugin-relay/macro';
import Button from 'react-bootstrap/Button';
import LabeledText from '../utils/LabeledText';
import ContentWrapper from '../ContentWrapper';
import Form from 'react-bootstrap/Form';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import { useParams } from 'react-router';
import { UserEditQuery } from './__generated__/UserEditQuery.graphql';
import ButtonWithLoader from '../utils/ButtonWithLoader';
import useLeaveEditPage from '../../utils/useLeaveEditPage';
import notifications from '../../controllers/notificationsController';
import hasPermission from '../../utils/hasPermission';
import { UserEditPermissionsMutation } from './__generated__/UserEditPermissionsMutation.graphql';

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

const userSetPermissionsMutation = graphql`
  mutation UserEditPermissionsMutation($input: UpdateUserPermissionsInput!) {
    user {
      setPermissions(input: $input) {
        record {
          id
          permissions
        }
      }
    }
  }
`;

/**
 * Page for editing user data
 */
export default function UserEdit(): ReactElement {
  const { id } = useParams<{ id: string }>();

  const [commit, isInFlight] = useMutation<UserEditPermissionsMutation>(userSetPermissionsMutation);

  const [permissions, setPermissions] = useState<string[]>([]);

  /**
   * Set or remove permission from user
   *
   * @param name - permission name
   * @param state - set or remove
   */
  const applyPermission = (name: string, state: boolean): void => {
    /**
     * If 'admin' permission is set, it is not necessary to set other permissions
     */
    if (hasPermission('admin', permissions) && state) {
      return;
    }

    /**
     * If admin permissions are set, then all others are not needed
     */
    if (name === 'admin' && state) {
      setPermissions([ 'admin' ]);

      return;
    }

    if (!state) {
      setPermissions(permissions.filter(per => per !==name));

      return;
    }

    if (hasPermission(name, permissions)) {
      return;
    }

    setPermissions([...permissions, name]);
  };

  const data = useLazyLoadQuery<UserEditQuery>(userEditQuery, { id });
  const user = data.user;

  useEffect(() => {
    if (user) {
      setPermissions([ ...user.permissions ]);
    } else {
      setPermissions([]);
    }
  }, [ user ]);

  const leaveEditPage = useLeaveEditPage();

  if (!user) {
    return <div>No user was found</div>;
  }

  const isAdmin = hasPermission('admin', permissions);
  const isEditor = isAdmin || hasPermission('editor', permissions);

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
            onChange={(e) => applyPermission('admin', e.target.checked)}
            type='checkbox'
          />
          <Form.Check
            checked={isEditor}
            disabled={isAdmin}
            label='Editor'
            onChange={e => applyPermission('editor', e.target.checked)}
            type='checkbox'
          />
        </div>
        <div>
          <ButtonWithLoader
            isLoading={isInFlight}
            onClick={() => commit({
              onCompleted() {
                notifications.success('User successfully updated');
                leaveEditPage();
              },
              onError() {
                notifications.error('Error during user updating');
              },
              variables: {
                input: {
                  id,
                  permissions,
                },
              },
            })}
            type='submit'
          >
            Save
          </ButtonWithLoader>
          <Button
            className='m-1'
            onClick={leaveEditPage}
            variant='outline-danger'
          >
            Cancel
          </Button>
        </div>

      </ContentWrapper>
    </div>
  );
}

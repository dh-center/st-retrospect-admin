import { ReactElement } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay';
import { UserViewQuery } from './__generated__/UserViewQuery.graphql';
import { useParams } from 'react-router';
import ContentWrapper from '../ContentWrapper';
import LabeledText from '../utils/LabeledText';
import Form from 'react-bootstrap/Form';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import hasPermission from '../../utils/hasPermission';

const userViewQuery = graphql`
    query UserViewQuery ($id: GlobalId!) {
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

/**
 * Page for viewing user data
 */
export default function UserView(): ReactElement {
  const { id } = useParams<{id: string}>();

  const data = useLazyLoadQuery<UserViewQuery>(userViewQuery, { id });
  const user = data.user;

  if (!user) {
    return <div>No user was found</div>;
  }

  const isAdmin = hasPermission('admin', user.permissions);
  const isEditor = isAdmin || hasPermission('editor', user.permissions);

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
            disabled
            label='Admin'
            type='checkbox'
          />

          <Form.Check
            checked={isEditor}
            disabled
            label='Editor'
            type='checkbox'
          />
        </div>
        <div>
          <LinkContainer to={`/users/${id}/edit`}>
            <Button className='m-1' variant='outline-warning'>Edit</Button>
          </LinkContainer>
        </div>
      </ContentWrapper>
    </div>
  );
}

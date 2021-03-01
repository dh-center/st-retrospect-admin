import React, { ReactElement } from 'react';
import { NavLink as Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { createFragmentContainer } from 'react-relay';
import { Navbar, Nav, Button } from 'react-bootstrap';
import graphql from 'babel-plugin-relay/macro';
import { Navigation_user as NavigationUser } from './__generated__/Navigation_user.graphql';
import DataLanguageSwitcher from '../utils/LanguageSwitchers/DataLanguageSwitcher';
import { useAuthContext } from '../../controllers/authController';

/**
 * Props for Navigation component
 */
interface NavigationProps {
  /**
   * Current user
   */
  user: NavigationUser | null;
}

/**
 * Functional component of navigation on page
 *
 * @param props - props for component render
 */
export function Navigation(props: NavigationProps): ReactElement {
  const history = useHistory();
  const isAdmin = props.user?.me.permissions.some(perm => perm === 'admin');
  const authContext = useAuthContext();

  return (
    <Navbar className='flex-shrink-0'>
      <Nav>
        {isAdmin && <Nav.Item>
          <Nav.Link as={Link} to='/users'>
            Users
          </Nav.Link>
        </Nav.Item>}
        <Nav.Item>
          <Nav.Link as={Link} to='/persons'>
            Persons {props.user?.accessToken}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to='/locations'>
            Locations
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to='/quests'>
            Quests
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to='/relations'>
            Relations
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to='/relation-types'>
            Relation types
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to='/visualization'>
            Visualization
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Navbar.Collapse className='justify-content-end'>
        <DataLanguageSwitcher/>
        <Navbar.Text className='m-2'>
          Signed in as: {props.user?.me.username}
        </Navbar.Text>
        <Button
          onClick={(): void => {
            authContext.logout();
            history.push(`/login`);
          }}
          size='sm'
          variant='outline-dark'>
          Logout
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default createFragmentContainer(
  Navigation,
  {
    user: graphql`
      fragment Navigation_user on Query {
        me {
          username
          permissions
        }
        accessToken
      }
    `,
  }
);

import React, { ReactElement } from 'react';
import { NavLink as Link } from 'react-router-dom';
import authController from '../../controllers/authController';
import { useHistory } from 'react-router';
import { createFragmentContainer } from 'react-relay';
import { Navbar, Nav, Button } from 'react-bootstrap';
import graphql from 'babel-plugin-relay/macro';
import { Navigation_user as NavigationUser } from './__generated__/Navigation_user.graphql';
import DataLanguageSwitcher from '../utils/LanguageSwitchers/DataLanguageSwitcher';

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

  return (
    <Navbar className='flex-shrink-0'>
      <Nav>
        <Nav.Item>
          <Nav.Link as={Link} to='/persons'>
            Persons
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
          <Nav.Link as={Link} to='/relationTypes'>
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
            authController.logout();
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
        }
      }
    `,
  }
);

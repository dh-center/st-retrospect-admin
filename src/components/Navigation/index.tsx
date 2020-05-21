import React, { ReactElement } from 'react';
import { NavLink as Link } from 'react-router-dom';
import authController from '../../authController';
import { useHistory } from 'react-router';
import { createFragmentContainer } from 'react-relay';
import { Navbar, Nav, Button } from 'react-bootstrap';
import graphql from 'babel-plugin-relay/macro';
import { Navigation_user as NavigationUser } from './__generated__/Navigation_user.graphql';

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
    <Navbar>
      <Nav>
        <Nav.Item>
          <Nav.Link as={Link} to="/persons">
            Persons
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/quests">
            Quests
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/quiz">
            Quiz
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className='m-2'>
          Signed in as: {props.user?.me.username}
        </Navbar.Text>
        <Button
          variant='outline-dark'
          size='sm'
          onClick={(): void => {
            authController.logout();
            history.push(`/login`);
          }}>
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

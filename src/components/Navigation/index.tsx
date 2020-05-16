import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';
import authController from '../../authController';
import { useHistory } from 'react-router';

/**
 * Functional component of navigation on page
 */
export default function Navigation(): ReactElement {
  const history = useHistory();

  return (
    <div className="navigation">
      <NavLink className="navigation__link" activeClassName="navigation__link--active" to="/persons">Persons</NavLink>
      <NavLink className="navigation__link" activeClassName="navigation__link--active" to="/quests">Quests</NavLink>
      <NavLink className="navigation__link" activeClassName="navigation__link--active" to="/quiz">Quiz</NavLink>
      <button onClick={(): void => {
        authController.logout();
        history.push(`/login`);
      }}>
        Logout
      </button>
    </div>
  );
}

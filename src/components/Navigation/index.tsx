import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

/**
 * Functional component of navigation on page
 */
export default function Navigation(): ReactElement {
  return (
    <div className="navigation">
      <NavLink className="navigation__link" activeClassName="navigation__link--active" to="/persons">Persons</NavLink>
      <NavLink className="navigation__link" activeClassName="navigation__link--active" to="/quests">Quests</NavLink>
      <NavLink className="navigation__link" activeClassName="navigation__link--active" to="/quiz">Quiz</NavLink>
    </div>
  );
}

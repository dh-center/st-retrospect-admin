import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 *
 */
export default function VisualizationPage(): React.ReactElement {
  return (
    <div>
      <h1>Visualization</h1>
      <NavLink to={'/'}>Back</NavLink>
    </div>
  );
}

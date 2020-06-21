import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import RelationsGraph from './RelationsGraph';

/**
 * @param props
 */
export function Slide(props: React.PropsWithChildren<{}>): React.ReactElement {
  return (
    <>
      <NavLink className="visualization-page__prev-link" to={'/visualization/2'}>
        <svg className="bi bi-arrow-left" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
          xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd"
            d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
          <path fillRule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
        </svg>
      </NavLink>
      {props.children}
      <NavLink className="visualization-page__next-link" to={'/visualization/1'}>
        <svg className="bi bi-arrow-right" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
          xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd"
            d="M10.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 8l-2.647-2.646a.5.5 0 0 1 0-.708z"/>
          <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8z"/>
        </svg>
      </NavLink>
    </>
  );
}

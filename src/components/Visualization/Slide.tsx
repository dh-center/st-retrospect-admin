import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Props for Slide component
 */
interface SlideProps {
  /**
   * Route name to next slide
   */
  nextSlide: string;

  /**
   * Route name to previous slide
   */
  prevSlide: string;
}

/**
 * Component for displaying charts with controls
 *
 * @param props - props for component rendering
 */
export function Slide(props: React.PropsWithChildren<SlideProps>): React.ReactElement {
  return (
    <>
      <NavLink className='visualization-page__prev-link' to={props.prevSlide}>
        <svg className='bi bi-arrow-left'
          fill='currentColor'
          height='1em'
          viewBox='0 0 16 16'
          width='1em'
          xmlns='http://www.w3.org/2000/svg'>
          <path d='M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z'
            fillRule='evenodd'/>
          <path d='M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z' fillRule='evenodd'/>
        </svg>
      </NavLink>
      {props.children}
      <NavLink className='visualization-page__next-link' to={props.nextSlide}>
        <svg className='bi bi-arrow-right'
          fill='currentColor'
          height='1em'
          viewBox='0 0 16 16'
          width='1em'
          xmlns='http://www.w3.org/2000/svg'>
          <path d='M10.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 8l-2.647-2.646a.5.5 0 0 1 0-.708z'
            fillRule='evenodd'/>
          <path d='M2 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8z' fillRule='evenodd'/>
        </svg>
      </NavLink>
    </>
  );
}

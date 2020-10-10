import React, { ReactElement } from 'react';
import { Spinner } from 'react-bootstrap';
import styles from './LoadingPlaceholder.module.css';

/**
 * Interface of LoadingPlaceholder props
 */
interface LoadingPlaceholderProps {
  /**
   * Alternative text for displaying
   */
  alt?: string;

  /**
   * Is spinner small
   */
  isSmall?: boolean;
}

/**
 * Displays Spinner in container
 *
 * @param props - LoadingPlaceholder props
 */
export default function LoadingPlaceholder(props: LoadingPlaceholderProps): ReactElement {
  return (
    <div className={styles.container}>
      <Spinner
        animation='grow'
        aria-hidden
        as='span'
        role='status'
        size={props.isSmall ? 'sm' : undefined}
        variant='primary'
      >
        <span className='sr-only'>{props.alt}</span>
      </Spinner>
    </div>
  );
}

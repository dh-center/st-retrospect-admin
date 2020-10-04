import React from 'react';
import styles from './InfoPlate.module.css';
import classNames from 'classnames';

/**
 * InfoPlate component props
 */
interface InfoPlateProps {
  /**
   * Label for displaying
   */
  label: string;

  /**
   * Content for displaying
   */
  content: string | null | undefined;
}

/**
 * Displays plate for information in view components
 *
 * @param props - InfoPlate component props
 */
export default function InfoPlate(props: InfoPlateProps): React.ReactElement {
  const classNamesForContent = !props.content ? classNames(
    styles.content,
    styles.contentUndefined
  ) : classNames(styles.content);

  return (
    <div className={styles.container}>
      <div className={styles.label}>{props.label}:</div>
      <div className={classNamesForContent}>{props.content || '—'}</div>
    </div>
  );
}

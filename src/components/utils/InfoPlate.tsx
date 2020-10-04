import React from 'react';
import styles from './InfoPlate.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

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

  /**
   * Link to open when clicks on content
   */
  link?: string | null;
}

/**
 * Displays plate for information in view components
 *
 * @param props - InfoPlate component props
 */
export default function InfoPlate(props: InfoPlateProps): React.ReactElement {
  return (
    <div className={styles.container}>
      <div className={styles.label}>{props.label}:</div>
      <div className={classNames(
        styles.content,
        {
          [styles.contentUndefined]: !props.content,
          [styles.contentWithLink]: props.link,
        }
      )}>
        {props.link
          ? <Link to={props.link}>
            {props.content || '—'}
          </Link>
          : <div>{props.content || '—'}</div>
        }
      </div>
    </div>
  );
}

import React from 'react';
import styles from './LabeledText.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

/**
 * LabeledText component props
 */
interface LabeledTextProps {
  /**
   * Label for displaying
   */
  label: string;

  /**
   * Content for displaying
   */
  content: string | number | null | undefined;

  /**
   * Link to open when clicks on content
   */
  link?: string | null;
}

/**
 * Displays label and information in view components
 *
 * @param props - LabeledText component props
 */
export default function LabeledText(props: LabeledTextProps): React.ReactElement {
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

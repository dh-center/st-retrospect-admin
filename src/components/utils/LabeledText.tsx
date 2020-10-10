import React from 'react';
import styles from './LabeledText.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import useUniqueId from '../../utils/useUniqueId';

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
  content: string | null | undefined;

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
  const id = useUniqueId('app-labeled-text');

  return (
    <Form.Group className={styles.container}>
      <Form.Label className={styles.label} htmlFor={id`labeled-text`}>{props.label}:</Form.Label>
      <Form.Row
        className={classNames(
          styles.content,
          {
            [styles.contentUndefined]: !props.content,
            [styles.contentWithLink]: props.link,
          }
        )}
        id={id`labeled-text`}
      >
        {props.link
          ? <Link to={props.link}>
            {props.content || '—'}
          </Link>
          : <div>{props.content || '—'}</div>
        }
      </Form.Row>
    </Form.Group>
  );
}

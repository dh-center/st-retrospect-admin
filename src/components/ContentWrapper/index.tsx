import React, { PropsWithChildren } from 'react';
import styles from './index.module.css';

/**
 * Wrapper for entity content
 *
 * @param props - props for rendering
 */
export default function ContentWrapper(props: PropsWithChildren<unknown>): React.ReactElement {
  return <div className={styles.wrapper}>{props.children}</div>;
}

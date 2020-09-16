import React, { PropsWithChildren } from 'react';
import styles from './index.module.css';

export default function ContentWrapper(props: PropsWithChildren<{}>): React.ReactElement {
  return <div className={styles.wrapper}>{props.children}</div>;
}

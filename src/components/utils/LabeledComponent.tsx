import React, { ComponentType, FC, ReactElement } from 'react';
import styles from './LabeledComponent.module.css';

/**
 * Interface of LabeledComponent props
 */
interface LabeledComponentProps {
  /**
   * Label for displaying
   */
  label: string;
}

/**
 * Adds label to WrappedComponent
 *
 * @param WrappedComponent - component for adding label
 */
export default function withLabel<T extends object>(WrappedComponent: ComponentType<T>): FC<LabeledComponentProps & T> {
  /**
   * New component with label and WrappedComponent
   *
   * @param props - props of new LabeledComponent
   */
  function LabeledComponent(props: LabeledComponentProps & T): ReactElement {
    return (
      <div className={styles.container}>
        <div className={styles.label}>{props.label}:</div>
        <div>
          <WrappedComponent {...props}/>
        </div>
      </div>
    );
  }
  LabeledComponent.displayName = `withLabel(${WrappedComponent.displayName || WrappedComponent.name || 'WrappedComponent'})`;

  return LabeledComponent;
}

import React, { ComponentType, FC, ReactElement } from 'react';
import styles from './LabeledComponent.module.css';
import { Form } from 'react-bootstrap';
import useUniqueId from '../../utils/useUniqueId';

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
    const id = useUniqueId('app-labeled-component');

    return (
      <Form.Group className={styles.container} controlId={id`labeled-component`}>
        <Form.Label className={styles.label}>{props.label}:</Form.Label>
        <Form.Row className={styles.content}>
          <WrappedComponent {...props}/>
        </Form.Row>
      </Form.Group>
    );
  }
  LabeledComponent.displayName = `withLabel(${WrappedComponent.displayName || WrappedComponent.name || 'WrappedComponent'})`;

  return LabeledComponent;
}

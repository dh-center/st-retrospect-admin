import React from 'react';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { LocationInstanceListItem_instance } from './__generated__/LocationInstanceListItem_instance.graphql';
import styles from './LocationInstanceListItem.module.css';
import { useImage } from 'react-image';
import ImageView from '../utils/ImageView';

/**
 * LocationInstanceListItem props
 */
interface Props {
  /**
   * Instance info to display
   */
  instance: LocationInstanceListItem_instance;

  /**
   * On click handler
   */
  onClick(): void;
}

/**
 * Item with short information about location list
 *
 * @param props - props for rendering
 */
function LocationInstanceListItem(props: Props): React.ReactElement {
  return (
    <div
      className={styles.container}
      onClick={props.onClick}
    >
      <ImageView
        className={styles.image}
        height={150}
        src={props.instance.mainPhotoLink}
        width={200}/>
      <div className={styles.info}>
        <h3>{props.instance.name}</h3>
        <p className={styles.description}>{props.instance.description}</p>
      </div>
    </div>
  );
}

export default createFragmentContainer(
  LocationInstanceListItem,
  {
    instance: graphql`
      fragment LocationInstanceListItem_instance on LocationInstance {
        name
        mainPhotoLink
        description
      }
    `,
  }
);

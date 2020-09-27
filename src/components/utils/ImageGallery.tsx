import React from 'react';
import ImageView from './ImageView';
import styles from './ImageGallery.module.css';
import WithClassName from '../../types/withClassName';
import classNames from 'classnames';

/**
 * Props for ImageGallery components
 */
interface ImageGalleryProps {
  /**
   * Images to show
   */
  images?: string[];
}

/**
 * Displays list of images
 *
 * @param props - props for component rendering
 */
export default function ImageGallery(props: ImageGalleryProps & WithClassName): React.ReactElement {
  if (!props.images) {
    return <div>There is no images</div>;
  }

  return (
    <div className={classNames(styles.container, props.className)}>
      {props.images.map((image, index) =>
        /**
         * @todo fix ImageView when changing image src
         */
        <div className={styles.imageWrapper}
          key={index + image} >
          <ImageView src={image}/>
        </div>
      )}
    </div>
  );
}

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

  /**
   * Called when deleting images
   *
   * @param urls - new image url array
   */
  onChange(urls: string[]): void;

  /**
   * Forbid deleting images
   */
  viewOnly: boolean;

  /**
   * Label for component
   */
  label?: string;
}

/**
 * Displays list of images
 *
 * @param props - props for component rendering
 */
export default function ImageGallery(props: ImageGalleryProps & WithClassName): React.ReactElement {
  if (!props.images || !props.images.length) {
    return (
      <div className={styles.container}>
        {props.label &&
          <div className={styles.label}>{props.label}:</div>
        }
        <div>There is no images</div>
      </div>
    );
  }

  const onDelete = !props.viewOnly
    ? (image: string) => () => {
      if (!props.images) {
        return;
      }
      props.onChange(props.images.filter(im => im !== image));
    }
    : undefined;

  return (
    <div className={styles.container}>
      {props.label &&
        <div className={styles.label}>{props.label}:</div>
      }
      <div className={classNames(styles.imagesContainer, props.className)}>
        {props.images.map((image, index) =>
          /**
           * @todo fix ImageView when changing image src
           */
          <div className={styles.imageWrapper}
            key={index + image} >
            <ImageView onDelete={onDelete && onDelete(image)}
              src={image}/>
          </div>
        )}
      </div>
    </div>
  );
}

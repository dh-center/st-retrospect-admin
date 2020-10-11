import React from 'react';
import { useImage } from 'react-image';
import styles from './ImageView.module.css';
import classNames from 'classnames';
import Spinner from 'react-bootstrap/Spinner';

/**
 * Props for ImageView component
 */
interface ImageViewProps {
  /**
   * Image source to load
   * If not presented, missing image info will be displayed
   */
  src?: string | null;

  /**
   * Image width
   */
  width?: string | number;

  /**
   * Image height
   */
  height?: string | number;

  /**
   * Optional className for custom styling
   */
  className?: string;
}

/**
 * Props for ImageViewWithRequiredSrc component
 */
interface ImageViewWithRequiredSrcProps {
  /**
   * Image source to load
   */
  src: string;
}

/**
 * Component for loading and displaying images
 *
 * @param props - props for rendering
 */
function ImageViewWithRequiredSrc(props: ImageViewWithRequiredSrcProps): React.ReactElement {
  const { src, error, isLoading } = useImage({
    srcList: props.src,
    useSuspense: false,
  });

  return (
    <>
      { isLoading &&
        <div className={styles.spinnerContainer}>
          <Spinner animation='border' variant='secondary'/>
        </div>
      }
      { !error && !isLoading &&
        <img
          className={styles.image}
          src={src}
        />
      }
      { error &&
        <div
          className={styles.info}
        >
          Произошла ошибка при загрузке изображения
        </div>
      }
    </>
  );
}

/**
 * Component for viewing images with error and missing image info
 *
 * @param props - props for component rendering
 */
export default function ImageView(props: ImageViewProps): React.ReactElement {
  let content;

  if (props.src) {
    content = <ImageViewWithRequiredSrc src={props.src}/>;
  } else {
    content = <div className={styles.info}>Изображения нет</div>;
  }

  return (
    <div
      className={classNames(styles.wrapper, props.className)}
      style={{
        width: props.width,
        height: props.height,
      }}
    >
      {content}
    </div>
  );
}

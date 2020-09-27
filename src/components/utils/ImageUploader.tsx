import React, { useCallback } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import styles from './ImageUploader.module.css';
import notifier from 'codex-notifier';

/**
 * Props for ImageUploader components
 */
interface ImageUploaderProps {
  /**
   * Callback with uploaded image url
   */
  onImageUpload(url: string): void;

  /**
   * Entity name for uploading to specific route
   */
  entityName: string;
}

/**
 * Response from image uploading API
 */
interface UploadRequestResults {
  /**
   * Uploaded image data
   */
  file: {
    /**
     * Uploaded image URL
     */
    url: string;
  };
}

/**
 * Component for image uploading
 *
 * @param props - props for component rendering
 */
export default function ImageUploader(props: ImageUploaderProps): React.ReactElement {
  const onDrop = useCallback(async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length) {
      notifier.show({
        message: 'There is errors while uploading files. There may be too many files or some of them are too large\\small',
        style: 'error',
        time: 5000,
      });
    }

    if (acceptedFiles.length === 0) {
      return;
    }

    const formData = new FormData();

    formData.append('image', acceptedFiles[0]);

    const result = await window.fetch(`${process.env.REACT_APP_API_ENDPOINT}upload/${props.entityName}`, {
      method: 'POST',
      body: formData,
    });

    const parsedResult = await result.json() as UploadRequestResults;

    props.onImageUpload(parsedResult.file.url);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: 'image/jpeg, image/png',
  });

  return (
    <div {...getRootProps({ className: styles.dropzone })}>
      <input {...getInputProps()} />
      {
        isDragActive
          ? <p>Drop the files here ...</p>
          : <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      }
    </div>
  );
}

import React, { useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import styles from './ImageUploader.module.css';
import notifier from 'codex-notifier';
import ProgressBar from 'react-bootstrap/cjs/ProgressBar';

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
  const [progress, setProgress] = useState<number|null>(null);

  const onDrop = async (acceptedFiles: File[], fileRejections: FileRejection[]): Promise<void> => {
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

    const xhr = new XMLHttpRequest();

    xhr.open('POST', `${process.env.REACT_APP_API_ENDPOINT}upload/${props.entityName}`);

    xhr.upload.addEventListener('progress', function (evt) {
      if (evt.lengthComputable) {
        const percentComplete = evt.loaded / evt.total * 100;

        setProgress(percentComplete);
      }
    }, false);

    xhr.onloadstart = function () {
      setProgress(0);
    };

    xhr.onloadend = function () {
      const response = JSON.parse(xhr.response) as UploadRequestResults;

      props.onImageUpload(response.file.url);
      setProgress(null);
    };
    xhr.send(formData);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: 'image/jpeg, image/png',
  });

  if (progress !== null) {
    return <div><ProgressBar now={progress}/></div>;
  }

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

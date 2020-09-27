import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploaderProps {
  maxFiles?: number;
  onImageUpload(url: string): void;
}

interface UploadRequestResults {
  file: {
    url: string;
  };
}

export default function ImageUploader(props: ImageUploaderProps): React.ReactElement {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const formData = new FormData();

    formData.append('image', acceptedFiles[0]);

    const result = await window.fetch(process.env.REACT_APP_API_ENDPOINT + 'upload/route', {
      method: 'POST',
      body: formData,
    });

    const parsedResult = await result.json() as UploadRequestResults;

    props.onImageUpload(parsedResult.file.url);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive
          ? <p>Drop the files here ...</p>
          : <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      }
    </div>
  );
}

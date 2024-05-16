import React, { useState, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  [key: string]: FileList;
}

interface FileInputProps {
  index: number;
}

interface ValidationError {
  [key: string]: {
    message: string;
  };
}

const MAX_SIZE = 5 * 1024 * 1024;

const FileInput: React.FC<FileInputProps> = ({ index }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [uploaded, setUploaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleUpload: SubmitHandler<IFormInput> = (data) => {
    const file = data[`photo${index}`][0];

    const previewUrl = URL.createObjectURL(file);
    setPreviewUrl(previewUrl);

    setUploaded(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleUpload)}>
        <div className="flex flex-col gap-3 items-center justify-center">
          <input
            className="input-file"
            {...register(`photo${index}`, {
              required: "This file is required",
              validate: {
                lessthan5MB: (files) =>
                  files[0]?.size < MAX_SIZE ||
                  "Your file size is larger than 5MB",
                acceptedFormats: (files) =>
                  ["image/jpeg", "image/png"].includes(files[0]?.type) ||
                  "Only accepted JPEG & PNG.",
              },
            })}
            type="file"
            accept="image/png, image/jpeg"
          />
          {errors[`photo${index}`] && (
            <span className="error-message">
              {(errors as ValidationError)[`photo${index}`]?.message}
            </span>
          )}
          {!uploaded && (
            <button className="upload-buttons" type="submit">
              Upload
            </button>
          )}
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          )}
          {uploaded && (
            <span className="success-message">
              Image uploaded successfully!
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export const Option1: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-10">Upload Photos: One by one</h1>
      <div className="flex gap-8">
        <FileInput index={1} />
        <FileInput index={2} />
      </div>
    </div>
  );
};

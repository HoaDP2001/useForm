import React, { useState, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  photo1: FileList;
  photo2: FileList;
}

interface FileInputProps {
  register: any;
  errors: any;
  name: string;
  handleUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface PreviewImageProps {
  previewUrl: string | null;
}

// FileInput component
const FileInput: React.FC<FileInputProps> = ({
  register,
  errors,
  name,
  handleUpload,
}) => (
  <div className="flex flex-col gap-3 items-center justify-center">
    <input
      className="input-file"
      {...register(name, {
        required: "This file is required.",
        validate: {
          lessThan5MB: (files: FileList) =>
            files[0]?.size < 5 * 1024 * 1024 ||
            "Your file size is larger than 5MB",
          acceptedFormats: (files: FileList) =>
            ["image/jpeg", "image/png"].includes(files[0]?.type) ||
            "Only accepted JPEG & PNG.",
        },
      })}
      type="file"
      accept="image/png, image/jpeg"
      onChange={handleUpload}
    />
    {errors[name] && (
      <span className="error-message">{errors[name].message}</span>
    )}
  </div>
);

// PreviewImage component
const PreviewImage: React.FC<PreviewImageProps> = ({ previewUrl }) =>
  previewUrl ? (
    <img
      src={previewUrl}
      alt="Preview"
      style={{ maxWidth: "100px", maxHeight: "100px" }}
    />
  ) : null;

export const Option2: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const [isSuccess, setIsSuccess] = useState(false);

  const [photos, setPhotos] = useState<{
    photo1: File | null;
    photo2: File | null;
  }>({
    photo1: null,
    photo2: null,
  });
  const [previewUrls, setPreviewUrls] = useState<{
    photo1: string | null;
    photo2: string | null;
  }>({
    photo1: null,
    photo2: null,
  });

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    const { name } = e.target;

    setPhotos((prev) => ({ ...prev, [name]: file }));
    setPreviewUrls((prev) => ({
      ...prev,
      [name]: URL.createObjectURL(file as Blob),
    }));
  };

  const onSubmit: SubmitHandler<IFormInput> = () => {
    if (photos.photo1 && photos.photo2) {
      setIsSuccess(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-10">Upload Photos: One for all</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 items-center justify-center">
          <div className="flex gap-8">
            <div className="flex flex-col items-center justify-center gap-3">
              {/* Input 1 */}
              <FileInput
                register={register}
                errors={errors}
                name="photo1"
                handleUpload={handleUpload}
              />
              <PreviewImage previewUrl={previewUrls.photo1} />
            </div>

            <div className="flex flex-col items-center justify-center gap-3">
              {/* Input 2 */}
              <FileInput
                register={register}
                errors={errors}
                name="photo2"
                handleUpload={handleUpload}
              />
              <PreviewImage previewUrl={previewUrls.photo2} />
            </div>
          </div>

          {/* Upload button */}
          {!isSuccess && (
            <button className="upload-buttons" type="submit">
              Upload
            </button>
          )}
          {isSuccess && (
            <span className="success-message">
              You have successfully uploaded 2 photos!
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

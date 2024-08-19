import React, { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface FileInputTypes {
  label: string;
  name: string;
  cond: object;
  props: object;
  image?: string;
}

const FilePreviewInput: React.FC<FileInputTypes> = ({
  label,
  name,
  cond,
  props,
  image,
}) => {
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    image ?? ""
  );

  const handleImageChange = useCallback((FileList: FileList) => {
    const file = FileList[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, []);

  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  // responsible for setting the preview of image
  useEffect(() => {
    const subscribe = watch((value, { name }) => {
      if (name === "image" && value.image instanceof FileList) {
        handleImageChange(value.image);
      }
    });
    return () => subscribe.unsubscribe();
  }, [watch]);

  const getError = useCallback(() => {
    const { message } = errors[name] ?? {};
    return typeof message === "string" ? message : "";
  }, [errors]);

  return (
    <div>
      {imagePreview && (
        <div className="mt-4">
          <img
            src={imagePreview as string}
            alt="Image preview"
            className="w-full max-w-xs rounded-lg border border-gray-300"
          />
        </div>
      )}
      <div>
        <label className="block text-sm capitalize font-medium text-gray-700">
          {label}
        </label>
        <input
          {...register(name, { ...cond })}
          {...props}
          type="file"
          className={`mt-1 p-2 block placeholder:capitalize w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 ${
            errors[name] ? "border-red-500" : ""
          }`}
        />
        {errors[name] && (
          <p className="text-red-500 text-sm mt-1">{getError()}</p>
        )}
      </div>
    </div>
  );
};

export default FilePreviewInput;

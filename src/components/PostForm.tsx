import React, { useState, memo } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import TextEditor from "./TextEditor";

export type FormValues = {
  image: FileList;
  title: string;
  content: string;
};

interface MyFormComponentProps {
  onSubmit: SubmitHandler<FormValues>;
}

const PostForm: React.FC<MyFormComponentProps> = memo(({ onSubmit }) => {
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<FormValues>();

  // Handle image file change
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Image</label>
        <input
          type="file"
          accept="image/*"
          {...register("image", { required: "Image is required" })}
          onChange={handleImageChange}
          className={`mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.image ? "border-red-500" : ""
          }`}
        />
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
        )}
        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview as string}
              alt="Image preview"
              className="w-full max-w-xs rounded-lg border border-gray-300"
            />
          </div>
        )}
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          {...register("title", { required: "Title is required" })}
          className={`mt-1 block w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.title ? "border-red-500" : ""
          }`}
          placeholder="Enter the title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Content */}
      <TextEditor />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  );
});

export default PostForm;

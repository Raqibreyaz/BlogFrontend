import React, { memo } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import TextEditor from "./TextEditor";
import FilePreviewInput from "./FilePreviewInput";

export type FormValues = {
  image?: FileList;
  title: string;
  content: string;
};

interface MyFormComponentProps {
  onSubmit: SubmitHandler<FormValues>;
  image?: string;
  loading: boolean;
}

const PostForm: React.FC<MyFormComponentProps> = memo(
  ({ onSubmit, loading, image }) => {
    const {
      register,
      handleSubmit,
      formState: { errors, isDirty },
    } = useFormContext<FormValues>();

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FilePreviewInput
          label="Image"
          name="image"
          image={image}
          props={{ accept: "image/*" }}
        />

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
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
          disabled={!!loading || Object.keys(errors).length > 0}
          className={`${
            isDirty ? "" : "hidden"
          } w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    );
  }
);

export default PostForm;

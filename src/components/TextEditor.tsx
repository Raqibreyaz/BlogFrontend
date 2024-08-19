import { useFormContext, Controller } from "react-hook-form";
import { FormValues } from "./PostForm";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Content</label>
      <Controller
        name="content"
        control={control}
        rules={{ required: "Content is required" }}
        render={({ field: { value, onChange } }) => (
          <Editor
            value={value}
            apiKey={import.meta.env.VITE_TINYMCE_KEY}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={(content) => {
              onChange(content);
            }}
          />
        )}
      />
      {errors.content && (
        <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
      )}
    </div>
  );
};

export default TextEditor;

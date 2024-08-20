import { showMessage } from "./showMessage";

interface typeError extends Error {
  data?: {
    message?: string;
  };
  response?: {
    data: {
      message: string;
    };
  };
  error?: string;
}

type dataType = FormData | string | object | undefined;

export const catchAndShowMessage = async (fn: Function, data?: dataType) => {
  try {
    const response = await fn(data).unwrap();

    showMessage({
      title: "Success",
      message: response.data?.message || response.message,
      icon: "success",
    });
  } catch (error) {
    const customError = error as typeError;

    let message: string = "";

    if (
      customError.response &&
      customError.response.data &&
      customError.response.data.message
    )
      message = customError.response?.data.message;
    else if (customError.data && customError.data.message)
      message = customError.data.message;
    else if (customError.error) message = customError.error;

    showMessage({ title: "Error", message, icon: "error" });
  }
};

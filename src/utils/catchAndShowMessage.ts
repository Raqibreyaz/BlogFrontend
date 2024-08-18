import { showMessage } from "./showMessage";

interface typeError extends Error {
  response: {
    data: {
      message: string;
    };
  };
}

type dataType = FormData | string | object;

export const catchAndShowMessage = async (fn:Function, data:dataType) => {
  try {
    const response = await fn(data).unwrap();
    showMessage("Success", response.data.message, "success");
  } catch (error) {
    const customError = error as typeError;
    if (
      customError.response &&
      customError.response.data &&
      customError.response.data.message
    )
      showMessage("Error", customError.response.data.message, "error");
  }
};

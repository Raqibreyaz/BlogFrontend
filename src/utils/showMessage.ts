import Swal, { SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const showMessage = async (
  title: string,
  message: string,
  icon: SweetAlertIcon
) => {
  const result = await withReactContent(Swal).fire({
    title,
    text: message,
    icon,
  });

  return result.isConfirmed
};

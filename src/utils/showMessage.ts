import Swal, { SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const showMessage = async (
  title: string,
  message: string,
  icon: SweetAlertIcon,
  showConfirmButton = false,
  confirmButtonText = "",
  showCancelButton = false
) => {
  const result = await withReactContent(Swal).fire({
    title,
    text: message,
    icon,
    position: "top",
    timer: 4000,
    showConfirmButton,
    confirmButtonText,
    showCancelButton,
  });

  return result.isConfirmed;
};

import Swal, { SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface options {
  title: string;
  message: string;
  icon: SweetAlertIcon;
  showConfirmButton?: boolean;
  confirmButtonText?: string;
  showCancelButton?: boolean;
}

export const showMessage = async ({
  title,
  message,
  icon,
  showConfirmButton = false,
  confirmButtonText = "",
  showCancelButton = false,
}: options) => {
  const result = await withReactContent(Swal).fire({
    title,
    text: message,
    icon,
    position: "top",
    timer: 5000,
    showConfirmButton,
    confirmButtonText,
    confirmButtonColor: "crimson",
    showCancelButton,
  });

  return result.isConfirmed;
};

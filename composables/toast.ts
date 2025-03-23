import Swal from "sweetalert2";

type backendErrorMassage = {
  detail: string;
  status: number;
  title: string;
};

export const $toastService = (option?: any) => {
  const nuxtApp = useNuxtApp();

  /* ERROR MESSAGE */
  const errorMsg: any = (text: string) => {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: text,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  /* SUCCESS MESSAGE */
  const successMsg: any = (text: string) => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: text,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return { successMsg, errorMsg };
};

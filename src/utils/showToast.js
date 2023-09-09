import { toast } from 'react-toastify';

export const showToast = (toastParams) => {
  const toastConfig = {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  };

  switch (toastParams.type.toLowerCase()) {
    case 'success':
      toast.success(toastParams.message, toastConfig);
      break;
    case 'error':
      toast.error(toastParams.message, toastConfig);
      break;
    default:
      toast.info(toastParams.message, toastConfig);
  }
};

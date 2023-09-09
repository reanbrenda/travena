import { toast } from "react-toastify";

let loadingToast;

export const Toast = {
    loading: (text) => {
        loadingToast = toast.loading(text, { isLoading: true })
    },

    success: (message) => {
        toast.update(loadingToast, { render: message, type: "success", isLoading: false, autoClose: 3000 })
    },

    error: (message) => {
        toast.update(loadingToast, { render: message, type: "error", isLoading: false, autoClose: 3000 })
    }
}
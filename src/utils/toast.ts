import { toast, TypeOptions } from "react-toastify";

export default function callToast(message: string, type: TypeOptions) {
    toast(message, {
        type: type,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true
    })
}
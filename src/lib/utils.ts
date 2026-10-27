import { enqueueSnackbar } from "notistack";
import { io } from "socket.io-client";
import { API_URL } from "./api";

// const urlBackend = "http://localhost:3000/";

export function showSuccessNotification(message: string) {
  enqueueSnackbar(message, {
    variant: "success",
    anchorOrigin: {
      vertical: "top",
      horizontal: "center",
    },
  });
}

export function showErrorNotification(message: string) {
  enqueueSnackbar(message, {
    variant: "error",
    anchorOrigin: {
      vertical: "top",
      horizontal: "center",
    },
  });
}

export const COLORS = [
  { label: "azul", value: "bg-blue-100" },
  { label: "verde", value: "bg-green-100" },
  { label: "amarelo", value: "bg-yellow-100" },
  { label: "branco", value: "bg-white" },
];

export function getCardColor(label?: string | null) {
  if (!label) return "bg-white";
  return COLORS.find((f) => f.label === label)?.value ?? "bg-white";
}

export function initSocket() {
  console.log("API_URL", API_URL);
  return io(API_URL, {
    withCredentials: true,
    autoConnect: false,
  });
}

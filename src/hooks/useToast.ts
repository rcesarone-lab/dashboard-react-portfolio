import { useCallback, useState } from "react";

type ToastType = "success" | "error" | "info";

type ToastState = {
  message: string;
  type: ToastType;
};

export function useToast() {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    setToast({ message, type });
  }, []);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  return {
    toast,
    showToast,
    closeToast,
  };
}
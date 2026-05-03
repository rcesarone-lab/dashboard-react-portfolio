export type Theme = "dark" | "light";

export type TabId = "ventas" | "analisis" | "config";

export type ToastType = "success" | "error" | "info";

export type Sale = {
  id: number;
  mes: string;
  ventas: number;
};

export type ToastState = {
  message: string;
  type: ToastType;
} | null;

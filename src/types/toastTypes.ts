export type ToastDataType = {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
};

export type ToastType = "success" | "error" | "info" | "warning";
export type ToastPosition =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left";

export type ToastTheme = "light" | "dark" | "colored" | "custom";

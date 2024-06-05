import styles from "../styles/toast.module.css";

export type ToastType = "success" | "error" | "info" | "warning";
export type ToastPosition =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left";

export type ToastDataType = {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
  onClose?: () => void;
};

type Props = ToastDataType;

const Toast = ({
  type = "info",
  message = "This is an info",
  onClose,
}: Props) => {
  const handleClose = () => {
    if (typeof onClose === "function") onClose();
  };
  return (
    <div className={`${styles.toastContainer} ${styles[type]}`}>
      {message}
      <span onClick={() => handleClose()} className={styles.closeButton}>
        &times;
      </span>
    </div>
  );
};

export default Toast;

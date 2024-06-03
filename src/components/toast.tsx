import styles from "../styles/toast.module.css";

type ToastType = "success" | "error" | "info" | "warning";
type ToastPosition = "bottom-right" | "bottom-left" | "top-right" | "top-left";
export type ToastDataType = {
  type: ToastType;
  message: string;
  duration: number;
  position?: ToastPosition;
  onClose?: () => void;
};
type Props = ToastDataType;

const Toast = ({
  type = "info",
  message = "This is an info",
  onClose,
  position = "bottom-right",
}: Props) => {
  const handleClose = () => {
    if (typeof onClose === "function") onClose();
  };
  return (
    <div className={styles[position]}>
      <div className={`${styles.toastContainer} ${styles[type]}`}>
        {message}
        <span onClick={() => handleClose()} className={styles.closeButton}>
          &times;
        </span>
      </div>
    </div>
  );
};

export default Toast;

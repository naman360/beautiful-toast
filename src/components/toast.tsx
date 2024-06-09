import { useEffect, useRef, useState } from "react";
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
  duration,
  onClose,
}: Props) => {
  const [timerWidth, setTimerWidth] = useState(100);
  const timerRef = useRef<number>(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerRef.current > 0) {
        timerRef.current -= 100;
        setTimerWidth((timerRef.current / duration) * 100);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [duration]);

  const handleClose = () => {
    if (typeof onClose === "function") onClose();
  };

  return (
    <div className={`${styles.toastContainer} ${styles[type]}`}>
      <div className={`${styles.toastInfo}`}>
        <span>{message}</span>
        <span onClick={() => handleClose()} className={styles.closeButton}>
          &times;
        </span>
      </div>
      <div
        className={`${styles.timer}`}
        style={{
          width: `${timerWidth}%`,
        }}
      ></div>
    </div>
  );
};

export default Toast;

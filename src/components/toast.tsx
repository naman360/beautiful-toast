import { useEffect, useRef, useState } from "react";
import styles from "../styles/toast.module.css";
import { ToastPosition, ToastType } from "../types/toastTypes";
import { animationMap } from "../utils/constants";

type Props = {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
  onClose: (id: string) => void;
  position: ToastPosition;
  description?: string;
};

const Toast = ({
  id,
  type = "info",
  message = "This is an info",
  duration,
  onClose,
  position,
  description,
}: Props) => {
  const [timerWidth, setTimerWidth] = useState(100);
  const timerRef = useRef<number>(duration);
  const [toastRegistered, setToastRegistered] = useState(true);

  useEffect(() => {
    setToastRegistered(true);
    const interval = setInterval(() => {
      if (timerRef.current > 0) {
        timerRef.current -= 100;
        if (timerRef.current === 100) setToastRegistered(false);
        setTimerWidth((timerRef.current / duration) * 100);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [duration]);

  const handleClose = () => {
    setToastRegistered(false);
    setTimeout(() => {
      onClose(id);
    }, 100);
  };

  const dir = position.split("-")[1] as "right" | "left";

  const animation = toastRegistered
    ? animationMap[dir].slide.from
    : animationMap[dir].slide.to;
  return (
    <div
      className={`${styles.toastContainer} ${styles[type]} ${styles[animation]}`}
      style={{
        animationDuration: "0.1s",
      }}
    >
      <div className={`${styles.toastInfo}`}>
        <div className={`${styles.toastTitle}`}>
          <span>{message}</span>
          <span onClick={() => handleClose()} className={styles.closeButton}>
            &times;
          </span>
        </div>
        {description && <span className={styles.toastDesc}>{description}</span>}
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

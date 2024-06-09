import { useEffect, useRef, useState } from "react";
import styles from "../styles/toast.module.css";
import { ToastType } from "../types/toastTypes";

type Props = {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
  onClose: (id: string) => void;
};

const Toast = ({
  id,
  type = "info",
  message = "This is an info",
  duration,
  onClose,
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

  const animationMap = {
    slide: {
      from: "slideIn",
      to: "slideOut",
    },
  };
  const animation = toastRegistered
    ? animationMap.slide.from
    : animationMap.slide.to;
  return (
    <div
      className={`${styles.toastContainer} ${styles[type]} ${styles[animation]}`}
      style={{
        animationDuration: "0.1s",
      }}
    >
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

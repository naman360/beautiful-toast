import { useEffect, useRef, useState } from "react";
import styles from "../styles/toast.module.css";
import { ToastPosition, ToastTheme, ToastType } from "../types/toastTypes";
import { animationMap, typeColor } from "../utils/constants";
import Svg from "./svg";
import success from "../icons/success";
import error from "../icons/error";
import warning from "../icons/warning";
import info from "../icons/info";

type Props = {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
  onClose: (id: string) => void;
  position: ToastPosition;
  description?: string;
  theme: ToastTheme;
};

const Toast = ({
  id,
  type = "info",
  message = "This is an info",
  duration,
  onClose,
  position,
  description,
  theme,
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
  const themeClass = theme === "colored" ? `colored-${type}` : type;

  let icon;
  switch (type) {
    case "success":
      icon = success;
      break;
    case "error":
      icon = error;
      break;

    case "info":
      icon = info;
      break;
    case "warning":
      icon = warning;
      break;
  }
  return (
    <div
      className={`${styles.toastContainer} ${styles[themeClass]} ${styles[animation]}`}
      data-theme={theme !== "colored" ? theme : ""}
      style={{
        animationDuration: "0.1s",
      }}
    >
      <div className={styles.toastData}>
        <div className={styles.toastText}>
          <div className={styles.toastIcon}>
            <Svg
              fill={theme === "colored" ? "#fff" : typeColor[type]}
              icon={icon}
              width={20}
              height={20}
            />
          </div>
          <div className={`${styles.toastInfo}`}>
            <div className={`${styles.toastTitle}`}>
              <span>{message}</span>
            </div>
            {description && (
              <span className={styles.toastDesc}>{description}</span>
            )}
          </div>
        </div>
        <span
          onClick={() => handleClose()}
          className={styles.closeButton}
          style={{
            color: theme === "light" ? "#000" : "#fff",
            opacity: theme === "light" ? "0.3" : "1",
          }}
        >
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

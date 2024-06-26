import { useEffect, useRef, useState } from "react";
import styles from "../styles/toast.module.css";
import { ToastPosition, ToastTheme, ToastType } from "../types/toastTypes";
import { animationMap, typeColor } from "../utils/constants";
import Svg from "./svg";
import success from "../icons/success";
import error from "../icons/error";
import warning from "../icons/warning";
import info from "../icons/info";
import { CustomTheme } from "../hooks/use-toast";

type Props = {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
  onClose: (id: string) => void;
  position: ToastPosition;
  description?: string;
  theme: ToastTheme;
  customStyles?: CustomTheme;
  customIcon?: React.ReactNode;
  iconFill?: string;
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
  customStyles,
  customIcon,
  iconFill,
}: Props) => {
  const [timerWidth, setTimerWidth] = useState(100);
  const timerRef = useRef<number>(duration + 300); //duration + delay in starting progress bar
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
  if (!customIcon) {
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
  } else icon = customIcon;

  return (
    <div
      className={`${styles.toastContainer} ${styles[themeClass]} ${styles[animation]}`}
      data-theme={theme !== "colored" && theme !== "custom" ? theme : ""}
      style={{
        backgroundColor: customStyles?.bgColor,
        animationDuration: "0.5s",
      }}
    >
      <div className={styles.toastData}>
        <div className={styles.toastText}>
          <div className={styles.toastIcon}>
            <Svg
              fill={
                iconFill
                  ? iconFill
                  : theme === "colored"
                  ? "#fff"
                  : typeColor[type]
              }
              icon={icon}
              width={20}
              height={20}
            />
          </div>
          <div className={`${styles.toastInfo}`}>
            <div
              className={`${styles.toastTitle}`}
              style={{
                fontSize: customStyles?.titleSize,
                color: customStyles?.titleColor,
              }}
            >
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
            color: customStyles?.closeButtonColor
              ? customStyles?.closeButtonColor
              : theme === "light"
              ? "#757575"
              : "#fff",
            fontSize: customStyles?.closeButtonSize,
          }}
        >
          &times;
        </span>
      </div>
      <div
        className={`${styles.timer}`}
        style={{
          backgroundColor: customStyles?.timerColor,
          height: customStyles?.timerHeight,
          width: `${timerWidth}%`,
        }}
      ></div>
    </div>
  );
};

export default Toast;

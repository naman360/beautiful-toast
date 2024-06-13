import { useRef, useState } from "react";
import Toast from "../components/toast";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/toast.module.css";
import { ToastPosition, ToastTheme, ToastType } from "../types/toastTypes";

export type ToastDataType = {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
  theme: ToastTheme;
};

export type CustomTheme = {
  bgColor?: string;
  timerColor?: string;
  timerHeight?: string;
  titleColor?: string;
  titleSize?: string;
  descriptionColor?: string;
  descriptionSize?: string;
  closeButtonColor: string;
  closeButtonSize: string;
};
type ShowToastParams = {
  type: ToastType;
  message: string;
  duration: number;
  description?: string;
  theme?: ToastTheme;
  customStyles?: CustomTheme;
};
const useToast = (position: ToastPosition, maxLimit: number) => {
  const [toastList, setToastList] = useState<ToastDataType[]>([]);
  let timerRef = useRef<{ [key: string]: number }>({});

  const showToast = (toastProps: ShowToastParams) => {
    if (
      (toastProps.theme !== "custom" && toastProps.customStyles) ||
      (toastProps.theme === "custom" && !toastProps.customStyles)
    ) {
      throw new Error(
        "Pass theme as 'custom' and customStyles object to apply custom styles"
      );
    }

    const toastId = uuidv4();
    const newToast = {
      id: toastId,
      ...toastProps,
      theme: toastProps.theme || "colored",
    };

    // Setting new toast list based on previous state
    setToastList((prevToastList) => {
      if ([newToast, ...prevToastList].length > maxLimit) return prevToastList;
      else return [newToast, ...prevToastList];
    });

    // Assign timer id for each toastId
    timerRef.current[toastId] = setTimeout(() => {
      // Removing toast from list of which the timer has expired
      handleOnClose(toastId);
      // deleting timerId from ref
      delete timerRef.current[toastId];
    }, toastProps.duration + 500); // total duration= timer duration + animation delay (roughly)
  };

  const handleOnClose = (toastId: string) => {
    setToastList((prevToastList) =>
      prevToastList.filter((toast) => toast.id != toastId)
    );
  };

  const ToastComponent = (
    <div className={styles[position]}>
      {toastList.length > 0
        ? toastList.map((toastInfo) => (
            <Toast
              key={toastInfo.id}
              {...toastInfo}
              onClose={() => handleOnClose(toastInfo.id)}
              position={position}
            />
          ))
        : null}
    </div>
  );

  return { ToastComponent, showToast };
};
export default useToast;

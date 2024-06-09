import { useRef, useState } from "react";
import Toast from "../components/toast";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/toast.module.css";
import { ToastPosition, ToastType } from "../types/toastTypes";

export type ToastDataType = {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
};

const useToast = (position: ToastPosition) => {
  const [toastList, setToastList] = useState<ToastDataType[]>([]);
  let timerRef = useRef<{ [key: string]: number }>({});

  const showToast = (toastProps: {
    type: ToastType;
    message: string;
    duration: number;
  }) => {
    const toastId = uuidv4();
    const newToast = { id: toastId, ...toastProps };

    // Setting new toast list based on previous state
    setToastList((prevToastList) => [newToast, ...prevToastList]);

    // Assign timer id for each toastId
    timerRef.current[toastId] = setTimeout(() => {
      // Removing toast from list of which the timer has expired
      handleOnClose(toastId);
      // deleting timerId from ref
      delete timerRef.current[toastId];
    }, toastProps.duration);
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
            />
          ))
        : null}
    </div>
  );

  return { ToastComponent, showToast };
};
export default useToast;

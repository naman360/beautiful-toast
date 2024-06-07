import { useRef, useState } from "react";
import Toast, {
  ToastDataType,
  ToastPosition,
  ToastType,
} from "../components/toast";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/toast.module.css";

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
      setToastList((prevToastList) =>
        prevToastList.filter((toast) => toast.id != toastId)
      );
      // deleting timerId from ref
      delete timerRef.current[toastId];
    }, toastProps.duration);
  };

  const ToastComponent = (
    <div className={styles[position]}>
      {toastList.length > 0
        ? toastList.map((toastInfo) => <Toast {...toastInfo} />)
        : null}
    </div>
  );

  return { ToastComponent, showToast };
};
export default useToast;

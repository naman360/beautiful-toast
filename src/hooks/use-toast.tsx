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
  let timerRef = useRef<null | number>(null);

  const showToast = (toastProps: {
    type: ToastType;
    message: string;
    duration: number;
  }) => {
    const newToast = { id: uuidv4(), ...toastProps };

    setToastList([newToast, ...toastList]);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setToastList([]); // need to remove the toast which has it time completed
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

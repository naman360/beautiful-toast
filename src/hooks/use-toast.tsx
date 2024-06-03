import { useRef, useState } from "react";
import Toast, { ToastDataType } from "../components/toast";

const useToast = () => {
  const [toastData, setToastData] = useState<null | ToastDataType>(null);
  let timerRef = useRef<null | number>(null);
  const showToast = (toastProps: ToastDataType) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToastData(toastProps);
    timerRef.current = setTimeout(() => {
      setToastData(null);
    }, toastProps.duration);
  };

  const ToastComponent = toastData ? <Toast {...toastData} /> : null;

  return { ToastComponent, showToast };
};
export default useToast;

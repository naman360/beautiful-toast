import { useRef, useState } from "react";
import Toast, { ToastDataType, ToastType } from "../components/toast";
import { v4 as uuidv4 } from "uuid";

const useToast = () => {
  const [toastData, setToastData] = useState<null | ToastDataType>(null);
  const [toastList, setToastList] = useState<ToastDataType[]>([]);
  let timerRef = useRef<null | number>(null);

  const showToast = (toastProps: {
    type: ToastType;
    message: string;
    duration: number;
  }) => {
    const newToast = { id: uuidv4(), ...toastProps };
    setToastData(newToast);
    setToastList([...toastList, newToast]);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setToastData(null);
      setToastList([]); // need to remove the toast which has it time completed
    }, toastProps.duration);
  };

  const ToastComponent = (
    <div
      style={{
        gap: "30px",
        position: "fixed",
        bottom: "20px",
        right: "20px",
      }}
    >
      {toastData ? toastList.map((_) => <Toast {...toastData} />) : null}
    </div>
  );

  return { ToastComponent, showToast };
};
export default useToast;

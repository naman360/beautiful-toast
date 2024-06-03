import "./App.css";
import useToast from "./hooks/use-toast";

function App() {
  const { ToastComponent, showToast } = useToast();
  const handleToast = () => {
    showToast({
      type: "warning",
      message: "Warning Toast",
      duration: 5000,
    });
  };

  return (
    <>
      <button onClick={() => handleToast()}>Show Toast</button>
      <button
        onClick={() =>
          showToast({
            type: "info",
            message: "Info Toast",
            duration: 5000,
          })
        }
      >
        Show info
      </button>

      {ToastComponent}
    </>
  );
}

export default App;

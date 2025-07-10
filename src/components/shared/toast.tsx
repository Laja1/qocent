// components/shared/CustomToast.tsx
import { toast, ToastContainer, type ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CustomToastProps {
  message: string;
}

export const CustomToast = ({ message }: CustomToastProps) => {
  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-800">{message}</p>
    </div>
  );
};

// Helper to show it easily
export const showCustomToast = (
  message: string,
  options?: {
    onRetry?: () => void;
    toastOptions?: ToastOptions;
  }
) => {
  toast(<CustomToast message={message} />, options?.toastOptions);
};

// Include this once in your app root (e.g. App.tsx or layout)
export const ToastWrapper = () => <ToastContainer position="top-right" />;

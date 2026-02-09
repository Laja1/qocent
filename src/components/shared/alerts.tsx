import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, X } from "lucide-react";
import { type ReactNode } from "react";

type AlertBoxProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  variant?: "default" | "destructive";
  onClose?: () => void;
  className?: string;
};

export const AlertBox = ({
  title,
  description,
  icon = <Terminal />,
  variant = "default",
  onClose,
  className = "",
}: AlertBoxProps) => {
  return (
    <Alert
      variant={variant}
      className={`bg-black shadow-xs border-0 text-white justify-between flex items-center rounded-xs ${className}`}
    >
      <div className="flex w-full gap-2">
        {icon}
        <div>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription className="text-xs">{description}</AlertDescription>
        </div>
      </div>
      {onClose && (
        <button onClick={onClose} className="ml-4 hover:cursor-pointer">
          <X className="w-4 h-4" />
        </button>
      )}
    </Alert>
  );
};

import { useNavigate } from "react-router-dom";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import { ArrowLeftCircle } from "lucide-react";

type HeaderProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  navigateBack?: boolean;
};

export const Header = ({
  title,
  description,
  children,
  navigateBack,
}: HeaderProps) => {
  const navigate = useNavigate();
  const { state } = useSidebar(); // Get sidebar state

  return (
    <header
      className={`fixed top-0 z-10 bg-black border-b border-gray-700 text-white font-brfirma px-6 py-2 transition-all duration-300 ease-in-out left-0 right-0 ${
        state === "expanded" ? "md:left-60" : "md:left-0"
      }`}
    >
      <div className="relative z-10 flex items-center justify-between w-full">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          {navigateBack ? (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-white hover:opacity-80 flex-shrink-0"
            >
              <ArrowLeftCircle className="size-6" />
            </button>
          ) : (
            <SidebarTrigger className="flex-shrink-0" />
          )}

          <div className="flex flex-col min-w-0 flex-1">
            {title && <h1 className="text-base font-bold truncate">{title}</h1>}
            {description && (
              <p className="text-xs text-gray-400 dark:text-black leading-tight truncate">
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="flex-shrink-0 ml-4">{children}</div>
      </div>
    </header>
  );
};

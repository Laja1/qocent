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
  const { state } = useSidebar();

  return (
    <header className="sticky top-4 z-20 px-5 pt-1 pb-4">
      <div
        className={`relative z-10 flex items-center justify-between w-full  px-4 py-3  transition-all duration-300 ease-in-out ${
          state === "expanded" ? "md:ml-0" : ""
        }`}
      >
        <div className="flex items-start gap-3 min-w-0 flex-1">
          {navigateBack ? (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground flex-shrink-0"
            >
              <ArrowLeftCircle className="size-6" />
            </button>
          ) : (
            <SidebarTrigger className="flex-shrink-0 text-muted-foreground hover:text-foreground" />
          )}

          <div className="flex flex-col min-w-0 flex-1">
            {title && <h1 className="text-base font-semibold truncate">{title}</h1>}
            {description && (
              <p className="text-xs text-muted-foreground leading-tight truncate">
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

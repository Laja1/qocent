import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "../ui/sidebar";
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

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center border-b border-border bg-[#fafafa] px-5">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {navigateBack ? (
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex shrink-0 items-center text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeftCircle className="size-6" />
            </button>
          ) : (
            <SidebarTrigger className="shrink-0 text-muted-foreground hover:text-foreground" />
          )}

          <div className="min-w-0">
            {title && (
              <h1 className="truncate text-sm font-semibold text-foreground">
                {title}
              </h1>
            )}
            {description && (
              <p className="truncate text-xs text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </div>

        {children && <div className="shrink-0">{children}</div>}
      </div>
    </header>
  );
};

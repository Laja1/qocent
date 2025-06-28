import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "../ui/sidebar";
import { ArrowLeftCircle } from "lucide-react";
import { svgLinks } from "@/assets/assetLink";

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
    <header className="relative z-10 bg-green-950 text-white font-brfirma  top-0 h-14 px-6 py-2">
      
      <img
        src={svgLinks.grunge}
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 pointer-events-none"
        alt="background texture"
      />

      {/* Header Content */}
      <div className="relative z-10 flex items-center justify-between w-full">
        <div className="flex items-start gap-3">
          {navigateBack ? (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-white hover:opacity-80"
            >
              <ArrowLeftCircle className="size-6" />
            </button>
          ) : (
            <SidebarTrigger />
          )}

          <div className="flex flex-col">
            {title && <h1 className="text-lg font-bold">{title}</h1>}
            {description && (
              <p className="text-xs text-gray-400 leading-tight">{description}</p>
            )}
          </div>
        </div>

        {/* Right Slot for Actions */}
        <div>{children}</div>
      </div>
    </header>
  );
};

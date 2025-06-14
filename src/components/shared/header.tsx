import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "../ui/sidebar";
import { ArrowLeftCircle } from "lucide-react";

type HeaderProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  navigateBack?:boolean
};



export const Header = ({
  title,
  description,
  children,
  navigateBack
}: HeaderProps) => {
  const navigate = useNavigate()
  return (
    <header className="border-b w-full font-brfirma  bg-green-950 text-white border-gray-200 px-6 py-[5px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {
            navigateBack? <div
            onClick={() => navigate(-1)}
            className="flex cursor-pointer  items-center space-x-2"
            >
              <ArrowLeftCircle className="size-6" />
          </div> : <SidebarTrigger />
          }
         
          <div className="flex flex-col ">
            <h1 className="text-lg font-bold text-white">{title}</h1>
            <p className="text-xs text-gray-600">{description}</p>
          </div>{" "}
        </div>
        <div>
          {children}
        </div>
      </div>
    </header>
  );
};

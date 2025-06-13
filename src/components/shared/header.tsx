import { SidebarTrigger } from "../ui/sidebar";

type HeaderProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};



export const Header = ({
  title,
  description,
  children,
}: HeaderProps) => {
  return (
    <header className="border-b w-full  bg-[#B19662] text-white border-gray-200 px-6 py-[5px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
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

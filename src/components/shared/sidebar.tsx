import { Cloud, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { sidebarItems } from "@/utilities/constants/config";
import {  svgLinks } from "@/assets/assetLink";
import { RouteConstant } from "@/router/routes";

export const SidebarLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isItemActive = (itemHref: string) => {
    // Exact match for dashboard root
    if (itemHref === "" && pathname === "") {
      return true;
    }
    // For other routes, check if the current path starts with the item's href
    // but make sure it's a complete segment match
    if (itemHref !== "") {
      return pathname.startsWith(itemHref + "/") || pathname === itemHref;
    }
    return false;
  };

  return (
    <Sidebar className="font-brfirma">
      <SidebarHeader className="bg-green-950   text-white  border-gray-200  p-[8px]">
          
      <img
        src={svgLinks.grunge}
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-50 pointer-events-none"
        alt="background texture"
      />
        <div className="flex items-center space-x-2">
          <Cloud className="h-6 w-6" color="white" />
          <div>
            <h2 className="font-bold text-base">Qucoon Cloud</h2>
            <p className="text-xs text-gray-400 leading-tight">ife@example.com</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-[#edf2ef] ">
        <SidebarGroup>
          <SidebarGroupLabel className="">ACCOUNT</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => {
                const isActive = isItemActive(item.href);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={isActive} asChild>
                      <Link to={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t  bg-[#edf2ef] border-gray-200 p-4">
        <div
          onClick={() => navigate(RouteConstant.auth.sigin.path)}
          className="text-xs flex items-center text-red-700 gap-2 hover:cursor-pointer"
        >
          <LogOut className="size-4 " /> <p>Logout</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

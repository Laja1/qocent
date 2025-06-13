import { Cloud } from "lucide-react";
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
import { Link, useLocation } from "react-router-dom";
import { sidebarItems } from "@/utils/constants/config";

export const SidebarLayout = () => {
  const { pathname } = useLocation();

  const isItemActive = (itemHref: string) => {
    // Exact match for dashboard root
    if (itemHref === "/dashboard" && pathname === "/dashboard") {
      return true;
    }
    // For other routes, check if the current path starts with the item's href
    // but make sure it's a complete segment match
    if (itemHref !== "/dashboard") {
      return pathname.startsWith(itemHref + "/") || pathname === itemHref;
    }
    return false;
  };

  return (
    <Sidebar  >
      <SidebarHeader className="border-b bg-black text-white  border-gray-200 p-[7px]">
        <div className="flex items-center space-x-2">
          <Cloud className="h-6 w-6" color="white" />
          <div>
            <h2 className="font-semibold text-white">Qucoon Cloud</h2>
            <p className="text-xs text-gray-500">ife@example.com</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className=" " >
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
      <SidebarFooter className="border-t  border-gray-200 p-4">
        <div className="text-xs text-gray-500">
          <p>Region: US East (N. Virginia)</p>
          <p>Account ID: 123456789012</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

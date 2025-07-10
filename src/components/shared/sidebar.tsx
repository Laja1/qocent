import {
  Cloud,
  LogOut,
  Settings,
  Construction,
  Warehouse,
  Wallet,
  Users,
  RotateCcwKey,
  Anchor,
  Bot,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RouteConstant } from "@/router/routes";
import type { ReactElement } from "react";
import { IconCloudComputing } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { authStore } from "@/store/authSlice";
import type { RootState } from "@/store";

export interface SidebarItem {
  title: string;
  icon: ReactElement;
  href: string;
  isActive: boolean;
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Server Sites (Accounts)",
    icon: <IconCloudComputing className="text-green-700" />,
    href: "/server-sites",
    isActive: false,
  },
  {
    title: "Server Houses (VPCs)",
    icon: <Warehouse className="text-purple-700" />,
    href: "/server-houses",
    isActive: false,
  },
  {
    title: "Server Rooms (Subnets)",
    icon: <Construction className="text-blue-600" />,
    href: "/server-rooms",
    isActive: false,
  },
  {
    title: "Resources",
    icon: <Anchor className="text-red-700" />,
    href: "/resources",
    isActive: false,
  },

  {
    title: "Access Management",
    icon: <RotateCcwKey className="text-red-800" />,
    href: "/command-center",
    isActive: false,
  },
  {
    title: "Billing & Statements",
    icon: <Wallet className="text-green-800" />,
    href: "/billings",
    isActive: false,
  },
  {
    title: "Organization",
    icon: <Users className="" />,
    href: "/organizations",
    isActive: false,
  },
  {
    title: "Settings",
    icon: <Settings className="text-red-700" />,
    href: "/settings",
    isActive: false,
  },
  {
    title: "Build with Qoonity AI",
    icon: <Bot className="text-emerald-700" />,
    href: "/identity-center",
    isActive: false,
  },
];

export const SidebarLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const handleLogout = () => {
    dispatch(authStore.action.logout());
    navigate(RouteConstant.auth.signin.path);
  };

  const user = useSelector((state: RootState) => state.auth);

  return (
    <Sidebar className="font-brfirma">
      <SidebarHeader className="bg-green-950   text-white  border-gray-200  p-[8px]">
        <div className="flex items-center space-x-2">
          <Cloud className="h-6 w-6" color="white" />
          <div>
            <h2 className="font-bold text-base">Qucoon Cloud</h2>
            <p className="text-xs text-gray-400 leading-tight">
              {user?.userEmail}
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-[#fff] ">
        <SidebarGroup>
          {/* <SidebarGroupLabel className="">ACCOUNT</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {sidebarItems.map((item) => {
                const isActive = isItemActive(item.href);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={isActive} asChild>
                      <Link to={item.href}>
                        {item.icon}
                        <span className="text-xs">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t  bg-[#fff] border-gray-200 p-4">
        <div
          onClick={() => handleLogout()}
          className="text-xs flex items-center text-red-700 gap-2 hover:cursor-pointer"
        >
          <LogOut className="size-4 " /> <p>Logout</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

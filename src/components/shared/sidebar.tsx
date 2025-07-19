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
  LayoutList,
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
import { imgLinks } from "@/assets/assetLink";

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
    title: "Resources (Category)",
    icon: <Anchor className="text-red-700" />,
    href: "/resources",
    isActive: false,
  },
  {
    title: "Resources (Details)",
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
    title: "Build with Qoonity AI",
    icon: <Bot className="text-emerald-700" />,
    href: "/identity-center",
    isActive: false,
  },
  {
    title: "Switch workspace",
    icon: <LayoutList className="text-zinc-700" />,
    href: "/console",
    isActive: false,
  },
  {
    title: "Settings",
    icon: <Settings className="text-red-700" />,
    href: "/settings",
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
  const dashboard = useSelector((state:RootState)=>state.dashboard)
  const initials = `${user?.userFirstName?.[0] ?? ""}${
    user?.userLastName?.[0] ?? ""
  }`.toUpperCase();

const Icon = ()=>{
  switch(dashboard.provider){
    case('aws'):
    return <img src={imgLinks.awsLogo} className="size-8" />
    case('huawei'):
    return <img src={imgLinks.huaweiLight} className="size-10" />
  }
}

  return (
    <Sidebar className="font-brfirma">
      <SidebarHeader className="bg-gray-950   text-white  border-gray-200  p-[8px]">
        <div className="flex items-center space-x-2 justify-between ">
          <div className="flex space-x-2">
            <Cloud className="h-6 w-6" color="white" />
            <div className="">
              <h2 className="font-bold text-base">Qocent</h2>
              <p className="text-xs line-clamp-1 text-gray-400 leading-tight">
                {user?.userEmail}
              </p>
            </div>
          </div>
         {Icon()}
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
      <SidebarFooter className="border-t flex flex-row justify-between bg-[#fff] border-gray-200 px-4 py-2">
        <div
          onClick={() => handleLogout()}
          className="text-xs flex items-center text-red-700 gap-2 hover:cursor-pointer"
        >
          <LogOut className="size-4 " /> <p>Logout</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#f4f4f4] text-black flex items-center justify-center text-sm font-medium">
          {initials}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

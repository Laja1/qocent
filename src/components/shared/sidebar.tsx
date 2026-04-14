import {
  LogOut,
  Settings,
  Users,
  LayoutList,
  Wallet,
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
import {
  // IconBrowser,
  // IconCarouselVertical,
  IconCloudComputing,
  IconHome,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { authStore } from "@/store/authSlice";
import type { RootState } from "@/store";
import { imgLinks, svgLinks } from "@/assets/assetLink";
import type { ReactElement } from "react";
export interface SidebarItem {
  title: string;
  icon: ReactElement;
  href: string;
  isActive: boolean;
}

export const SidebarLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const account = useSelector((state: RootState) => state.account);
  const navItems: SidebarItem[] = [
    {
      title: "Server Sites",
      icon: <IconHome className="size-4 text-white/70" />,
      href: RouteConstant.dashboard.serverSite.path,
      isActive: false,
    },
    // {
    //   title: "Resources",
    //   icon: <IconCloudComputing className="size-4 text-white/70" />,
    //   href: RouteConstant.dashboard.resources.path,
    //   isActive: false,
    // },
    {
      title: "Subscriptions",
      icon: <Users className="size-4 text-white/70" />,
      href: RouteConstant.dashboard.subscription.path,
      isActive: false,
    },
    {
      title: "Billing & Statements",
      icon: <Wallet className="size-4 text-white/70" />,
      href: RouteConstant.dashboard.billings.path,
      isActive: false,
    },
    ...(account.type === "INTERNAL"
      ? [
          {
            title: "Access",
            icon: <Users className="size-4 text-white/70" />,
            href: RouteConstant.dashboard.access.path,
            isActive: false,
          },
        ]
      : []),
    {
      title: "Switch workspace",
      icon: <LayoutList className="size-4 text-white/70" />,
      href: RouteConstant.dashboard.console.path,
      isActive: false,
    },
    {
      title: "Settings",
      icon: <Settings className="size-4 text-white/70" />,
      href: RouteConstant.dashboard.settings.path,
      isActive: false,
    },
  ];

  const dashboard = useSelector((state: RootState) => state.dashboard);

  const Icon = () => {
    switch (dashboard.provider) {
      case "aws":
        return <img src={imgLinks.awsLogo} className="size-8" />;
      case "huawei":
        return <img src={imgLinks.huaweiLight} className="size-6" />;
      default:
        return null;
    }
  };

  const isItemActive = (itemHref: string) =>
    pathname === itemHref || pathname.startsWith(`${itemHref}/`);

  const handleLogout = () => {
    dispatch(authStore.action.logout());
    navigate(RouteConstant.auth.signin.path);
  };

  return (
    <Sidebar className="font-brfirma border-r border-white/10 bg-[#0c0d10]">
      <SidebarHeader className="bg-[#0c0d10] text-white border-white/10 border-b p-3">
        <div className="flex items-center space-x-2 justify-between">
          <div className="flex space-x-2">
            <img src={svgLinks.logoWhite} className="h-8" />
            <div>
              {/* <p className="text-xs text-gray-400 line-clamp-1">
                {user?.userEmail}
              </p> */}
            </div>
          </div>
          {Icon()}
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-[#0c0d10]">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={isItemActive(item.href)} asChild>
                    <Link to={item.href}>
                      {item.icon}
                      <span className="text-xs text-white/90">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t flex flex-row justify-between border-white/10 px-4 py-2 bg-[#0c0d10]">
        <div
          onClick={handleLogout}
          className="text-xs flex py-2 items-center text-[#C12C27] gap-2 cursor-pointer hover:text-red-200 transition-colors"
        >
          <LogOut className="size-4" />
          <p>Logout</p>
        </div>
        <button className="  rounded-full"></button>
      </SidebarFooter>
    </Sidebar>
  );
};

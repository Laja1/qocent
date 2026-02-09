import {
  LogOut,
  Settings,
  Users,
  LayoutList,
  AlignHorizontalDistributeCenter,
  Wallet,
  // Webhook,
  // Search,
  ChartNoAxesColumn,
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
import { NavMain } from "../ui/nav-main";
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
  const sidebarItems: SidebarItem[] = [
    // {
    //   title: "Build with Qoonity AI",
    //   icon: <Bot className="text-black" />,
    //   href: "/identity-center",
    //   isActive: false,
    // },
    {
      title: "Switch workspace",
      icon: <LayoutList className="text-black" />,
      href: "/console",
      isActive: false,
    },
    {
      title: "Settings",
      icon: <Settings className="text-black" />,
      href: "/settings",
      isActive: false,
    },
  ];

  const data = {
    serverSite: [
      {
        title: "Resources Console",
        url: "#",
        icon: <IconCloudComputing className="text-black-500  size-5" />,

        isActive: false,
        items: [
          {
            title: "Server Sites",
            icon: (
              <IconHome className="text-gray-800  size-5" />
            ),
            url: RouteConstant.dashboard.serverSite.path,
          },
          // {
          //   title: "Server Houses",
          //   icon: (
          //     <IconCarouselVertical className="text-gray-800 size-5" />
          //   ),
          //   url: RouteConstant.dashboard.serverHouses.path,
          // },
          // {
          //   title: "Server Rooms",
          //   icon: (
          //     <IconBrowser className="text-gray-800 size-5" />
          //   ),
          //   url: RouteConstant.dashboard.serverRooms.path,
          // },
          // {
          //   title: "Resources",
          //   icon: (
          //     <Webhook className="text-gray-800 size-5" />
          //   ),
          //   url: RouteConstant.dashboard.resources.path,
          // },
          // {
          //   title: "Monitoring",
          //   icon: <Search className="text-gray-800 size-5" />,
          //   url: RouteConstant.dashboard.monitoring.path,
          // },
          {
            title: "Finops",
            icon: (
              <ChartNoAxesColumn className="text-gray-800 size-5" />
            ),
            url: RouteConstant.dashboard.finops.path,
          },
        ],
      },
    ],
    others: [
      {
        title: "Management",
        url: "#",
        icon: (
          <AlignHorizontalDistributeCenter className=" size-5" />
        ),

        isActive: false,
        items: [
          {
            title: "Subscriptions",
            icon: <Users className="size-4 text-gray-800" />,
            url: RouteConstant.dashboard.subscription.path,
          },
          // {
          //   title: "Starter Packs",
          //   icon: (
          //     <PackageOpen className="size-4 text-gray-800" />
          //   ),
          //   url: RouteConstant.dashboard.starterPacks.path,
          // },
          {
            title: "Billing & Statements",
            icon: <Wallet className="size-4 text-gray-800" />,
            url: RouteConstant.dashboard.billings.path,
          },
          // account.type === "INTERNAL"
          //   ? {
          //       title: "Organization",
          //       icon: (
          //         <Users className="size-4 text-gray-800" />
          //       ),
          //       url: RouteConstant.dashboard.billings.path,
          //     }
          //   : null,
          account.type === "INTERNAL"
            ? {
                title: "Access",
                icon: (
                  <Users className="size-4 text-gray-800" />
                ),
                url: RouteConstant.dashboard.access.path,
              }
            : null,
        ].filter(Boolean) as {
          title: string;
          icon: ReactElement;
          url: string;
        }[],
      },
    ],
  };

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
    <Sidebar className="font-brfirma">
      <SidebarHeader className="bg-black text-gray-900 border-gray-200 border-b  p-[8px]">
        <div className="flex items-center space-x-2 justify-between">
          <div className="flex space-x-2">
            <img src={svgLinks.logoWhite} className="h-10" />
            <div>
              {/* <p className="text-xs text-gray-400 line-clamp-1">
                {user?.userEmail}
              </p> */}
            </div>
          </div>
          {Icon()}
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-white">
        <NavMain title="Menu" items={data.serverSite} />
        <NavMain title="Others" items={data.others} />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={isItemActive(item.href)} asChild>
                    <Link to={item.href}>
                      {item.icon}
                      <span className="text-xs">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t flex flex-row justify-between  border-gray-200 px-4 py-1">
        <div
          onClick={handleLogout}
          className="text-xs flex py-2 items-center text-red-600 gap-2 cursor-pointer"
        >
          <LogOut className="size-4" />
          <p>Logout</p>
        </div>
        <button className="  rounded-full"></button>
      </SidebarFooter>
    </Sidebar>
  );
};

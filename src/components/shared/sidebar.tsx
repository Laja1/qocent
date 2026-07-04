import {
  Settings,
  Users,
  Wallet,
  Mail,
  UserPlus,
} from "lucide-react";
import { SidebarProfile } from "./sidebar-profile";
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
import { Link, useLocation } from "react-router-dom";
import { RouteConstant } from "@/router/routes";
import { IconHome } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { imgLinks, svgLinks } from "@/assets/assetLink";
import type { ReactElement } from "react";
import { canInviteBusinessUsers } from "@/utilities/contextPermissions";

export interface SidebarItem {
  title: string;
  icon: ReactElement;
  href: string;
  isActive: boolean;
}

export const SidebarLayout = () => {
  const { pathname } = useLocation();
  const account = useSelector((state: RootState) => state.account);
  const activeContext = useSelector(
    (state: RootState) => state.context?.activeContext
  );
  const isBusiness = useSelector((state: RootState) => state.auth.isBusiness);
  const canManageInvites = isBusiness || canInviteBusinessUsers(activeContext);

  const navItems: SidebarItem[] = [
    {
      title: "Server Sites",
      icon: <IconHome className="size-4" />,
      href: RouteConstant.dashboard.serverSite.path,
      isActive: false,
    },
    {
      title: "Subscriptions",
      icon: <Users className="size-4" />,
      href: RouteConstant.dashboard.subscription.path,
      isActive: false,
    },
    {
      title: "Billing & Statements",
      icon: <Wallet className="size-4" />,
      href: RouteConstant.dashboard.billings.path,
      isActive: false,
    },
    ...(account.type === "INTERNAL"
      ? [
          {
            title: "Access",
            icon: <Users className="size-4" />,
            href: RouteConstant.dashboard.access.path,
            isActive: false,
          },
        ]
      : []),
    {
      title: "Invite Inbox",
      icon: <Mail className="size-4" />,
      href: RouteConstant.dashboard.inviteInbox.path,
      isActive: false,
    },
    ...(canManageInvites
      ? [
          {
            title: "Invite Management",
            icon: <UserPlus className="size-4" />,
            href: RouteConstant.dashboard.inviteManagement.path,
            isActive: false,
          },
        ]
      : []),
    {
      title: "Settings",
      icon: <Settings className="size-4" />,
      href: RouteConstant.dashboard.settings.path,
      isActive: false,
    },
  ];

  const dashboard = useSelector((state: RootState) => state.dashboard);

  const Icon = () => {
    switch (dashboard.provider) {
      case "aws":
        return <img src={imgLinks.awsLogo} className="size-8" alt="AWS" />;
      case "huawei":
        return <img src={imgLinks.huaweiLight} className="size-6" alt="Huawei" />;
      default:
        return null;
    }
  };

  const isItemActive = (itemHref: string) =>
    pathname === itemHref || pathname.startsWith(`${itemHref}/`);

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar font-brfirma">
      <SidebarHeader className="flex h-14 shrink-0 items-center border-b border-sidebar-border bg-sidebar px-4">
        <div className="flex w-full items-center justify-between gap-2">
          <img src={svgLinks.logo} className="h-7" alt="Qocent" />
          {Icon()}
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navItems.map((item) => (
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

      <SidebarFooter className="bg-sidebar p-2">
        <SidebarProfile />
      </SidebarFooter>
    </Sidebar>
  );
};

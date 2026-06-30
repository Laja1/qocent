import { Bell, ChevronsUpDown, CreditCard, LogOut, Settings, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RouteConstant } from "@/router/routes";
import { authStore } from "@/store/authSlice";
import type { RootState } from "@/store";
import { cn } from "@/lib/utils";

function getInitials(
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null
) {
  if (firstName || lastName) {
    const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
    return initials || "?";
  }
  return email?.[0]?.toUpperCase() ?? "?";
}

function getDisplayName(
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null
) {
  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();
  if (fullName) return fullName;
  if (email) return email.split("@")[0];
  return "Account";
}

export function SidebarProfile({ className }: { className?: string }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userEmail, userFirstName, userLastName } = useSelector(
    (state: RootState) => state.auth
  );

  const displayName = getDisplayName(userFirstName, userLastName, userEmail);
  const initials = getInitials(userFirstName, userLastName, userEmail);

  const handleLogout = () => {
    dispatch(authStore.action.logout());
    navigate(RouteConstant.auth.signin.path);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex w-full items-center gap-2 rounded-md p-2 text-left text-sm outline-none transition-colors",
            "hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-sidebar-ring",
            className
          )}
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xs font-semibold text-primary">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-sidebar-foreground">
              {displayName}
            </p>
            {userEmail && (
              <p className="truncate text-[11px] text-muted-foreground">
                {userEmail}
              </p>
            )}
          </div>
          <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="top"
        align="start"
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-2 py-2">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-xs font-semibold text-primary">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{displayName}</p>
              {userEmail && (
                <p className="truncate text-xs text-muted-foreground">
                  {userEmail}
                </p>
              )}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer text-xs">
          <Link to={RouteConstant.dashboard.settings.path}>
            <User className="mr-2 size-4" />
            Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer text-xs">
          <Link to={RouteConstant.dashboard.billings.path}>
            <CreditCard className="mr-2 size-4" />
            Billing
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer text-xs">
          <Link to={RouteConstant.dashboard.settings.path}>
            <Bell className="mr-2 size-4" />
            Notifications
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer text-xs">
          <Link to={RouteConstant.dashboard.settings.path}>
            <Settings className="mr-2 size-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-xs text-primary focus:text-primary"
        >
          <LogOut className="mr-2 size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

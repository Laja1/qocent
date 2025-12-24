import { imgLinks } from "@/assets/assetLink";
import { LogOut, Moon, Sun } from "lucide-react";
import { RouteConstant } from "@/router/routes";
import { authStore } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dashboardStore } from "@/store/dashboardSlice";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useGetOrganizationQuery } from "@/service/python/organizationApi";
import { useOrganizationStore } from "@/store/organizationStore";
import { useEffect } from "react";

export const ConsoleLeft = () => {
  const { isDark, toggle } = useDarkMode();
  const { data } = useGetOrganizationQuery();
  const { setOrganization, clearOrganization } = useOrganizationStore();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Set organization if data exists
  useEffect(() => {
    if (data?.data) {
      setOrganization(data.data);
    }
  }, [data, setOrganization]);

  const handleLogout = () => {
    dispatch(authStore.action.logout());
    clearOrganization();
    navigate(RouteConstant.auth.signin.path);
  };

  const handleClick = (provider: "huawei" | "aws" | "azure" | "gcp") => {
    dispatch(dashboardStore.action.setProvider(provider));
    navigate(RouteConstant.dashboard.serverSite.path);
  };

  const workspaces = [
    {
      provider: "aws" as const,
      name: "AWS Cloud",
      icon: imgLinks.awsdark,
      alt: "AWS",
      loading: false,
    },
    {
      provider: "huawei" as const,
      name: "Huawei Cloud",
      icon: imgLinks.huawei,
      alt: "Huawei",
      loading: false,
    },
    // Uncomment when ready
    // {
    //   provider: "gcp" as const,
    //   name: "Google Cloud",
    //   icon: imgLinks.gcp,
    //   alt: "Google Cloud",
    //   loading: false,
    // },
    // {
    //   provider: "azure" as const,
    //   name: "Azure Cloud",
    //   icon: imgLinks.azure,
    //   alt: "Azure Cloud",
    //   loading: false,
    // },
  ];

  return (
    <div className="h-full flex flex-col justify-between bg-white dark:bg-black">
      {/* Top Menu */}
      <div className="p-3 sm:p-4 flex-1 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sticky top-0 z-10 pb-2">
          <h2 className="text-sm sm:text-base font-brfirma-bold text-gray-900 dark:text-white">
            Workspaces
          </h2>

          {/* Mobile logout button */}
          <button
            onClick={handleLogout}
            className="lg:hidden flex items-center gap-1.5 text-xs text-red-600 
                       px-2.5 py-1.5 rounded-md hover:bg-red-50 active:bg-red-100
                       transition-colors duration-200 font-medium border border-red-200"
            aria-label="Logout"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Logout</span>
          </button>
        </div>

        {/* Workspaces List */}
        <div className="space-y-2">
          {workspaces && workspaces.length > 0 ? (
            workspaces.map((item) => (
              <div
                key={item.provider}
                onClick={() => handleClick(item.provider)}
                className="border border-gray-200 dark:border-gray-800 rounded-md 
                           p-3 flex items-center gap-3 cursor-pointer
                           hover:bg-gray-100 dark:hover:bg-gray-900 transition"
              >
                <img
                  src={item.icon}
                  alt={item.alt}
                  className="w-6 h-6 object-contain"
                />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {item.name}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <div className="mb-2">No workspaces found</div>
              <div className="text-xs">
                Create your first workspace to get started
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex px-4 py-2 justify-between border-t dark:bg-black dark:border-gray-800 border-gray-200">
        {/* Desktop Logout */}
        <div
          onClick={handleLogout}
          className="hidden lg:flex items-center gap-3 text-red-500 cursor-pointer
                     transition-colors duration-200 hover:text-white"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleLogout();
            }
          }}
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Logout</span>
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={toggle}
          className="p-2 bg-gray-200 cursor-pointer dark:bg-gray-900 rounded-full"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </div>
  );
};

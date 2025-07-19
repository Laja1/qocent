import { imgLinks } from "@/assets/assetLink";
import { LogOut } from "lucide-react";
import { RouteConstant } from "@/router/routes";
import { authStore } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dashboardStore } from "@/store/dashboardSlice";
import { useGetResourceByProviderQuery } from "@/service/resourceApi";

export const ConsoleLeft = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: huaweiData } = useGetResourceByProviderQuery({
    provider: "huawei",
    resource: "serverSite",
  });
  const { data: awsData } = useGetResourceByProviderQuery({
    provider: "aws",
    resource: "serverSite",
  });

  const handleLogout = () => {
    dispatch(authStore.action.logout());
    navigate(RouteConstant.auth.signin.path);
  };

  const handleClick = (provider: "huawei" | "aws") => {
    dispatch(dashboardStore.action.setProvider(provider));
    navigate(RouteConstant.dashboard.serverSite.path);
  };

  const workspaces = [
    {
      provider: "aws" as const,
      name: "AWS Workspace",
      icon: imgLinks.awsdark,
      alt: "AWS",
      count: awsData?.data.length ?? 0,
    },
    {
      provider: "huawei" as const,
      name: "Huawei Workspace",
      icon: imgLinks.huawei,
      alt: "Huawei",
      count: huaweiData?.data.length ?? 0,
    },
    {
      provider: "huawei" as const, // Note: This should probably be "gcp"
      name: "Google Cloud Workspace",
      icon: imgLinks.gcp,
      alt: "Google Cloud",
      count: huaweiData?.data.length ?? 0, // Should probably use GCP data
    },
  ];

  return (
    <div className="h-full  flex flex-col justify-between">
      {/* Top Menu */}
      <div className="p-2 sm:p-4">
        <div className="flex justify-between items-center lg:justify-start lg:mb-5 mb-3">
          <p className="text-sm sm:text-base font-brfirma-bold">Workspaces</p>
          {/* Mobile logout button */}
          <button
            onClick={handleLogout}
            className="lg:hidden flex items-center gap-1 text-xs text-red-700 px-2 py-1 rounded hover:bg-red-50 transition-colors"
            aria-label="Logout"
          >
            <LogOut className="size-4" />
            <span className="hidden xs:inline">Logout</span>
          </button>
        </div>

        {/* Workspaces - responsive layout */}
        <div className="flex lg:flex-col lg:space-y-2 justify-center  flex-row lg:overflow-visible overflow-x-auto lg:gap-0 gap-2 pb-2 lg:pb-0">
          {workspaces.map((workspace, index) => (
            <div
              key={index}
              onClick={() => handleClick(workspace.provider)}
              className="group flex lg:flex-row flex-col items-center  gap-2 pb-4 
                         transition-all duration-200 
                         hover:bg-gray-100 hover:rounded-md 
                         lg:hover:ml-2 lg:hover:p-2 hover:p-2
                         lg:min-w-0 min-w-[80px] flex-shrink-0
                         cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleClick(workspace.provider);
                }
              }}
            >
              {/* Hover indicator - only on desktop */}
              <div
                className="h-5 w-1 bg-black opacity-0 group-hover:opacity-100 
                             transition-all duration-200 hidden lg:flex"
              />

              {/* Icon */}
              <img
                src={workspace.icon}
                alt={workspace.alt}
                className="size-5 sm:size-6 flex-shrink-0"
              />

              {/* Text content */}
              <div className="lg:flex-1 text-center lg:text-left">
                <p
                  className="text-xs sm:text-sm font-medium text-gray-900 
                             lg:block  lg:truncate"
                >
                  {workspace.name}
                </p>
                <p className="text-xs text-gray-600 whitespace-nowrap">
                  {workspace.count} Sites
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Logout - hidden on mobile */}
      <div
        onClick={handleLogout}
        className="hidden lg:flex p-3 border-t items-center text-red-700 gap-2 
                   hover:cursor-pointer hover:bg-red-50 transition-colors text-xs"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleLogout();
          }
        }}
      >
        <LogOut className="size-4" />
        <p>Logout</p>
      </div>
    </div>
  );
};

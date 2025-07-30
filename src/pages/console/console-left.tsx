import { imgLinks } from "@/assets/assetLink";
import { LogOut } from "lucide-react";
import { RouteConstant } from "@/router/routes";
import { authStore } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dashboardStore } from "@/store/dashboardSlice";
import { useGetResourceByProviderQuery } from "@/service/typescript/resourceApi";

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
  // Add queries for GCP and Azure if available
  // const { data: gcpData } = useGetResourceByProviderQuery({
  //   provider: "gcp",
  //   resource: "serverSite",
  // });
  // const { data: azureData } = useGetResourceByProviderQuery({
  //   provider: "azure",
  //   resource: "serverSite",
  // });

  const handleLogout = () => {
    dispatch(authStore.action.logout());
    navigate(RouteConstant.auth.signin.path);
  };

  const handleClick = (provider: "huawei" | "aws" | "azure" | "gcp") => {
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
      provider: "gcp" as const, // Fixed: was "huawei"
      name: "Google Cloud Workspace",
      icon: imgLinks.gcp,
      alt: "Google Cloud",
      count: 0, // Use gcpData?.data.length ?? 0 when available
    },
    {
      provider: "azure" as const,
      name: "Azure Cloud Workspace",
      icon: imgLinks.azure,
      alt: "Azure Cloud",
      count: 0, // Use azureData?.data.length ?? 0 when available
    },
  ];

  return (
    <div className="h-full flex flex-col justify-between">
      {/* Top Menu */}
      <div className="p-3 sm:p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm sm:text-base font-brfirma-bold text-gray-900">
            Workspaces
          </h2>
          {/* Mobile logout button */}
          <button
            onClick={handleLogout}
            className="lg:hidden flex items-center gap-1.5 text-xs text-red-600 
                       px-2.5 py-1.5 rounded-xs hover:bg-red-50 active:bg-red-100
                       transition-colors duration-200 font-medium"
            aria-label="Logout"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Logout</span>
          </button>
        </div>

        <div className="lg:space-y-1">
          <div className="lg:hidden">
            <div className="flex gap-3 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-hide">
              {workspaces.map((workspace, index) => (
                <div
                  key={index}
                  onClick={() => handleClick(workspace.provider)}
                  className="flex-shrink-0 w-20 sm:w-24 cursor-pointer group"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleClick(workspace.provider);
                    }
                  }}
                >
                  <div
                    className="flex flex-col items-center text-center p-2 rounded-xs
                                  hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200"
                  >
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xs bg-white shadow-sm
                                    border border-gray-200 flex items-center justify-center mb-2
                                    group-hover:shadow-md transition-shadow duration-200"
                    >
                      <img
                        src={workspace.icon}
                        alt={workspace.alt}
                        className="w-5 h-5 sm:w-6 sm:h-6"
                      />
                    </div>
                    <p className="text-xs font-medium text-gray-900 line-clamp-2 leading-tight mb-1">
                      {workspace.name.replace(" Workspace", "")}
                    </p>
                    <p className="text-xs text-gray-500">
                      {workspace.count} Sites
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Vertical list */}
          <div className="hidden lg:block space-y-1">
            {workspaces.map((workspace, index) => (
              <div
                key={index}
                onClick={() => handleClick(workspace.provider)}
                className="group flex items-center gap-3 p-2 rounded-xs cursor-pointer
                           hover:bg-gray-50 active:bg-gray-100 transition-all duration-200
                           border border-transparent hover:border-gray-200"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleClick(workspace.provider);
                  }
                }}
              >
                {/* Hover indicator */}
                <div
                  className="w-1 h-8 bg-gray-950 rounded-full opacity-0 
                               group-hover:opacity-100 transition-opacity duration-200"
                />

                {/* Icon container */}
                <div
                  className="w-10 h-10 rounded-xs bg-white shadow-sm border border-gray-200
                               flex items-center justify-center flex-shrink-0
                               group-hover:shadow-md transition-shadow duration-200"
                >
                  <img
                    src={workspace.icon}
                    alt={workspace.alt}
                    className="w-5 h-5"
                  />
                </div>

                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {workspace.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {workspace.count} Sites
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Logout - hidden on mobile */}
      <div
        onClick={handleLogout}
        className="hidden lg:flex items-center gap-3 p-4 border-t border-gray-200
                   text-red-600 hover:bg-red-50 active:bg-red-100 cursor-pointer
                   transition-colors duration-200"
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
    </div>
  );
};

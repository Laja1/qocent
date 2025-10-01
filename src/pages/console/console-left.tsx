import { imgLinks } from "@/assets/assetLink";
import { BrainCircuit, BrainCog, LogOut, Moon, Sun } from "lucide-react";
import { RouteConstant } from "@/router/routes";
import { authStore } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dashboardStore } from "@/store/dashboardSlice";
import { CollapsibleItem, SubItem } from "@/components/shared/collapsible";
import type { RootState } from "@/store";
import { useGetUserAccountsQuery } from "@/service/kotlin/authApi";
import { accountStore } from "@/store/accountSlice";
import { useDarkMode } from "@/hooks/useDarkMode";

// Skeleton loader component for workspaces
const WorkspaceSkeleton = () => (
  <div className="animate-pulse space-y-3">
    {[1, 2, 3].map((index) => (
      <div key={index} className="border rounded-md p-3">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="mt-3 ml-9 space-y-2">
          <div className="h-3 bg-gray-200 rounded w-20"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    ))}
  </div>
);

export const ConsoleLeft = () => {
  const user = useSelector((state: RootState) => state.auth);
  const { isDark, toggle } = useDarkMode();
  const { data: workspaceData, isLoading } = useGetUserAccountsQuery(
    {
      userCode: user.userEmail || "",
    },
    {
      skip: !user.userEmail,
    }
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const externalWorkspaces = [
    {
      provider: "aws" as const,
      name: "AWS Cloud",
      icon: imgLinks.awsdark,
      alt: "AWS",
      loading: false,
      sites: [
        {
          name: "Rubies-aws-001",
          siteCode: "rubies-aws-001",
        },
      ],
    },
    {
      provider: "huawei" as const,
      name: "Huawei Cloud",
      icon: imgLinks.huawei,
      alt: "Huawei",
      loading: false,
      sites: [
        {
          name: "Rubies-aws-001",
          siteCode: "rubies-aws-001",
        },
      ],
    },
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
          {isLoading ? (
            <WorkspaceSkeleton />
          ) : (
            <div className="space-y-2">
              {workspaceData?.data.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="mb-2">No workspaces found</div>
                  <div className="text-xs">
                    Create your first workspace to get started
                  </div>
                </div>
              ) : (
                workspaceData?.data.map((workspace, index) => (
                  <div
                    key={workspace.accountId || index}
                    className="border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden "
                  >
                    <CollapsibleItem
                      title={workspace.accountName}
                      icon={BrainCog}
                      defaultOpen={index === 0} // Open first workspace by default
                    >
                      {/* Cloud Providers */}
                      <div className="divide-y divide-gray-100 dark:divide-gray-800">
                        {workspaces.map((item) => (
                          <div key={item.provider} className="relative">
                            <SubItem
                              title={item.name}
                              image={item.icon}
                              onClick={() => {
                                if (item.loading) return;

                                dispatch(
                                  accountStore.action.setAccountDetails({
                                    accountId: workspace.accountId,
                                    accountCode: workspace.accountCode,
                                    accountName: workspace.accountName,
                                    accountUserCode:
                                      workspace.accountUserCode || "",
                                    accountType: workspace.accountType as
                                      | "INDIVIDUAL"
                                      | "ORGANIZATION"
                                      | undefined,
                                    accountStatus: workspace.accountStatus as
                                      | "ACTIVE"
                                      | "INACTIVE"
                                      | undefined,
                                    owner: workspace.owner,
                                  })
                                );

                                handleClick(item.provider);
                              }}
                            />
                            {item.loading && (
                              <div className="absolute inset-0 bg-white bg-opacity-50 cursor-not-allowed" />
                            )}
                          </div>
                        ))}
                      </div>
                    </CollapsibleItem>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Add Workspace Button */}

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="border-dashed border border-gray-200  dark:border-gray-800 rounded-md overflow-hidden ">
            <CollapsibleItem
              title="External Workspace"
              icon={BrainCog}
              defaultOpen={false} // no undefined "index"
            >
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {externalWorkspaces.map((item, index) => (
                  <div key={item.provider} className="relative">
                    <CollapsibleItem
                      title={item.name}
                      icon={BrainCircuit}
                      defaultOpen={index === 0}
                    >
                      {item.sites.map((site) => (
                        <SubItem
                          key={site.siteCode}
                          title={site.name}
                          image={item.icon}
                          onClick={() => {
                            if (item.loading) return;
                            handleClick(item.provider);
                          }}
                        />
                      ))}
                    </CollapsibleItem>
                    {item.loading && (
                      <div className="absolute inset-0 bg-white bg-opacity-50 cursor-not-allowed" />
                    )}
                  </div>
                ))}
              </div>
            </CollapsibleItem>
          </div>
        </div>
        <div></div>
      </div>

      {/* Desktop Logout - hidden on mobile */}
      <div className="flex px-4  py-2 justify-between border-t dark:bg-black dark:border-gray-800 border-gray-200">
        <div
          onClick={handleLogout}
          className="hidden lg:flex items-center gap-3  
                   text-red-500  cursor-pointer
                   transition-colors duration-200 hover:text-white "
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
        <button
          onClick={toggle}
          className=" p-2 bg-gray-200 cursor-pointer dark:bg-gray-900 rounded-full"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </div>
  );
};

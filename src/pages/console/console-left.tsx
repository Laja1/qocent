import { imgLinks } from "@/assets/assetLink";
import {
  BrainCog,
  Command,
  LogOut,
  PlusCircleIcon,
  PlusSquare,
} from "lucide-react";
import { RouteConstant } from "@/router/routes";
import { authStore } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dashboardStore } from "@/store/dashboardSlice";
import { useGetResourceByProviderQuery } from "@/service/typescript/resourceApi";
import { CollapsibleItem, SubItem } from "@/components/shared/collapsible";
import NiceModal from "@ebay/nice-modal-react";
import type { RootState } from "@/store";
import { ModalConstant } from "@/components/shared/modal/register";
import { useGetUserAccountsQuery } from "@/service/kotlin/authApi";
import { accountStore } from "@/store/accountSlice";

export const ConsoleLeft = () => {
  const user = useSelector((state: RootState) => state.auth);
  const { data: workspaceData } = useGetUserAccountsQuery(
    {
      userCode: user.userEmail || "",
    },
    {
      skip: !user.userEmail,
    }
  );
  console.log(workspaceData);

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
    // Fix: setAccountDetails expects Partial<AccountState>, not AccountData[]

    navigate(RouteConstant.dashboard.serverSite.path);
  };

  const workspaces = [
    {
      provider: "aws" as const,
      name: "AWS Cloud",
      icon: imgLinks.awsdark,
      alt: "AWS",
      count: awsData?.data.length ?? 0,
    },
    {
      provider: "huawei" as const,
      name: "Huawei Cloud",
      icon: imgLinks.huawei,
      alt: "Huawei",
      count: huaweiData?.data.length ?? 0,
    },
    {
      provider: "gcp" as const, // Fixed: was "huawei"
      name: "Google Cloud",
      icon: imgLinks.gcp,
      alt: "Google Cloud",
      count: 0, // Use gcpData?.data.length ?? 0 when available
    },
    {
      provider: "azure" as const,
      name: "Azure Cloud",
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
          {/* Desktop: Vertical list */}
          {workspaceData?.data.map((workspace) => (
            <div className=" lg:block space-y-1">
              <CollapsibleItem
                title={workspace.accountName}
                icon={BrainCog}
                defaultOpen={false}
              >
                {workspace.owner === "YES" && (
                  <div>
                    <div
                      onClick={() => NiceModal.show("InviteToWorkspace", workspace)}
                      className="text-gray-600 ml-2 px-2 border-l text-xs flex items-center py-2 gap-2 cursor-pointer"
                    >
                      <PlusSquare className="size-4 " />
                      Invite to workspace
                    </div>
                    <div
                      onClick={() =>
                        NiceModal.show(
                          ModalConstant.AccessDrawer,
                          workspace?.accountCode
                        )
                      }
                      className="text-gray-600 ml-2 px-2 border-l text-xs flex items-center py-2 gap-2 cursor-pointer"
                    >
                      <Command className="size-4 " />
                      Access management
                    </div>
                  </div>
                )}
                {workspaces.map((item) => (
                  <SubItem
                    key={item.provider}
                    title={item.name}
                    // icon={History}

                    image={item.icon}
                    onClick={() => {
                      dispatch(
                        accountStore.action.setAccountDetails({
                          accountId: workspace.accountId,
                          accountCode: workspace.accountCode,
                          accountName: workspace.accountName,
                          accountUserCode: workspace.accountUserCode || '',
                          accountType: workspace.accountType as "INDIVIDUAL" | "ORGANIZATION" | undefined,
                          accountStatus: workspace.accountStatus as "ACTIVE" | "INACTIVE" | undefined,
                          owner: workspace.owner,
                        })
                      );
                    
                      handleClick(item.provider);
                    }}
                    
                  />
                ))}
              </CollapsibleItem>
            </div>
          ))}
        </div>
        <button
          onClick={() => NiceModal.show("WorkspaceModal")}
          type="button"
          className="group border px-1 hover:ml-2 py-1 rounded-sm border-gray-100 flex gap-3 items-center hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 w-full"
        >
          <div className="w-1 h-8 bg-gray-950 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <PlusCircleIcon className="text-gray-700 size-5" />
          <p className="text-xs text-gray-800">Add Workspace</p>
        </button>
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

import { imgLinks } from "@/assets/assetLink";
import { LogOut } from "lucide-react";
import { RouteConstant } from "@/router/routes";
import { authStore } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dashboardStore } from "@/store/dashboardSlice";

export const ConsoleLeft = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authStore.action.logout());
    navigate(RouteConstant.auth.signin.path);
  };
  const handleClick = (provider: "huawei" | "aws") => {
    dispatch(dashboardStore.action.setProvider(provider));
    navigate(RouteConstant.dashboard.serverSite.path);
  };
  return (
    <div className="h-full flex flex-col justify-between">
      {/* Top Menu */}
      <div className="p-2 space-y-4">
        {/* AWS Workspace */}
        <div
          onClick={() => handleClick("aws")}
          className="group flex items-center gap-2 transition-all duration-200 hover:bg-gray-200 hover:rounded-md hover:ml-2 hover:p-2"
        >
          <div className="h-5 w-1 bg-black opacity-0 group-hover:opacity-100 transition-all duration-200" />
          <img src={imgLinks.awsdark} alt="AWS" className="size-6" />
          <div>
            <p className="text-sm font-medium text-gray-900">AWS Workspace</p>
            <p className="text-xs text-gray-600">0 Sites</p>
          </div>
        </div>

        {/* Huawei Workspace */}
        <div
          onClick={() => handleClick("huawei")}
          className="group flex items-center gap-2 transition-all duration-200 hover:bg-gray-200 hover:rounded-md hover:ml-2 hover:p-2"
        >
          <div className="h-5 w-1 bg-black opacity-0 group-hover:opacity-100 transition-all duration-200" />
          <img src={imgLinks.huawei} alt="Huawei" className="size-6" />
          <div>
            <p className="text-sm font-medium text-gray-900">
              Huawei Workspace
            </p>
            <p className="text-xs text-gray-600">0 Sites</p>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div
        onClick={handleLogout}
        className="text-xs flex p-3 border-t items-center text-red-700 gap-2 hover:cursor-pointer"
      >
        <LogOut className="size-4" /> <p>Logout</p>
      </div>
    </div>
  );
};

import { vpcData } from "@/utilities/constants/config";
import { AwsLogo, HuaweiLogo } from "@/utilities/constants/icons";
import { Router } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ArchitectureOverview = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className={` w-full  bg-black h-fit  flex  rounded-xl p-4 lg:p-5  gap-4`}
      >
        {vpcData.map((item) => (
          <div
            onClick={() => navigate(`/dashboard/architecture/${item.id}`)}
            className="flex cursor-pointer w-full flex-col gap-4 border  rounded-sm border-dashed"
          >
            <p className="text-white text-start text-base pl-2 pt-2 font-bold">
              {item.whereDeployed === "AWS" && <AwsLogo />}
              {item.whereDeployed === "Huawei" && <HuaweiLogo />}
            </p>
            <div className="border border-white rounded-sm items-center   mx-5 flex flex-col justify-center p-5">
              <p className="text-white text-start text-base p-2 font-bold">
                {item.vpcId}
              </p>
              <div className="flex items-center justify-center border my-5   border-purple-600 p-2 rounded-full w-fit">
                <Router className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-white text-center mb-2">{item.cidrBlock}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

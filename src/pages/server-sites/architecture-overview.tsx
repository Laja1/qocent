import { AwsLogo, HuaweiLogo } from "@/utilities/constants/icons";
import { Router } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { houseData } from "../server-houses/config";

export const ServerSiteArchitectureOverview = ({ id }: { id?: string }) => {
  const navigate = useNavigate();
  const filteredData = id
    ? houseData.filter((item) => item.siteCode === id)
    : [];
  console.log("Filtered data:", filteredData);
  console.log("ID:", id);
  return (
    <div>
      <div
        className={` w-full  bg-black h-fit  flex  rounded-xl p-4 lg:p-5  gap-4`}
      >
        {filteredData.map((item) => (
          <div
            onClick={() => navigate(`/architecture/${item.houseId}`)}
            className="flex cursor-pointer w-full flex-col gap-4 border  rounded-sm border-dashed"
          >
            <p className="text-white text-start text-base pl-2 pt-2 font-bold">
              {item.provider === "AWS" && <AwsLogo />}
              {item.provider === "Huawei" && <HuaweiLogo />}
            </p>
            <div className="border border-white rounded-sm items-center   mx-5 flex flex-col justify-center p-5">
              <p className="text-white text-start text-base p-2 font-bold">
                {item.houseName}
              </p>
              <div className="flex items-center justify-center border my-5   border-purple-600 p-2 rounded-full w-fit">
                <Router className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-white text-center mb-2">{item.ipRange}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

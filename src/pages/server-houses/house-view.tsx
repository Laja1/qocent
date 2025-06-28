import { AwsLogo, HuaweiLogo } from "@/utilities/constants/icons";
import { Router } from "lucide-react";
import { roomData } from "../server-rooms/config";

export const HouseView = ({ id }: { id?: string }) => {
  const filteredData = id
    ? roomData.filter((item) => item.siteCode === id)
    : [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rowsToRender = (filteredData:any) => {
    if (filteredData.length > 4) return 'grid grid-cols-2'
    return 'flex'
}
  return (
    <div>
      <div
        className={` w-full  bg-black h-fit  flex  rounded-xl p-4 lg:p-5  gap-4`}
      >
        <div className={`border border-white m-2 ${rowsToRender(filteredData)} w-full rounded-md`}>
          {filteredData.map((item) => {
            const containerClass =
              item.type === "Private" ? "border-[#A17246]" : "border-blue-300";
          
          
            return (
              <div
               
                className={`flex cursor-pointer w-full flex-col gap-4  rounded-sm  `}
                key={item.roomId}
              >
               
                <div
                  className={`border ${containerClass} mt-4 relative rounded-sm items-center mx-5 flex flex-col justify-center p-5`}
                >
                   <div className="absolute top-0 left-0 text-start text-base pl-2 pt-2 font-bold">
                  {item.provider === "AWS" && <AwsLogo />}
                  {item.provider === "Huawei" && <HuaweiLogo />}
                  </div>
                  
                  <p className="text-white text-start text-base p-2 font-bold">
                    {item.roomName}
                  </p>
                  <div className="flex items-center justify-center border my-5 border-purple-600 p-2 rounded-full w-fit">
                    <Router className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <p className="text-white text-center ">{item.type}</p>
                  <p className="text-white text-center mb-2">{item.ipRange}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import { SubnetSection } from "@/components/not-shared/subnet";
import { subnetData } from "@/utils/constants/config";
import { Router } from "lucide-react";

export const Architecture = () => {
  return (
    <div>
      <div className="flex flex-col  bg-black h-fit    rounded-xl p-4 lg:p-10 m-5 gap-4">
        <div className="flex flex-col gap-4 border rounded-sm border-dashed">
          <p className="text-white text-start text-base p-2 font-bold">
            Cloud Region: Paris
          </p>
          <div className="border border-white rounded-xl items-center m-5 flex flex-col justify-center p-5">
            <p className="text-white text-start text-base p-2 font-bold">
              VSR A
            </p>
            <div className="flex items-center justify-center border my-5   border-purple-600 p-2 rounded-full w-fit">
              <Router className="h-6 w-6 text-purple-600" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-center    w-full">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {subnetData.map((subnet: any) => (
                <SubnetSection key={subnet.id} subnet={subnet} />
              ))}
            </div>
          </div>
        </div>
      </div>
            </div>
  );
};

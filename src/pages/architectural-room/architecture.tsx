import { SubnetSection } from "@/components/not-shared/subnet";
import { Header } from "@/components/shared";
import { vpcData } from "@/utilities/constants/config";
import { RowsToRender } from "@/utilities/constants/helper";
import { AwsLogo, HuaweiLogo } from "@/utilities/constants/icons";
import { Router } from "lucide-react";
import { useParams } from "react-router-dom";
import type { VPC } from "@/types";

export const ArchitectureRoom = () => {
  const params = useParams();
  const data = vpcData.find((vpc) => vpc.id === Number(params.id));
  if (!data) return <div>Not found</div>;

  const style = RowsToRender(data as VPC);

  return (
    <div>
      <Header
        title={data?.vpcId}
        description={data?.cidrBlock}
        navigateBack={true}
      />
      <div className={`   bg-black  mt-5 mx-5   rounded-xl p-4 lg:p-5  gap-4`}>
        <div className="flex flex-col gap-4 border  rounded-sm border-dashed">
          <p className="text-white text-start text-base pl-2 pt-2 font-bold">
            {data?.whereDeployed === "AWS" && <AwsLogo />}
            {data?.whereDeployed === "Huawei" && <HuaweiLogo />}
          </p>
          <div className="border border-white rounded-sm items-center   mx-5 flex flex-col justify-center p-5">
            <p className="text-white text-start text-base p-2 font-bold">
              {data?.vpcId}
            </p>
            <div className="flex items-center justify-center border my-5   border-purple-600 p-2 rounded-full w-fit">
              <Router className="h-6 w-6 text-purple-600" />
            </div>

            <div className={`${style} gap-3 items-center    w-full`}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {data?.subnet.map((subnet: any) => (
                <SubnetSection key={subnet.id} subnet={subnet} />
              ))}
            </div>
          </div>
          <p className="text-white text-center mb-2">{data?.cidrBlock}</p>
        </div>
      </div>
    </div>
  );
};

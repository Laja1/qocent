import { motion } from "framer-motion";
import { svgLinks } from "@/assets/assetLink";
import { Badge } from "@/components/ui/badge";

type CardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  subTitle: string;
};
const HowItWorksCard = ({
  icon,
  title,
  description,
  subTitle,
  bgColor,
}: CardProps & { bgColor: string }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ type: "tween", ease: "easeInOut" }}
    className="bg-gradient-to-tr text-black from-white to-gray-200 transition-all duration-100 max-w-xs w-full flex-col flex items-center rounded-md"
  >
    <div className="flex flex-col items-center justify-center">
      <div className={`${bgColor} w-full items-center flex justify-center`}>
        {icon}
      </div>

      <div className="px-2 pt-2">
        <h6 className="text-sm lg:text-lg font-semibold text-center">
          {title}
        </h6>
        <p className="text-xs text-[#00000099] leading-relaxed text-center">
          {description}
        </p>

        <div className="bg-[#1C1D1F] my-2 text-[8px] text-xs text-[#CFCFCF] p-3 rounded-lg border border-[#ffffff14] w-full">
          <span className="text-white">{subTitle}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

export const EverythingYouNeed = () => {
  return (
    <div id="solutions" className=" flex flex-col items-center justify-center">
      <Badge
        className="mb-4 rounded-full px-4 py-1.5 text-xs lg:text-sm font-medium"
        variant="secondary"
      >
        Our Services
      </Badge>
      <p className="text-black md:text-3xl text-xl lg:text-5xl leading-[56px] font-bold">
        Everything you need to build, scale, and thrive.
      </p>
      <p className="md:text-base text-sm lg:text-lg leading-[28px] text-neutral-400">
        Every AI is the choice of all the fortune 500 companies.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-14">
        <HowItWorksCard
          icon={<img src={svgLinks.threed4} className="size-40" />}
          bgColor="bg-red-100"
          title="Database Integration"
          description="Seamlessly spin up schemas and data layers for your application."
          subTitle="Provisioned with Amazon RDS for high availability"
        />

        <HowItWorksCard
          icon={<img src={svgLinks.threed2} className="size-40" />}
          title="Code Deployment"
          bgColor="bg-green-100"
          description="Seamlessly spin up schemas and data layers for your application."
          subTitle="Deployed via AWS Lambda and API Gateway"
        />

        <HowItWorksCard
          icon={<img src={svgLinks.threed3} className="size-40" />}
          title="Network Setup"
          bgColor="bg-purple-100"
          description="Configure cloud networking and APIs for your stack automatically."
          subTitle="Secured using AWS VPC and Route 53"
        />
      </div>
    </div>
  );
};

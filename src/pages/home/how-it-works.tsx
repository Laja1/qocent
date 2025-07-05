import { Database, Network, Server } from "lucide-react";
import { motion } from "framer-motion"; // fixed incorrect import from "motion/react"

type CardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  subTitle: string;
};

const HowItWorksCard = ({ icon, title, description, subTitle }: CardProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "tween", ease: "easeInOut" }}
    className="bg-gradient-to-tr from-black to-gray-800 transition-all duration-100 hover:shadow-lg  hover:shadow-purple-600  max-w-sm w-full flex-col flex items-center px-1 pt-2 rounded-3xl"
  >
    <div className="space-y-5 py-5 px-4 flex flex-col items-center justify-center">
      <div className="text-white">{icon}</div>
      <h6 className="text-white text-lg font-semibold text-center">{title}</h6>
      <p className="text-sm text-[#FFFFFF99] leading-relaxed text-center">{description}</p>

      <div className="bg-[#1C1D1F] text-xs text-[#CFCFCF] p-3 rounded-lg border border-[#ffffff14] w-full">
        <span className="text-yellow-400">{subTitle}</span>
      </div>

      <p className="text-[#888] text-[0.75rem] italic text-center">
        Tip: You’ll be notified once your build is ready to download.
      </p>
    </div>
  </motion.div>
);

export const HowItWorks = () => {
  return (
    <div id="solutions" className="px-5 py-20 flex flex-col items-center justify-center">
      <div className="text-center max-w-3xl flex flex-col gap-5 px-5">
        <p className="text-black md:text-3xl text-2xl lg:text-5xl leading-[56px] font-bold">
          How It Works
        </p>
        <p className="md:text-lg text-base lg:text-xl leading-[28px] text-gray-700">
          Qoonity makes code generation as easy as having a conversation. Just
          describe what you need, and watch the code appear — fast, accurate,
          and ready to use.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-14">
      <HowItWorksCard
  icon={<Database className="size-24" />}
  title="Database Integration"
  description="Seamlessly spin up schemas and data layers for your application."
  subTitle="Provisioned with Amazon RDS for high availability"
/>

<HowItWorksCard
  icon={<Server className="size-24" />}
  title="Code Deployment"
  description="Automatically deploy your generated code to the cloud."
  subTitle="Deployed via AWS Lambda and API Gateway"
/>

<HowItWorksCard
  icon={<Network className="size-24" />}
  title="Network Setup"
  description="Configure cloud networking and APIs for your stack automatically."
  subTitle="Secured using AWS VPC and Route 53"
/>

      </div>
    </div>
  );
};

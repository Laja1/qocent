import { Badge } from "@/components/ui/badge";
import { IconDevicesCheck } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { CpuIcon, Database, Network } from "lucide-react";

export function Hero() {
  return (
    <div className="h-full">
      <div className=" bg-black py-10 items-center px-5 justify-center  bg-gradient-to-br from-black to-gray-800  drop-shadow-stone-800 drop-shadow-2xl rounded-sm">
        <div className="z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center z-1000 mx-auto my-12"
          >
            <Badge
              className="mb-4 rounded-full px-4 py-1.5 text-xs lg:text-sm font-medium"
              variant="secondary"
            >
              361 Integrated Services
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-[100px] font-bold text-white tracking-tight mb-6 bg-clip-text bg-gradient-to-r from-foreground to-foreground/70">
              Our Services
            </h1>
            <p className="text-sm  md:text-base text-white mb-8 max-w-2xl mx-auto">
              Qocent offers a robust and diverse portfolio of cloud services,
              built on the reliable foundations of AWS and Huawei, designed to
              meet the demands of any application or workload.
            </p>

            <div>
              <div className="my-4 gap-4 justify-center flex px-4 py-1.5 text-xs lg:text-sm font-medium">
                <CpuIcon className=" text-white" />
                <IconDevicesCheck className=" text-white" />
                <Network className=" text-white" />
                <Database className=" text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

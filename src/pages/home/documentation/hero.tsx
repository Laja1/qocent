import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { TvMinimal } from "lucide-react";

export function Hero() {
  return (
    <div className="">
      <div className=" bg-black  py-10 items-center px-5 justify-centerbg-gradient-to-br from-black to-neutral-950    drop-shadow-stone-800 drop-shadow-sm">
        <div className="z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center z-1000 mx-auto my-12"
          >
            <Badge
              className="mb-4 mt-10 rounded-full px-4 py-1.5 text-xs lg:text-sm font-medium"
              variant="secondary"
            >
              Qocent Developer Docs
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-[100px] font-bold text-white  tracking-tight mb-6 bg-clip-text bg-gradient-to-r from-foreground to-foreground/70">
              Qocent Documentation
            </h1>
            <p className="text-sm  md:text-base text-white mb-8 max-w-2xl mx-auto">
              Learn how to build, deploy, and scale your applications on Qocent.
              Follow our step-by-step guide to get started.
            </p>

            <div>
              <div className="my-4 gap-4 justify-center flex px-4 py-1.5 text-xs lg:text-sm font-medium">
                <TvMinimal className="text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

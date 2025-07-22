import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function Hero() {
 const navigate = useNavigate()
  return (
    <div className="h-full">
      <BackgroundBeamsWithCollision className="min-h-[80vh] py-10 lg:min-h-screen bg-black items-center px-5 justify-center  bg-gradient-to-br from-black to-gray-800  drop-shadow-stone-800 drop-shadow-2xl rounded-sm">
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
              One Window, All Cloud
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-[100px] font-bold text-white tracking-tight mb-6 bg-clip-text bg-gradient-to-r from-foreground to-foreground/70">
              Cloud Simplified
            </h1>
            {/* <p className="text-sm  md:text-xl text-white mb-8 max-w-2xl mx-auto">
              Enterprise-grade infrastructure without the complexity. Deploy,
              scale, and manage your applications with unprecedented simplicity.{" "}
            </p> */}
            <p className="text-sm  md:text-xl text-white mb-4 max-w-2xl mx-auto">
              Deploy, manage, and optimize across AWS, Azure, GCP, Huawei, and
              more, from a single, powerful console. Speed, savings, and
              simplicity without compromise.
            </p>
            <p className="text-xs  md:text-xl text-yellow-600 mb-4 max-w-2xl mx-auto">
              The power of three clouds in one.
            </p>
            <div className="flex flex-col text-white  sm:flex-row gap-4 items-center justify-center">
              
              <div className="flex gap-1 items-center border border-white text-xs">
                <p
                  onClick={() => navigate("/sigin")}
                  className="hover:cursor-pointer p-2"
                >
                  Get Started
                </p>
                <div className="border border-white bg-white text-black text-xs flex p-2 ">
                  View a demo
                </div>
              </div>
            </div>
            {/* <div className="flex items-center justify-center gap-4 mt-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Check className="size-4 text-white" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-1">
                <Check className="size-4 text-white" />
                <span>14-day trial</span>
              </div>
              <div className="flex items-center gap-1">
                <Check className="size-4 text-white" />
                <span>Cancel anytime</span>
              </div>
            </div> */}
          </motion.div>
          {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto bg-white rounded-xl p-2  max-w-7xl"
        >
          <div className="rounded-lg overflow-hidden shadow-2xl ">
            <div className="w-full aspect-video">
              <iframe
                src="https://www.youtube.com/embed/7T7SyMZihwo?rel=0"
                title="YouTube video player"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </motion.div> */}
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}

// import { ModalConstant } from "@/components/shared/modal/register";
import { imgLinks } from "@/assets/assetLink";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDownRight } from "lucide-react";
// import NiceModal from "@ebay/nice-modal-react";
import { motion } from "motion/react";
import { TrustedBy } from "../trusted-by";
// import { useNavigate } from "react-router-dom";

export function Hero() {
  // const navigate = useNavigate();
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div><img src={imgLinks.bgLayer} className="absolute top-0 left-0 w-full h-full object-cover"/></div>
      <div><img src={imgLinks.whiteOverlay} className="absolute top-0 left-0 w-full h-full object-cover"/></div>
      <div><img src={imgLinks.container} className="absolute bottom-0 left-0 w-full h-full object-cover z-20"/></div>
      
      <div><img src={imgLinks.bgRay} className="absolute top-0 left-0 w-full h-full object-cover"/></div>


      <div className="relative z-10 w-full h-full flex items-center justify-center px-5">
        <div className=" w-full">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mx-auto relative w-full"
          >
            <div className=" items-center relative flex flex-col justify-center  w-full">
              <Badge
                className="mb-4 rounded-full px-4 py-1.5 text-xs text-red-600  lg:text-sm font-medium"
                variant="secondary"
              >
                One Window, All Cloud
              </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-[80px] font-bold  tracking-tight mb-6 bg-clip-text text-[#706B6B]">
              One Console for All 
              </h1>
              <h1 className="text-4xl md:text-5xl lg:text-[80px] font-bold  tracking-tight mb-6 bg-clip-text text-[#590909]">
              Cloud Solutions
              </h1>
              {/* <p className="text-sm  md:text-xl text-white mb-8 max-w-2xl mx-auto">
              Enterprise-grade infrastructure without the complexity. Deploy,
              scale, and manage your applications with unprecedented simplicity.{" "}
            </p> */}
              <div
                style={{
                  position: "absolute",
                  height: "500px",
                  overflow: "hidden",
                }}
              >
                {/* <RippleGrid
                  enableRainbow={false}
                  gridColor={isDark ? "#fff" : "#000"}
                  rippleIntensity={0.05}
                  gridSize={10}
                  gridThickness={15}
                  mouseInteraction={true}
                  mouseInteractionRadius={1.2}
                  opacity={0.1}
                /> */}
              </div>
              <p className="text-sm  z-30 md:text-xl text-red-600 mb-4 max-w-2xl mx-auto">
              Deploy, manage, and optimize across AWS, GCP, Huawei, and more all from a single, powerful console that delivers.
              </p>
              {/* <p className="text-xs  md:text-xl text-red-600 mb-4 max-w-2xl mx-auto">
                The power of three clouds in one.
              </p> */}
              <div className="flex flex-col   sm:flex-row gap-4 items-center justify-center">
                <div className="flex gap-1 items-center  text-xs">
                 <Button><ArrowDownRight />Get started</Button>
                  {/* <div
                    onClick={() => NiceModal.show(ModalConstant.BookDemoModal)}
                    className="border border-white bg-white text-black text-xs flex p-2 "
                  >
                    Book a demo
                  </div> */}
                </div>
              </div>
            </div>
            {/* <div className="py-20"/> */}
            {/* <div className=" w-full items-center justify-center flex lg:-mt-80 md:-mt-40">
              <img src={svgLinks.hero} />
            </div> */}
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
        <TrustedBy />
        </div>
      </div>
    </div>
  );
}

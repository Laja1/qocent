import RippleGrid from "@/components/RippleGrid";
// import { ModalConstant } from "@/components/shared/modal/register";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Badge } from "@/components/ui/badge";
import { useDarkMode } from "@/hooks/useDarkMode";
// import NiceModal from "@ebay/nice-modal-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export function Hero() {
  // const navigate = useNavigate();
  const { isDark } = useDarkMode();
  return (
    <div className="h-full w-full">
      <BackgroundBeamsWithCollision className="min-h-[80vh] py-10 lg:min-h-screen w-full  items-center px-5 justify-center dark:bg-black mt-0 ">
        <div className=" w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center  mx-auto relative mt-20 w-full "
          >
            <div className=" items-center relative flex flex-col justify-center  w-full">
              <Badge
                className="mb-4 rounded-full px-4 py-1.5 text-xs text-red-600  lg:text-sm font-medium"
                variant="secondary"
              >
                One Window, All Cloud
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-[100px] font-bold  tracking-tight mb-6 bg-clip-text bg-gradient-to-r from-foreground to-foreground/70">
                Cloud Simplified
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
                <RippleGrid
                  enableRainbow={false}
                  gridColor={isDark ? "#fff" : "#000"}
                  rippleIntensity={0.05}
                  gridSize={10}
                  gridThickness={15}
                  mouseInteraction={true}
                  mouseInteractionRadius={1.2}
                  opacity={0.1}
                />
              </div>
              <p className="text-sm  z-30 md:text-xl dark:text-red-100 text-red-600 mb-4 max-w-2xl mx-auto">
                Deploy, manage, and optimize across AWS, GCP, Huawei, and more
                all from a single, powerful console that delivers speed,
                savings, and simplicity without compromise.
              </p>
              {/* <p className="text-xs  md:text-xl text-red-600 mb-4 max-w-2xl mx-auto">
                The power of three clouds in one.
              </p> */}
              <div className="flex flex-col   sm:flex-row gap-4 items-center justify-center">
                <div className="flex gap-1 items-center border dark:border-white text-xs">
                  <Link
                    to="/signin"
                    className="bg-black z-10 text-white hover:cursor-pointer p-2"
                  >
                    <p> Get started</p>
                  </Link>
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
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}

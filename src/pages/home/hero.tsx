import { Button } from "@/components/shared";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-white dark:bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="z-10">
        <div className="flex flex-col items-center justify-center mt-18  text-center ">
          {/* <h1 className="text-4xl font-brfirma-bold  md:text-6xl font-bold max-w-3xl bg-gradient-to-r from-green-900  inline-block text-transparent to-[#750505] bg-clip-text">
          Empowering the Future with Cloud Technology
        </h1>
        */}
          <h1 className="text-4xl md:text-8xl font-bold mb-4 leading-tight">
            Cloud
            <span className="text-gray-400"> Technology</span>
            <br />
            Simplified
          </h1>
          <p className="mt-2 text-base md:text-xl text-gray-600 max-w-xl">
            Enterprise-grade infrastructure without the complexity. Deploy,
            scale, and manage your applications with unprecedented simplicity.
          </p>
          <div className="gap-2 flex">
            <Button
              label="Get Started with Qocent"
              className="mt-8 "
              onClick={() => {
                window.location.href = "/signup";
              }}
            />
            <Button
              label="View Docs"
              className="mt-8 "
              intent="tertiary"
              onClick={() => {
                window.location.href = "/signup";
              }}
            />
          </div>
          <div className="my-10">
            <div className="w-sm md:w-xl lg:w-5xl  aspect-video rounded-sm lg:rounded-xs  hover:drop-shadow-red-400 drop-shadow-2xl overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/7T7SyMZihwo?rel=0"
                title="YouTube video player"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

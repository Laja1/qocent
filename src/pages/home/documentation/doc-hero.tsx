import { imgLinks } from "@/assets/assetLink";

export default function DocHero() {
  return (
    <main className="relative min-h-[60vh] mx-auto w-full overflow-hidden px-6 md:px-20 flex items-center justify-center">
      <div>
        <img src={imgLinks.bgLayer} className="absolute top-0 left-0 w-full h-full object-cover" alt="" />
      </div>
      <div>
        <img src={imgLinks.whiteOverlay} className="absolute top-0 left-0 w-full h-full object-cover" alt="" />
      </div>
      <div>
        <img src={imgLinks.container} className="absolute bottom-0 left-0 w-full h-full object-cover z-20" alt="" />
      </div>
      <div>
        <img src={imgLinks.bgRay} className="absolute top-0 left-0 w-full h-full object-cover" alt="" />
      </div>

      <div className="relative z-10 text-center flex flex-col items-center justify-center">
        <h1 className="text-7xl md:text-8xl lg:text-[128px] font-extrabold tracking-tight text-black mb-6">
          Documentation
        </h1>
        <p className="text-sm md:text-xl text-gray-600 max-w-2xl mx-auto">
          Everything you need to deploy, manage, and get the most out of Qocent — step-by-step.
        </p>
      </div>
    </main>
  );
}

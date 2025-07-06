import { imgLinks } from "@/assets/assetLink";

export const TrustedBy = () => {
  return (
    <div className="px-5 py-20 flex flex-col items-center justify-center">
      <p className="text-black md:text-3xl text-2xl lg:text-5xl leading-[56px] font-bold">
        Trusted <span className="text-neutral-400">by the best companies</span>
      </p>
      <p className="md:text-base text-sm lg:text-lg leading-[28px] text-gray-700">
      Every AI is the choice of all the fortune 500 companies.
      </p>
      <div className="mt-10 flex items-center gap-10"><img src={imgLinks.awsdark} className="size-14 "/><img src={imgLinks.huawei} className="size-12 "/></div>
    </div>
  );
};

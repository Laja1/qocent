import { imgLinks } from "@/assets/assetLink";

export const TrustedBy = () => {
  return (
    <div className="px-5 py-5 md:py-10 lg:py-20 flex flex-col items-center justify-center ">
      <p className="text-black md:text-3xl text-xl lg:text-5xl leading-[56px] font-bold">
        Trusted <span className="text-neutral-400">by the best companies</span>
      </p>
      <p className="md:text-base text-sm lg:text-lg leading-[28px] text-gray-700">
        Every AI is the choice of all the fortune 500 companies.
      </p>
      <div className="mt-10 flex flex-wrap justify-center items-center gap-10">
        <img src={imgLinks.awsdark} className="size-10 lg:size-20 " />
        <img src={imgLinks.huawei} className="size-8 lg:size-18 " />
        <img src={imgLinks.nibss} className="size-14 lg:size-26 " />
        <img src={imgLinks.rubies} className="size-8 lg:size-18 " />
      </div>
    </div>
  );
};

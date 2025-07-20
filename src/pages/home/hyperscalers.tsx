import { imgLinks } from "@/assets/assetLink";
import { Badge } from "@/components/ui/badge";

export function HyperScalers() {
  return (
    <div className="  max-w-6xl mx-auto px-8 mb-10 lg:mb-20 ">
      <Badge
        className="mb-4 rounded-full px-4 py-1.5 text-xs lg:text-sm font-medium"
        variant="secondary"
      >
        Global Infrastructure
      </Badge>
      <p className="text-black md:text-3xl text-xl lg:text-5xl leading-[56px] font-bold">
        HyperScalers
      </p>
      <div className="flex gap-10 lg:gap-30 my-10 justify-center">
        <img src={imgLinks.awsdark} className="lg:size-24 size-12" />
        <img src={imgLinks.huawei} className="lg:size-24 size-12" />
        <img src={imgLinks.gcp} className="lg:size-24 size-12" />
      </div>
    </div>
  );
}

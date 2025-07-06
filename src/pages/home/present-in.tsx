import { WorldMapDemo } from "@/components/not-shared/world-map-demo";

export const PresentIn = () => {
  return (
    <div className=" py-20 flex flex-col items-center justify-center">
      <p className="text-black md:text-3xl text-2xl lg:text-5xl leading-[56px] font-bold">
        Available <span className="text-neutral-400">In 36 Countries</span>
      </p>
      <p className="md:text-base text-sm lg:text-lg leading-[28px] text-gray-700 mb-10">
        Every AI is the choice of all the fortune 500 companies.
      </p>
      <WorldMapDemo />
    </div>
  );
};

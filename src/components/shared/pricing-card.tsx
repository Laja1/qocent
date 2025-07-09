/* eslint-disable @typescript-eslint/no-explicit-any */
import { RiCheckDoubleFill } from "react-icons/ri";
import { motion } from "motion/react";
import { Button } from "./button";
import { CloudLightning } from "lucide-react";

type featureType = {
  name: string;
  icon?: any;
};

export type pricingCardType = {
  title: string;
  text: string;
  price: number;
  feature: featureType[];
  cardStyle?: string;
  iconStyle?: string;
  buttonLabel: string;
  buttonState?: "primary" | "secondary" | "tertiary";
};

export const PricingCard = ({
  title,
  text,
  cardStyle,
  iconStyle,
  price,
  buttonLabel,
  buttonState = "tertiary",
  feature,
}: pricingCardType) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`border border-[#FFFFFF24] flex flex-grow flex-col max-w-sm h-[600px] lg:h-[564px] p-5 rounded-3xl ${cardStyle}`}
    >
      <div className="flex-1">
        <div className="h-[180px] lg:h-[256px]">
          <div
            className={`border rounded-full size-8 mb-5 justify-center items-center flex bg-[#0B0C0E] border-[#FFFFFF24] ${iconStyle}`}
          >
            <CloudLightning />
          </div>
          <div className="space-y-2">
            <h6>{title}</h6>
            <h1 className="text-white line-clamp-2">{text}</h1>
            <h4 className="text-white pt-3 lg:pt-10">
              $<span className=" text-white text-5xl ">{price}</span>
              <span className=" text-sm">/ per month</span>
            </h4>
          </div>
        </div>
        <hr className="border-t border-[#FFFFFF24] my-2" />
        <div className="space-y-3 lg:space-y-2">
          {feature.map((item) => (
            <div className="flex flex-row items-center  gap-2">
              <div
                className={`border rounded-full size-8 items-center flex justify-center ${iconStyle} border-[#FFFFFF24]`}
              >
                {item.icon ? item.icon : <RiCheckDoubleFill color="white" />}
              </div>
              <h1 className="text-white text-xs">{item.name}</h1>
            </div>
          ))}
        </div>
      </div>
      <hr className="border-t border-[#FFFFFF24] my-4" />
      <div className="justify-end bottom-0 flex">
        <Button label={buttonLabel} className="w-full" state={buttonState} />
      </div>
    </motion.div>
  );
};

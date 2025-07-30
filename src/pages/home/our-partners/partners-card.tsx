import { imgLinks } from "@/assets/assetLink";
import { Badge } from "@/components/ui/badge";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { AwsLogo, HuaweiLogo } from "@/utilities/constants/icons";

const projects = [
  {
    title: "Amazon Web Services",
    description:
      "Leverage enterprise-grade cloud solutions from a trusted global partner.",
    link: "https://aws.amazon.com/quickstart/",
    icon: <AwsLogo />,
  },
  {
    title: "Huawei Cloud Services",
    description:
      "Handle traffic surges effortlessly with smart auto-scaling for optimal performance and cost.",
    link: "https://docs.aws.amazon.com/autoscaling/",
    icon: <HuaweiLogo />,
  },
  {
    title: "Google Cloud Practitioner",
    description:
      "Monitor uptime, usage, and system health in real time using intelligent dashboards and alerts.",
    link: "https://aws.amazon.com/cloudwatch/",
    icon: <img src={imgLinks.gcp} className="size-10" />,
  },
  {
    title: "Azure Web Services",
    description:
      "Run serverless backends with ease using tools like Azure Functions or AWS Lambda.",
    link: "https://aws.amazon.com/lambda/",
    icon: <img src={imgLinks.azure} className="size-10" />,
  },
];

export function PartnersCard() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-10 lg:mt-20">
      <Badge
        className="mb-4 rounded-full px-4 py-1.5 text-xs lg:text-sm font-medium text-red-500"
        variant="secondary"
      >
        Trusted Cloud Partners
      </Badge>

      <p className="text-black md:text-3xl text-xl lg:text-4xl leading-[56px] font-bold">
        Power your infrastructure with the world’s leading cloud platforms.
      </p>

      <HoverEffect items={projects} />
    </div>
  );
}

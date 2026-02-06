import { Badge } from "@/components/ui/badge";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { IconWaveSawTool } from "@tabler/icons-react";
import {
  CloudUpload,
  Activity,
  Settings2,
} from "lucide-react";

const projects = [
  {
    title: "Multi-Cloud Management",
    description:
      "Deploy, monitor, and manage resources across AWS, Azure, GCP, and Huawei from a single, unified console. No more switching between dashboards—control everything in one place.",
    link: "https://aws.amazon.com/quickstart/",
    icon: <CloudUpload className="text-green-500 w-6 h-6" />,
  },
  {
    title: "FinOps & Cost Optimization",
    description:
      "Seamlessly handle demand spikes by dynamically adjusting compute resources for cost and performance.",
    link: "https://docs.aws.amazon.com/autoscaling/",
    icon: <Activity className="text-blue-500 w-6 h-6" />,
  },
  {
    title: "Account Linking & Integration",
    description:
      "Track resource usage, uptime, and alerts in real-time with smart dashboards and insights.",
    link: "https://aws.amazon.com/cloudwatch/",
    icon: <Settings2 className="text-indigo-500 w-6 h-6" />,
  },
  {
    title: "Security & Compliance",
    description:
      "Run backend logic without provisioning or managing servers using tools like AWS Lambda.",
    link: "https://aws.amazon.com/lambda/",
    icon: <IconWaveSawTool className="text-yellow-500 w-6 h-6" />,
  },
  // {
  //   title: "Load Balancing",
  //   description:
  //     "Distribute incoming traffic efficiently across servers to optimize responsiveness and uptime.",
  //   link: "https://cloud.google.com/load-balancing",
  //   icon: <Share2 className="text-purple-500 w-6 h-6" />,
  // },
  // {
  //   title: "Cloud Storage",
  //   description:
  //     "Store and retrieve any amount of data securely with scalable object and block storage.",
  //   link: "https://azure.microsoft.com/en-us/products/storage/",
  //   icon: <Database className="text-pink-500 w-6 h-6" />,
  // },
  // {
  //   title: "Identity & Access Management",
  //   description:
  //     "Define user roles and securely manage access to cloud resources using IAM policies.",
  //   link: "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html",
  //   icon: <ShieldCheck className="text-emerald-500 w-6 h-6" />,
  // },
  // {
  //   title: "Managed Infrastructure",
  //   description:
  //     "Let cloud providers manage scaling, patching, and recovery while you focus on innovation.",
  //   link: "https://aws.amazon.com/managed-services/",
  //   icon: <ServerCog className="text-sky-500 w-6 h-6" />,
  // },
];

export function Services() {
  return (
    <div className="dark:bg-black lg:py-20 justify-center items-center w-full  flex flex-col mx-auto px-8 py-10 ">
      <Badge
        className="mb-4 rounded-full px-4 py-1.5 text-xs lg:text-sm font-medium text-red-600"
        variant="secondary"
      >
        Our Services
      </Badge>
     <div className="max-w-4xl text-center"> <p className="text-black dark:text-gray-300 text-center md:text-3xl text-xl  lg:text-5xl leading-[56px] font-bold">
     Everything You Need to Manage Multi-Cloud
     Infrastructure
      </p>
      <p className="md:text-base text-sm lg:text-lg leading-[28px] text-neutral-400">
      From startups to enterprises, Qocent simplifies
multi-cloud operations with powerful tools for deployment, cost
optimization, security, and unified management—all from one console.
      </p></div>
      <div className="max-w-6xl">
        <HoverEffect items={projects} />
      </div>
    </div>
  );
}

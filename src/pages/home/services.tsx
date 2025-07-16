import { HoverEffect } from "@/components/ui/card-hover-effect";
const projects = [
  {
    title: "Quick Deployment",
    description:
      "Launch cloud resources like virtual machines, containers, and serverless functions within minutes using automated provisioning tools.",
    link: "https://aws.amazon.com/quickstart/",
  },
  {
    title: "Auto Scaling",
    description:
      "Automatically adjusts compute capacity based on traffic load to ensure optimal performance and cost-efficiency.",
    link: "https://docs.aws.amazon.com/autoscaling/",
  },
  {
    title: "Serverless Functions",
    description:
      "Run backend code without managing servers using services like AWS Lambda, Azure Functions, or Google Cloud Functions.",
    link: "https://aws.amazon.com/lambda/",
  },
  {
    title: "Load Balancing",
    description:
      "Distribute incoming traffic across multiple instances to maintain high availability and fault tolerance.",
    link: "https://cloud.google.com/load-balancing",
  },
  {
    title: "Cloud Storage",
    description:
      "Secure, scalable object and block storage options for backups, media files, application data, and more.",
    link: "https://azure.microsoft.com/en-us/products/storage/",
  },
  {
    title: "Identity & Access Management (IAM)",
    description:
      "Control access to resources using role-based permissions, policies, and secure authentication protocols.",
    link: "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html",
  },
];

export function Services() {
  return (
    <div className="max-w-5xl mx-auto px-8 mt-5">
      <p className="text-black md:text-3xl text-xl lg:text-5xl leading-[56px] font-bold">
        Everything you need to scale
      </p>
      <p className="md:text-base text-sm lg:text-lg leading-[28px] text-neutral-400">
        Every AI is the choice of all the fortune 500 companies.
      </p>
      <HoverEffect items={projects} />
    </div>
  );
}

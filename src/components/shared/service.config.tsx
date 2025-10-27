import { Box, Cloud, RefreshCcw, Settings } from "lucide-react";
import type { ServiceConfig } from "./types";

export const SERVICES_CONFIG: ServiceConfig[] = [
  {
    triggerText: "Migration",
    description: "From one cloud provider to another",
    content: `
      Seamlessly move your infrastructure, data, or applications from one cloud provider to another with minimal downtime and zero data loss. Our team ensures a smooth transition optimized for cost and performance from day one.

    `,
    triggerIcon: (
      <span>
        <Cloud className="text-red-400" />
      </span>
    ),
    borderColor: "border-red-500",
  },
  {
    triggerText: "Optimization",
    description: "Of cost, security, scalability, performance",
    content: `
     Fine-tune your cloud to work smarter. We identify cost, security, scalability, and performance gaps, then help you close them for maximum efficiency and value.

    `,
    triggerIcon: <Settings className="text-red-400" />,
    borderColor: "border-blue-500",
  },
  {
    triggerText: "Managed Service",
    description: "Improve performance and reduce cost",
    content: `
     Let our team handle the heavy lifting. We monitor, maintain, and continuously improve your cloud environment so you can focus on innovation, not infrastructure.

    `,
    triggerIcon: <Box className="text-red-400" />,
    borderColor: "border-green-500",
  },
  {
    triggerText: "Modernization",
    description: "Assess and strengthen cloud security",
    content: `
          Strengthen and future-proof your systems.
We assess your current setup, reinforce cloud security, and modernize applications to keep you ahead of evolving business and compliance needs.    `,
    triggerIcon: <RefreshCcw className="text-red-400" />,
    borderColor: "border-yellow-500",
  },
];

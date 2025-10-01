/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Header } from "@/components/shared";
import { RouteConstant } from "@/router/routes";
import { useResourceMap } from "@/utilities/constants/icons";
import { ArrowRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Security Component with AWS Services

export const Security = () => {
  const RESOURCE_MAP = useResourceMap();
  const navigate = useNavigate();
  const data = [
    {
      icon: RESOURCE_MAP.CertificateManager.icon,
      title: "Certificate Manager",
      description:
        "A Certificate Manager is a service that issues, stores, and automatically renews digital certificates to secure websites, applications, and communications. It simplifies certificate management, reduces manual errors, and ensures data encryption and trusted identity verification.",
      button: "View More",
      action: () => {
        console.log("View More");
        navigate(RouteConstant.dashboard.certificateManager.path);
      },
      buttonIcon: <ArrowRightIcon className="size-4" />,
    },
    {
      icon: RESOURCE_MAP.CloudWatch.icon,
      title: "CloudWatch",
      description:
        "CloudWatch is a monitoring service that provides insights and alerts for your AWS resources.",
      button: "View More",
      action: () => {
        console.log("View More");
      },
      buttonIcon: <ArrowRightIcon className="size-4" />,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Security"
        description="Track, analyze, and manage your infrastructure in real time"
      />

      {/* Card Container */}
      <div className="px-5 flex-wrap flex flex-row gap-4 mt-4">
        {data.map((item) => (
          <div
            key={item.title}
            className="flex flex-col justify-between border border-gray-200 rounded-md p-5 min-h-[250px] w-full max-w-[350px]"
          >
            <div className="space-y-2">
              {item.icon}
              <h1 className="text-lg font-semibold">{item.title}</h1>
              <p className="text-sm text-gray-600 line-clamp-5">
                {item.description}
              </p>
            </div>

            <div className="flex justify-end mt-3">
              <Button
                label={item.button}
                size="small"
                onClick={item.action}
                surfixIcon={item.buttonIcon}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

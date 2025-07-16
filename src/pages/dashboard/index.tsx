import { Button, Header } from "@/components/shared";
import {
  Server,
  HardDrive,
  FolderOpen,
  Shield,
  Database,
  Network,
  Activity,
  DollarSign,
} from "lucide-react";
import { useState } from "react";

const cloudResources = [
  {
    id: "server-site",
    name: "Server site",
    description: "Create isolated network environments for your resources",
    icon: Network,
    awsEquivalent: "VPC",
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
  },
  {
    id: "rack",
    name: "Rack",
    description: "Organize servers within your server room",
    icon: Database,
    awsEquivalent: "Subnet",
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
  },
  {
    id: "server",
    name: "Server",
    description: "Deploy virtual servers for your applications",
    icon: Server,
    awsEquivalent: "EC2",
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
  },
  {
    id: "file-cabinet",
    name: "File Cabinet",
    description: "Store and manage your files securely",
    icon: FolderOpen,
    awsEquivalent: "S3",
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-orange-600",
  },
  {
    id: "vault",
    name: "Vault",
    description: "Securely store passwords and sensitive data",
    icon: Shield,
    awsEquivalent: "Secrets Manager",
    color: "bg-red-50 border-red-200",
    iconColor: "text-red-600",
  },
  {
    id: "san-disk",
    name: "SAN Disk",
    description: "High-performance block storage for your servers",
    icon: HardDrive,
    awsEquivalent: "EBS",
    color: "bg-indigo-50 border-indigo-200",
    iconColor: "text-indigo-600",
  },
  {
    id: "outgoing-proxy",
    name: "Outgoing Proxy",
    description: "Manage outbound internet traffic from private networks",
    icon: Network,
    awsEquivalent: "NAT Gateway",
    color: "bg-teal-50 border-teal-200",
    iconColor: "text-teal-600",
  },
];
export const Dashboard = () => {
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  return (
    <div>
      <Header title="Dashboard" description="Manage your dashboard">
        <Button label="Quick Deploy" />
      </Header>
      <div></div>
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Welcome to Qocent
          </h2>
          <p className="text-gray-600 mb-6">
            Choose from our intuitive cloud resources below. We've simplified
            AWS terminology to make cloud deployment accessible to everyone.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-md shadow-sm">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black-600">
                      Active Resources
                    </p>
                    <p className="text-2xl font-bold text-black-600">12</p>
                  </div>
                  <Server className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-sm">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black">
                      Monthly Cost
                    </p>
                    <p className="text-2xl font-bold text-black">$247</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-amber-700  " />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-sm">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black">
                      Data Stored
                    </p>
                    <p className="text-2xl font-bold text-black">1.2TB</p>
                  </div>
                  <HardDrive className="h-8 w-8 text-violet-700" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md shadow-sm">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black">Uptime</p>
                    <p className="text-2xl font-bold text-black">99.9%</p>
                  </div>
                  <Activity className="h-8 w-8 text-violet-700" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cloudResources.map((resource) => (
              <div
                key={resource.id}
                className={`cursor-pointer rounded-md p-3 transition-all hover:shadow-md ${
                  resource.color
                } ${
                  selectedResource === resource.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedResource(resource.id)}
              >
                <div className="pb-1">
                  <div className="flex items-center justify-between">
                    <resource.icon
                      className={`h-8 w-8 ${resource.iconColor}`}
                    />
                  </div>
                  <div className="text-lg text-gray-900">{resource.name}</div>
                </div>
                <div>
                  <div className="text-gray-600 text-xs lg:text-sm ">
                    {resource.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedResource && (
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800">
              <strong>Selected:</strong>{" "}
              {cloudResources.find((r) => r.id === selectedResource)?.name}
            </p>
            <p className="text-blue-600 text-sm mt-1">
              Click "Deploy" to configure and launch this resource.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

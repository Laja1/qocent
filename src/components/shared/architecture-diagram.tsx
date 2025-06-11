import {
  ExternalLink,
  FolderOpen,
  Globe,
  HardDrive,
  Lock,
  Network,
  Server,
  Shield,
} from "lucide-react";
import { Button } from "./button";
import {
  ApiServerIcon,
  ProxyIcon,
  WebServerIcon,
} from "@/utils/constants/icons";

export const ArchitectureDiagram = ({
  serverRoomId,
}: {
  serverRoomId: string | null;
}) => {
  if (!serverRoomId) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 border border-gray-200 rounded-lg">
        <div className="text-center p-8">
          <Network className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-500">
            Select a server room to view its architecture
          </h3>
        </div>
      </div>
    );
  }

  // In a real app, you would fetch the actual architecture data for the selected server room
  return (
    <div className="bg-white border mx-10 border-gray-200 rounded-lg p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Architecture Diagram</h3>
        <Button
          label="Full Screen"
          size="small"
          prefixIcon={<ExternalLink className="h-4 w-4 mr-2" />}
        />
      </div>
      <div className="bg-gray-50 rounded-lg p-4  relative">
        <div className=" ">
          <div className="border-2 border-blue-500 rounded-lg p-4 bg-blue-50 mb-6 text-center">
            <Network className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="font-medium text-blue-800">
              Server Room:{" "}
              {serverRoomId.charAt(0).toUpperCase() + serverRoomId.slice(1)}
            </p>
          </div>

          <div className="flex flex-row gap-4">
            <div className="border-2 border-green-500 rounded-lg p-3 bg-green-50 text-center">
              <Globe className="h-6 w-6 text-green-600 mx-auto mb-1" />
              <p className="font-medium text-green-800">Public Subnet</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <WebServerIcon />
                <ProxyIcon />
              </div>
            </div>

            <div className="border-2 border-purple-500 rounded-lg p-3 bg-purple-50 text-center">
              <Lock className="h-6 w-6 text-purple-600 mx-auto mb-1" />
              <p className="font-medium text-purple-800">Private Subnet</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="border border-purple-400 rounded p-2 bg-white">
                  <Server className="h-4 w-4 text-purple-600 mx-auto" />
                  <p className="text-xs">API Server</p>
                </div>
                <ApiServerIcon />
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="border-2 border-orange-500 rounded-lg p-2 bg-orange-50 text-center">
              <FolderOpen className="h-5 w-5 text-orange-600 mx-auto mb-1" />
              <p className="text-sm font-medium text-orange-800">
                File Cabinet
              </p>
            </div>
            <div className="border-2 border-red-500 rounded-lg p-2 bg-red-50 text-center">
              <HardDrive className="h-5 w-5 text-red-600 mx-auto mb-1" />
              <p className="text-sm font-medium text-red-800">SAN Disk</p>
            </div>
            <div className="border-2 border-indigo-500 rounded-lg p-2 bg-indigo-50 text-center">
              <Shield className="h-5 w-5 text-indigo-600 mx-auto mb-1" />
              <p className="text-sm font-medium text-indigo-800">Vault</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

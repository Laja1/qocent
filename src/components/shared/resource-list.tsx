import { useState } from "react";
import { Badge } from "../ui/badge";
import {
  Server,
  HardDrive,
  FolderOpen,
  Network,
  Plus,
  Settings,
  ExternalLink,
  Play,
  Square,
  RotateCcw,
} from "lucide-react";
import { serverRoomResources } from "@/utilities/constants/config";
import { Button } from "@/components/shared";
import { useNavigate } from "react-router-dom";

export const ResourceList = ({
  serverRoomId,
}: {
  serverRoomId: string | null;
}) => {
  const navigate = useNavigate();
  const [expandedServer, setExpandedServer] = useState<string | null>(null);
  const [expandedFileCabinet, setExpandedFileCabinet] = useState<string | null>(
    null
  );
  const [expandedSanDisk, setExpandedSanDisk] = useState<string | null>(null);

  if (!serverRoomId) {
    return (
      <div className="text-center p-8">
        <h3 className="text-lg font-medium text-gray-500">
          Select a server room to view its resources
        </h3>
      </div>
    );
  }
  const resourceConfig = [
    {
      label: "Servers",
      key: "servers",
      icon: <Server className="h-8 w-8 text-purple-600" />,
      bg: "bg-purple-50",
      border: "border-purple-200",
      textColor: "text-purple-600",
      titleColor: "text-purple-900",
    },
    {
      label: "File Cabinets",
      key: "fileCabinets",
      icon: <FolderOpen className="h-8 w-8 text-orange-600" />,
      bg: "bg-orange-50",
      border: "border-orange-200",
      textColor: "text-orange-600",
      titleColor: "text-orange-900",
    },
    {
      label: "SAN Disks",
      key: "sanDisks",
      icon: <HardDrive className="h-8 w-8 text-red-600" />,
      bg: "bg-red-50",
      border: "border-red-200",
      textColor: "text-red-600",
      titleColor: "text-red-900",
    },
    {
      label: "Outgoing Proxies",
      key: "outgoingProxies",
      icon: <Network className="h-8 w-8 text-teal-600" />,
      bg: "bg-teal-50",
      border: "border-teal-200",
      textColor: "text-teal-600",
      titleColor: "text-teal-900",
    },
  ];
  return (
    <div className="space-y-8 bg-white shadow-md rounded-xl p-5 m-5 border ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {resourceConfig.map(
          ({ label, key, icon, bg, border, textColor, titleColor }) => (
            <div
              key={key}
              className={`${bg} ${border} border w-full rounded-lg`}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${titleColor}`}>
                      {label}
                    </p>
                    <p className={`text-xl font-bold ${textColor}`}>
                      {serverRoomResources[
                        key as keyof typeof serverRoomResources
                      ]?.length ?? 0}
                    </p>
                  </div>
                  {icon}
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Servers Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-purple-100 p-2 rounded-full">
              <Server className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Servers</h3>
            <Badge
              variant="outline"
              className="bg-purple-50 text-purple-700 border-purple-200"
            >
              {serverRoomResources.servers.length} active
            </Badge>
          </div>
          <Button
            size="small"
            label="Add Server"
            prefixIcon={<Plus className="h-4 w-4 " />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {serverRoomResources.servers.map((server) => (
            <div key={server.id} className="hover:shadow-md transition-shadow">
              <div className="p-4">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() =>
                    setExpandedServer(
                      expandedServer === server.id ? null : server.id
                    )
                  }
                >
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <Server className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{server.name}</h4>
                      <p className="text-xs text-gray-500">
                        {server.type} • IP: {server.ip}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="outline"
                      className={
                        server.status === "Running"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-yellow-50 text-yellow-700 border-yellow-200"
                      }
                    >
                      {server.status}
                    </Badge>
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        navigate(
                          `/console/server-rooms/${serverRoomId}/servers/${server.id}`
                        )
                      }
                    >
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {expandedServer === server.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">CPU Usage</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: "45%" }}
                            ></div>
                          </div>
                          <span className="text-xs">45%</span>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Memory</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: "62%" }}
                            ></div>
                          </div>
                          <span className="text-xs">62%</span>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Network In</p>
                        <p className="text-gray-600">1.2 MB/s</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Network Out</p>
                        <p className="text-gray-600">0.8 MB/s</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Subnet</p>
                        <p className="text-gray-600">
                          Public Subnet A (10.0.1.0/24)
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">
                          Security Groups
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <Badge variant="outline" className="text-xs">
                            Web Servers
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            API Access
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Storage</p>
                        <p className="text-gray-600">20 GB SSD + 100 GB Data</p>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button
                        intent="secondary"
                        label="Start"
                        size="small"
                        prefixIcon={<Play className="h-3 w-3 " />}
                      />

                      <Button
                        intent="secondary"
                        label="Stop"
                        size="small"
                        prefixIcon={<Square className="h-3 w-3 " />}
                      />

                      <Button
                        intent="secondary"
                        label="Restart"
                        size="small"
                        prefixIcon={<RotateCcw className="h-3 w-3 " />}
                      />

                      <Button
                        intent="secondary"
                        size="small"
                        surfixIcon={<ExternalLink className="h-4 w-4" />}
                        onClick={() =>
                          navigate(
                            `/console/server-rooms/${serverRoomId}/servers/${server.id}`
                          )
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Storage Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <div className="bg-gray-100 p-2 rounded-full">
            <HardDrive className="h-5 w-5 text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Storage Resources
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* File Cabinets */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FolderOpen className="h-5 w-5 text-orange-600" />
                <h4 className="font-medium text-gray-900">File Cabinets</h4>
                <Badge
                  variant="outline"
                  className="bg-orange-50 text-orange-700 border-orange-200"
                >
                  {serverRoomResources.fileCabinets.length}
                </Badge>
              </div>
              <Button
                size="small"
                label="Add File Cabinet"
                prefixIcon={<Plus className="h-4 w-4 " />}
              />
            </div>

            <div className="space-y-3">
              {serverRoomResources.fileCabinets.map((cabinet) => (
                <div
                  key={cabinet.id}
                  className="hover:shadow-sm transition-shadow"
                >
                  <div className="p-4">
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() =>
                        setExpandedFileCabinet(
                          expandedFileCabinet === cabinet.id ? null : cabinet.id
                        )
                      }
                    >
                      <div className="flex items-center">
                        <div className="bg-orange-100 p-2 rounded-full mr-3">
                          <FolderOpen className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <h5 className="font-medium">{cabinet.name}</h5>
                          <p className="text-sm text-gray-500">
                            {cabinet.size} • {cabinet.access}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          cabinet.access === "Public"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-gray-50 text-gray-700 border-gray-200"
                        }
                      >
                        {cabinet.access}
                      </Badge>
                    </div>

                    {expandedFileCabinet === cabinet.id && (
                      <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium text-gray-700">
                              Storage Class
                            </p>
                            <p className="text-gray-600">Standard</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Objects</p>
                            <p className="text-gray-600">1,247 files</p>
                          </div>
                        </div>
                        <div className="flex space-x-2 pt-2">
                          <Button
                            intent="secondary"
                            size="small"
                            prefixIcon={<FolderOpen className="h-3 w-3 " />}
                            label="Browse"
                          />
                          <Button
                            intent="secondary"
                            size="small"
                            prefixIcon={<Settings className="h-3 w-3 " />}
                            label="Configure"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <HardDrive className="h-5 w-5 text-red-600" />
                <h4 className="font-medium text-gray-900">SAN Disks</h4>
                <Badge
                  variant="outline"
                  className="bg-red-50 text-red-700 border-red-200"
                >
                  {serverRoomResources.sanDisks.length}
                </Badge>
              </div>
              <Button
                size="small"
                label="Add SAN Disk"
                prefixIcon={<Plus className="h-4 w-4 " />}
              />
            </div>

            <div className="space-y-3">
              {serverRoomResources.sanDisks.map((disk) => (
                <div
                  key={disk.id}
                  className="hover:shadow-sm transition-shadow"
                >
                  <div className="p-4">
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() =>
                        setExpandedSanDisk(
                          expandedSanDisk === disk.id ? null : disk.id
                        )
                      }
                    >
                      <div className="flex items-center">
                        <div className="bg-red-100 p-2 rounded-full mr-3">
                          <HardDrive className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <h5 className="font-medium">{disk.name}</h5>
                          <p className="text-sm text-gray-500">
                            {disk.size} {disk.type} • {disk.attached}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          disk.type === "SSD"
                            ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                            : "bg-gray-50 text-gray-700 border-gray-200"
                        }
                      >
                        {disk.type}
                      </Badge>
                    </div>

                    {expandedSanDisk === disk.id && (
                      <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium text-gray-700">IOPS</p>
                            <p className="text-gray-600">3,000</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Usage</p>
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-purple-600 h-2 rounded-full"
                                  style={{ width: "75%" }}
                                ></div>
                              </div>
                              <span className="text-xs">75%</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2 pt-2">
                          <Button
                            intent="secondary"
                            size="small"
                            prefixIcon={<HardDrive className="h-3 w-3 " />}
                            label="Attach"
                          />
                          <Button
                            intent="secondary"
                            size="small"
                            prefixIcon={<Settings className="h-3 w-3 " />}
                            label="Configure"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex-row space-y-2 lg:flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-teal-100 p-2 rounded-full">
              <Network className="h-5 w-5 text-teal-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Network Resources
            </h3>
            <Badge
              variant="outline"
              className="bg-teal-50 text-teal-700 border-teal-200"
            >
              {serverRoomResources.outgoingProxies.length} active
            </Badge>
          </div>
          <Button
            size="small"
            label="Add Outgoing Proxy"
            prefixIcon={<Plus className="h-4 w-4 " />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {serverRoomResources.outgoingProxies.map((proxy) => (
            <div key={proxy.id} className="hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-teal-100 p-2 rounded-full mr-3">
                      <Network className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{proxy.name}</h4>
                      <p className="text-sm text-gray-500">
                        Bandwidth: {proxy.bandwidth}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    {proxy.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import { imgLinks } from "@/assets/assetLink";
import { DatabaseIcon, File, Network, Server } from "lucide-react";

// type IconProps = {
//   id: number;
// };

export const WebServerIcon = () => {
  return (
    <div className=" rounded p-2 text-center text-white">
      <Server className="h-4 w-4 text-green-600 mx-auto" />
      <p className="text-xs pt-1">Web Server</p>
    </div>
  );
};

export const AwsLogo = () => {
  return (
    <img src={imgLinks.awsLogo}  className="size-10"/>
  )
}

export const HuaweiLogo = () => {
  return (
    <img src={imgLinks.huawei}  className="size-10"/>
  )
}

export const FileCabinetIcon = () => {
  return (
    <div className=" rounded p-2 text-center text-white">
      <Server className="h-4 w-4 text-green-600 mx-auto" />
      <p className="text-xs pt-1">Web Server</p>
    </div>
  );
};

export const ProxyIcon = () => {
  return (
    <div className=" rounded p-2 text-center text-white">
      <Network className="h-4 w-4 text-green-600 mx-auto" />
      <p className="text-xs pt-1">Proxy</p>
    </div>
  );
};

export const ApiServerIcon = () => {
  return (
    <div className=" rounded p-2 text-white">
      <Server className="h-4 w-4 text-purple-600 mx-auto" />
      <p className="text-xs pt-1">DB Server</p>
    </div>
  );
};

export const ICON_MAP = {
  'Proxy': <Network className="text-red-500 size-6"/>,
  "Server": <Server className="text-purple-600 size-6"/>,
  "S3": <File className="text-blue-600 size-6"/>,
  "API": <ApiServerIcon />,
  "Database": <DatabaseIcon className="text-green-600 size-6"/>,
};


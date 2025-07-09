import { imgLinks, svgLinks } from "@/assets/assetLink";
import { IconDoor } from "@tabler/icons-react";
import { DatabaseIcon, File, House, Network, RectangleVertical, Server, UserCheck } from "lucide-react";
import { MdRoom } from "react-icons/md";

// type IconProps = {
//   id: number;
// };

export const ServerIcon = () => {
  return (
    <div className=" rounded p-2 text-center ">
      <Server className="h-4 w-4 text-green-600 mx-auto" />
      {/* <p className="text-xs pt-1">Server</p> */}
    </div>
  );
};

export const Database = () => {
  return (
    <div className=" rounded p-2 text-center ">
      <DatabaseIcon className="h-4 w-4 text-green-600 mx-auto" />
      {/* <p className="text-xs pt-1">Database</p> */}
    </div>
  );
};

export const AwsLogo = () => {
  return (
    <img src={imgLinks.awsdark}  className="size-8"/>
  )
}

export const HuaweiLogo = () => {
  return (
    <img src={imgLinks.huawei}  className="size-8"/>
  )
}

export const FileCabinetIcon = () => {
  return (
    <div className=" rounded p-2 text-center ">
      <Server className="h-4 w-4 text-green-600 mx-auto" />
      <p className="text-xs pt-1">Web Server</p>
    </div>
  );
};

export const ProxyIcon = () => {
  return (
    <div className=" rounded p-2 text-center ">
      <Network className="h-4 w-4 text-green-600 mx-auto" />
      <p className="text-xs pt-1">Proxy</p>
    </div>
  );
};

export const ApiServerIcon = () => {
  return (
    <div className=" rounded p-2 ">
      <Server className="h-4 w-4 text-purple-600 mx-auto" />
      <p className="text-xs pt-1">DB Server</p>
    </div>
  );
};

export const NetworkIcon = () => {
  return (
    <div className=" rounded p-2 text-purple-600">
      <Network className="h-4 w-4  mx-auto" />
      {/* <p className="text-xs pt-1">Network</p> */}
    </div>
  );
};

export const ICON_MAP = {
  'Proxy'  : <Network className="text-red-500 size-4"/>,
  'Nat Gateway'  : <Network className="text-red-500 size-4"/>,
  "Server": <Server className="text-purple-600 size-4"/>,
  "S3": <File className="text-blue-600 size-5"/>,
  "API": <ApiServerIcon />,
  "Database": <DatabaseIcon className="text-green-600 size-4"/>,
  'Server Rooms': <RectangleVertical className="text-red-600 size-5"/>,
  'Server Houses': <IconDoor className="size-5 text-blue-600"/>,
};

export const RESOURCE_MAP = {
  'Proxy': <NetworkIcon />,
  'Server': <ServerIcon />,
  'Database': <Database />,
  'Server Rooms': <MdRoom />,
  'Server Houses': <House />,
  'API': <ApiServerIcon />,
  'IAM':<UserCheck />,
  'S3':<img src={svgLinks.s3} className="size-8"/>,
  'R53':<img src={svgLinks.r53} className="size-8"/>,
} as const;


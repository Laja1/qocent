import { imgLinks,  } from "@/assets/assetLink";
import {
  DatabaseIcon,
  Globe,
  Network,
  Server,
  Shield,
  User,
} from "lucide-react";

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
  return <img src={imgLinks.awsdark} className="size-8" />;
};

export const HuaweiLogo = () => {
  return <img src={imgLinks.huawei} className="size-8" />;
};

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





export const RESOURCE_MAP = {
  User: {
    icon: <User className="size-5" />,
    color: "text-pink-600",
    // bgColor: "bg-pink-100",
  },
  IGW: {
    icon: <Globe className="size-5" />,
    color: "text-blue-600",
    // bgColor: "bg-blue-100",
  },
  HouseRouter: {
    icon: <img src={imgLinks.router} alt="router" className="size-8" />,
    color: "text-purple-600",
    // bgColor: "bg-purple-100",
  },
  InternetRouter: {
    icon: <Globe className="size-5" />,
    color: "text-green-600",
    // bgColor: "bg-green-100",
  },
  LB: {
    icon: <Shield className="size-5" />,
    color: "text-purple-600",
    // bgColor: "bg-purple-100",
  },
  ServerRoom: {
    icon: <img src={imgLinks.switch} alt="switch" className="size-5" />,
    color: "text-blue-600",
    // bgColor: "bg-blue-100",
  },
  "Server Room": {
    icon: <img src={imgLinks.switch} alt="switch" className="size-8" />,
    color: "text-blue-600",
    // bgColor: "bg-blue-100",
  },
  Server: {
    icon: <Server className="size-5" />,
    color: "text-red-600",
    // bgColor: "bg-red-100",
  },
  Database: {
    icon: <DatabaseIcon className="size-5" />,
    color: "text-indigo-600",
    // bgColor: "bg-indigo-100",
  },
  RDS: {
    icon: <DatabaseIcon className="size-5" />,
    color: "text-purple-600",
    // bgColor: "bg-indigo-100",
  },
  "Database-SQL": {
    icon: <DatabaseIcon className="size-5" />,
    color: "text-indigo-600",
    // bgColor: "bg-indigo-100",
  },
};
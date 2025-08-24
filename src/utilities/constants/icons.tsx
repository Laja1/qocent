import { awsIconLinks, huaweiIconLinks, imgLinks } from "@/assets/assetLink";
import type { RootState } from "@/store";
import { DatabaseIcon, Globe, Shield } from "lucide-react";
import { useSelector } from "react-redux";

// type IconProps = {
//   id: number;
// };

export const AwsLogo = () => {
  return <img src={imgLinks.awsdark} className="size-9" />;
};

export const HuaweiLogo = () => {
  return <img src={imgLinks.huawei} className="size-9" />;
};

export const useResourceMap = () => {
  const dashboard = useSelector((state: RootState) => state.dashboard);

  return {
  User: {
    icon: <img src={dashboard?.provider.toLowerCase() === 'huawei'? huaweiIconLinks.user : awsIconLinks.user} alt="router" className="size-9" />,
    color: "text-pink-600",
    // bgColor: "bg-pink-100",
  },
  ELB: {
    icon: <img src={dashboard?.provider.toLowerCase() === 'huawei'? huaweiIconLinks.elb : awsIconLinks.user} alt="router" className="size-9" />,
    color: "text-pink-600",
    // bgColor: "bg-pink-100",
  },
  AwsUser: {
    icon: <img src={awsIconLinks.user} alt="router" className="size-9" />,
    color: "text-pink-600",
    // bgColor: "bg-pink-100",
  },
  IGW: {
    icon: <Globe className="size-5" />,
    color: "text-blue-600",
    // bgColor: "bg-blue-100",
  },
  HouseRouter: {
    icon: <img src={huaweiIconLinks.router} alt="router" className="size-9" />,
    color: "text-purple-600",
    // bgColor: "bg-purple-100",
  },
  "File Storage": {
    icon: <img src={huaweiIconLinks.sfs} alt="sfs" className="size-9" />,
    // color: "text-purple-600",
    // bgColor: "bg-purple-100",
  },
  "Disk Storage": {
    icon: <img src={huaweiIconLinks.evs} alt="sfs" className="size-9" />,
    // color: "text-purple-600",
    // bgColor: "bg-purple-100",
  },
  "elb": {
    icon: <img src={huaweiIconLinks.elb} alt="sfs" className="size-9" />,
  },
  InternetRouter: {
    icon: <Globe className="size-5" />,
    color: "text-green-600",
    // bgColor: "bg-green-100",
  },
  "Cloud Storage": {
    icon: <Globe className="size-5" />,
    color: "text-green-600",
    // bgColor: "bg-green-100",
  },
  EVS: {
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
    icon: <img src={imgLinks.switch} alt="switch" className="size-9" />,
    color: "text-blue-600",
    // bgColor: "bg-blue-100",
  },
  Server: {
    icon: <img src={huaweiIconLinks.server} alt="switch" className="size-9" />,
    color: "text-blue-600",
    // bgColor: "bg-blue-100",
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
}
}
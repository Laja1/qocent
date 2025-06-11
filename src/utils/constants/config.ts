import { Home, BookOpen, School, Award, Settings } from "lucide-react";
import type { SVGProps } from "react";
import {
  // Cloud,
  Server,
  // HardDrive,
  // FolderOpen,
  // Shield,
  // Database,
  // Network,
  // Plus,
  Activity,
  DollarSign,
  Users,
} from "lucide-react";
import type { ServerCardsProps } from "@/pages/server-room/server-cards";

type dashboardItemType = {
  name: string;
  href: string;
  icon: React.FC<SVGProps<SVGSVGElement>>;
};

export const dashboardItems: dashboardItemType[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "My Courses",
    href: "/dashboard/my-course",
    icon: BookOpen,
  },
  {
    name: "My Schools",
    href: "/dashboard/my-school",
    icon: School,
  },
  {
    name: "Certificates",
    href: "/dashboard/certificates",
    icon: Award,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export const sidebarItems = [
  {
    title: "Dashboard",
    icon: Activity,
    href: "/dashboard",
    isActive: true,
  },
  {
    title: "Server Room",
    icon: Server,
    href: "/dashboard/server-room",
    isActive: false,
  },
  {
    title: "Billing",
    icon: DollarSign,
    href: "/dashboard/billing",
    isActive: false,
  },
  {
    title: "Team",
    icon: Users,
    href: "/dashboard/team",
    isActive: false,
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    isActive: false,
  },
];

export const serverRooms: ServerCardsProps[] = [
  {
    id: "rubies",
    name: "Rubies Server Room",
    description: "Production environment for the Rubies application",
    resourceCount: 12,
    region: "US East",
    status: "Active",
    createdAt: "2023-05-15",
  },
  {
    id: "emeralds",
    name: "Emeralds Server Room",
    description: "Development environment for the Emeralds project",
    resourceCount: 8,
    region: "US West",
    status: "Active",
    createdAt: "2023-06-22",
  },
  {
    id: "sapphires",
    name: "Sapphires Server Room",
    description: "Testing environment for the Sapphires service",
    resourceCount: 5,
    region: "EU West",
    status: "Maintenance",
    createdAt: "2023-07-10",
  },
  {
    id: "diamonds",
    name: "Diamonds Server Room",
    description: "Staging environment for the Diamonds platform",
    resourceCount: 9,
    region: "Asia Pacific",
    status: "Active",
    createdAt: "2023-08-05",
  },
];
export const serverRoomResources = {
  servers: [
    {
      id: "srv-001",
      name: "API Server",
      type: "t3.medium",
      status: "Running",
      ip: "10.0.1.5",
    },
    {
      id: "srv-002",
      name: "Database Server",
      type: "r5.large",
      status: "Running",
      ip: "10.0.1.6",
    },
    {
      id: "srv-003",
      name: "Web Server",
      type: "t3.small",
      status: "Running",
      ip: "10.0.1.7",
    },
  ],
  fileCabinets: [
    {
      id: "fc-001",
      name: "User Uploads",
      size: "250GB",
      access: "Private",
    },
    {
      id: "fc-002",
      name: "Static Assets",
      size: "120GB",
      access: "Public",
    },
  ],
  sanDisks: [
    {
      id: "san-001",
      name: "Database Storage",
      size: "500GB",
      type: "SSD",
      attached: "srv-002",
    },
    {
      id: "san-002",
      name: "Backup Storage",
      size: "1TB",
      type: "HDD",
      attached: "None",
    },
  ],
  outgoingProxies: [
    {
      id: "proxy-001",
      name: "Main Proxy",
      bandwidth: "1Gbps",
      status: "Active",
    },
  ],
};

export const subnetData = [
  {
    id: 1,
    subnet: "Public",
    availabilityZone: "us-east-1a",
    resourcesDeployed: [
      {
        id: 101,
        name: "Proxy",
      },
    ],
  },
  {
    id: 2,
    subnet: "Public",
    availabilityZone: "us-east-1b",
    resourcesDeployed: [
      {
        id: 301,
        name: "Web Server",
      },
    ],
  },
  {
    id: 3,
    subnet: "Private",
    availabilityZone: "us-east-1a",
    resourcesDeployed: [
      {
        id: 201,
        name: "API Server",
      },
      {
        id: 202,
        name: "File Cabinet",
      },
    ],
  },
  {
    id: 5,
    subnet: "Private",
    availabilityZone: "us-east-1a",
    resourcesDeployed: [
      {
        id: 201,
        name: "API Server",
      },
      {
        id: 202,
        name: "File Cabinet",
      },
    ],
  },
];

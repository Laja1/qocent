import { Home, BookOpen, School, Award, Settings, User, Command, Construction } from "lucide-react";
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
} from "lucide-react";

type dashboardItemType = {
  name: string;
  href: string;
  icon: React.FC<SVGProps<SVGSVGElement>>;
};

export interface ServerRoomType {
  id: string;
  name: string;
  description: string;
  resourceCount: number;
  region: string;
  status: string;
  createdAt: string;
  bill: number;
  credit: number;
}

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
    title: "Server Rooms",
    icon: Server,
    href: "/dashboard/server-rooms",
    isActive: false,
  },
  {
    title: "Resources",
    icon: Activity,
    href: "/dashboard/resources",
    isActive: false,
  },
  {
    title: "Projects",
    icon: Construction,
    href: "/dashboard/projects",
    isActive: false,
  },
  {
    title: "Billing",
    icon: DollarSign,
    href: "/dashboard/billing",
    isActive: false,
  },
  {
    title: "IAM Center(Identity Access Management)",
    icon: User,
    href: "/dashboard/identity-center",
    isActive: false,
  },
  {
    title: "Command Center",
    icon: Command,
    href: "/dashboard/command-center",
    isActive: false,
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    isActive: false,
  },
];

export const serverRooms: ServerRoomType[] = [
  {
    id: "100234001",
    name: "Tymer",
    description: "Production environment for the Tymer application",
    resourceCount: 12,
    region: "US (California)",
    status: "ACTIVE",
    createdAt: "1945-02-03",
    bill: 76902.0,
    credit: 7718.0,
  },
  {
    id: "100234002",
    name: "Rubies",
    description: "Production environment for the Rubies application",
    resourceCount: 8,
    region: "US (Virginia)",
    status: "ACTIVE",
    createdAt: "1945-02-04",
    bill: 34460.0,
    credit: 661.0,
  },
  {
    id: "100234003",
    name: "Qoovest",
    description: "Development environment for the Qoovest project",
    resourceCount: 5,
    region: "UK",
    status: "ACTIVE",
    createdAt: "1945-02-05",
    bill: 11671.0,
    credit: 547.0,
  },
  {
    id: "100234004",
    name: "Qoonity",
    description: "Testing environment for the Qoonity service",
    resourceCount: 9,
    region: "France",
    status: "ACTIVE",
    createdAt: "1945-02-06",
    bill: 87829.0,
    credit: 4877.0,
  },
  {
    id: "100234005",
    name: "NCube",
    description: "Staging environment for the NCube platform",
    resourceCount: 15,
    region: "Germany",
    status: "ACTIVE",
    createdAt: "1945-02-07",
    bill: 75488.0,
    credit: 2267.0,
  },
  {
    id: "100234006",
    name: "Tymer",
    description: "Backup environment for Tymer",
    resourceCount: 6,
    region: "South Africa",
    status: "MAINTENANCE",
    createdAt: "1945-02-08",
    bill: 74891.0,
    credit: 6397.0,
  },
];

type ResourceType = {
  servers: {
    id: string;
    name: string;
    type: string;
    status: string;
  }[];
  databases: {
    id: string;
    name: string;
    type: string;
    status: string;
  }[];
  fileCabinets: {
    id: string;
    name: string;
    type: string;
    status: string;
  }[];
  sanDisks: {
    id: string;
    name: string;
    type: string;
    status: string;
  }[];
  subnets: {
    id: string;
    name: string;
    type: string;
    status: string;
  }[];
  vpc: {
    id: string;
    name: string;
    type: string;
    status: string;
  }[];
};

interface ResourceData {
  id: string;
  name: string;
  description: string;
  resourceCount: number;
  region: string;
  status: string;
  createdAt: string;
  bill: number;
  credit: number;
  resources: ResourceType[];
}

export const resources: ResourceData[] = [
  {
    id: "100234001",
    name: "Tymer",
    description: "Production environment for the Tymer application",
    resourceCount: 12,
    region: "US (California)",
    status: "ACTIVE",
    createdAt: "1945-02-03",
    bill: 76902.0,
    credit: 7718.0,
    resources: [
      {
        servers: [
          {
            id: "100234001",
            name: "Server 1",
            type: "t3.medium",
            status: "ACTIVE",
          },
          {
            id: "100234002",
            name: "Server 2",
            type: "t3.medium",
            status: "ACTIVE",
          },
        ],
        databases: [
          {
            id: "100234003",
            name: "Database 1",
            type: "mysql",
            status: "ACTIVE",
          },
          {
            id: "100234004",
            name: "Database 2",
            type: "mysql",
            status: "ACTIVE",
          },
        ],
        fileCabinets: [
          {
            id: "100234005",
            name: "File Cabinet 1",
            type: "s3",
            status: "ACTIVE",
          },
        ],
        sanDisks: [
          {
            id: "100234006",
            name: "SAN Disk 1",
            type: "ssd",
            status: "ACTIVE",
          },
        ],
        subnets: [
          {
            id: "100234007",
            name: "Subnet 1",
            type: "subnet",
            status: "ACTIVE",
          },
        ],
        vpc: [
          {
            id: "100234008",
            name: "VPC 1",
            type: "vpc",
            status: "ACTIVE",
          },
        ],
      },
    ],
  },
  {
    id: "100234002",
    name: "Rubies",
    description: "Production environment for the Rubies application",
    resourceCount: 8,
    region: "US (Virginia)",
    status: "ACTIVE",
    createdAt: "1945-02-04",
    bill: 34460.0,
    credit: 661.0,
    resources: [
      {
        servers: [
          {
            id: "100234001",
            name: "Server 1",
            type: "t3.medium",
            status: "ACTIVE",
          },
          {
            id: "100234002",
            name: "Server 2",
            type: "t3.medium",
            status: "ACTIVE",
          },
        ],
        databases: [
          {
            id: "100234003",
            name: "Database 1",
            type: "mysql",
            status: "ACTIVE",
          },
          {
            id: "100234004",
            name: "Database 2",
            type: "mysql",
            status: "ACTIVE",
          },
        ],
        fileCabinets: [
          {
            id: "100234005",
            name: "File Cabinet 1",
            type: "s3",
            status: "ACTIVE",
          },
        ],
        sanDisks: [
        ],
        subnets: [
          {
            id: "100234006",
            name: "Subnet 1",
            type: "subnet",
            status: "ACTIVE",
          },
        ],
        vpc: [
          {
            id: "100234007",
            name: "VPC 1",
            type: "vpc",
            status: "ACTIVE",
          },
        ],
      },
    ],
  },
  {
    id: "100234003",
    name: "Qoovest",
    description: "Development environment for the Qoovest project",
    resourceCount: 5,
    region: "UK",
    status: "ACTIVE",
    createdAt: "1945-02-05",
    bill: 11671.0,
    credit: 547.0,
    resources: [
      {
        servers: [
          {
            id: "100234001",
            name: "Server 1",
            type: "t3.medium",
            status: "ACTIVE",
          },
          {
            id: "100234002",
            name: "Server 2",
            type: "t3.medium",
            status: "ACTIVE",
          },
        ],
        databases: [
          {
            id: "100234003",
            name: "Database 1",
            type: "mysql",
            status: "ACTIVE",
          },
          {
            id: "100234004",
            name: "Database 2",
            type: "mysql",
            status: "ACTIVE",
          },
        ],
        fileCabinets: [
          {
            id: "100234005",
            name: "File Cabinet 1",
            type: "s3",
            status: "ACTIVE",
          },
        ],
        sanDisks: [
          {
            id: "100234006",
            name: "SAN Disk 1",
            type: "ssd",
            status: "ACTIVE",
          },
        ],
        subnets: [
          {
            id: "100234007",
            name: "Subnet 1",
            type: "subnet",
            status: "ACTIVE",
          },
        ],
        vpc: [
          {
            id: "100234008",
            name: "VPC 1",
            type: "vpc",
            status: "ACTIVE",
          },
        ],
      },
    ],
  },
  {
    id: "100234004",
    name: "Qoonity",
    description: "Testing environment for the Qoonity service",
    resourceCount: 9,
    region: "France",
    status: "ACTIVE",
    createdAt: "1945-02-06",
    bill: 87829.0,
    credit: 4877.0,
    resources: [
      {
        servers: [
          {
            id: "100234001",
            name: "Server 1",
            type: "t3.medium",
            status: "ACTIVE",
          },
          {
            id: "100234002",
            name: "Server 2",
            type: "t3.medium",
            status: "ACTIVE",
          },
        ],
        databases: [
          {
            id: "100234003",
            name: "Database 1",
            type: "mysql",
            status: "ACTIVE",
          },
          {
            id: "100234004",
            name: "Database 2",
            type: "mysql",
            status: "ACTIVE",
          },
        ],
        fileCabinets: [
          {
            id: "100234005",
            name: "File Cabinet 1",
            type: "s3",
            status: "ACTIVE",
          },
        ],
        sanDisks: [
          {
            id: "100234006",
            name: "SAN Disk 1",
            type: "ssd",
            status: "ACTIVE",
          },
        ],
        subnets: [
          {
            id: "100234007",
            name: "Subnet 1",
            type: "subnet",
            status: "ACTIVE",
          },
        ],
        vpc: [
          {
            id: "100234008",
            name: "VPC 1",
            type: "vpc",
            status: "ACTIVE",
          },
        ],
      },
    ],
  },
  {
    id: "100234005",
    name: "NCube",
    description: "Staging environment for the NCube platform",
    resourceCount: 15,
    region: "Germany",
    status: "ACTIVE",
    createdAt: "1945-02-07",
    bill: 75488.0,
    credit: 2267.0,
    resources: [
      {
        servers: [
          {
            id: "100234001",
            name: "Server 1",
            type: "t3.medium",
            status: "ACTIVE",
          },
          {
            id: "100234002",
            name: "Server 2",
            type: "t3.medium",
            status: "ACTIVE",
          },
        ],
        databases: [
          {
            id: "100234003",
            name: "Database 1",
            type: "mysql",
            status: "ACTIVE",
          },
          {
            id: "100234004",
            name: "Database 2",
            type: "mysql",
            status: "ACTIVE",
          },
        ],
        fileCabinets: [
          {
            id: "100234005",
            name: "File Cabinet 1",
            type: "s3",
            status: "ACTIVE",
          },
        ],
        sanDisks: [
          {
            id: "100234006",
            name: "SAN Disk 1",
            type: "ssd",
            status: "ACTIVE",
          },
        ],
        subnets: [
          {
            id: "100234007",
            name: "Subnet 1",
            type: "subnet",
            status: "ACTIVE",
          },
        ],
        vpc: [
          {
            id: "100234008",
            name: "VPC 1",
            type: "vpc",
            status: "ACTIVE",
          },
        ],
      },
    ],
  },
  {
    id: "100234006",
    name: "Tymer",
    description: "Backup environment for Tymer",
    resourceCount: 6,
    region: "South Africa",
    status: "MAINTENANCE",
    createdAt: "1945-02-08",
    bill: 74891.0,
    credit: 6397.0,
    resources: [
      {
        servers: [
          {
            id: "100234001",
            name: "Server 1",
            type: "t3.medium",
            status: "ACTIVE",
          },
          {
            id: "100234002",
            name: "Server 2",
            type: "t3.medium",
            status: "ACTIVE",
          },
        ],
        databases: [
          {
            id: "100234003",
            name: "Database 1",
            type: "mysql",
            status: "ACTIVE",
          },
          {
            id: "100234004",
            name: "Database 2",
            type: "mysql",
            status: "ACTIVE",
          },
        ],
        fileCabinets: [
          {
            id: "100234005",
            name: "File Cabinet 1",
            type: "s3",
            status: "ACTIVE",
          },
        ],
        sanDisks: [
          {
            id: "100234006",
            name: "SAN Disk 1",
            type: "ssd",
            status: "ACTIVE",
          },
        ],
        subnets: [
          {
            id: "100234007",
            name: "Subnet 1",
            type: "subnet",
            status: "ACTIVE",
          },
        ],
        vpc: [
          {
            id: "100234008",
            name: "VPC 1",
            type: "vpc",
            status: "ACTIVE",
          },
        ],
      },
    ],
  },
];

export const serverColumns: Array<{
  header: string;
  accessorKey?: string;
}> = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "NAME",
    accessorKey: "name",
  },
  {
    header: "VIEW",
  },
  {
    header: "REGION",
    accessorKey: "region",
  },
  {
    header: "DATE",
  },
  {
    header: "STATUS",
    accessorKey: "status",
  },
  {
    header: "BILL (USD)",
  },
  {
    header: "CREDIT (USD)",
  },
]

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

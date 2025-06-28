import {
  Settings,
  Construction,
  Warehouse,
  Fan,
  Briefcase,
  Wallet,
  Users,
  RotateCcwKey,
  Anchor,
} from "lucide-react";



export interface ServerRoomType {
  siteId: string;
  siteName: string;
  houses: string;
  alerts: number;
  provider: string;
  siteCode: string;
  status: string;
  createdAt: string;
  bill: number;
  balance: number;
}



export const sidebarItems = [
  {
    title: "Server Sites (Accouts)",
    icon: Fan,
    href: "/server-sites",
    isActive: false,
  },
  {
    title: "Server Houses (VPCs)",
    icon: Warehouse,
    href: "/server-houses",
    isActive: false,
  },
  {
    title: "Server Rooms (Subnets)",
    icon: Construction,
    href: "/server-rooms",
    isActive: false,
  },
  {
    title: "Resources",
    icon: Anchor,
    href: "/resources",
    isActive: false,
  },
  {
    title: "Projects",
    icon: Briefcase,
    href: "/identity-center",
    isActive: false,
  },
  {
    title: "Access Management",
    icon: RotateCcwKey,
    href: "/command-center",
    isActive: false,
  },
  {
    title: "Billing & Statements",
    icon: Wallet,
    href: "/settings",
    isActive: false,
  },
  {
    title: "Organization",
    icon: Users,
    href: "/settings",
    isActive: false,
  },
  {
    title: "Settings",
    icon: Settings,
    href: "Settings",
    isActive: false,
  },
];

export const serverRooms: ServerRoomType[] = [
  {
    siteId: "1001",
    siteName: "Rubies Production Site",
    houses: "2",
    alerts: 0,
    provider: "AWS",
    siteCode: "Rub-Prod-Site-1",
    status: "Active",
    createdAt: "2025-01-09",
    bill: 76902.0,
    balance: 7718.0,
  },
  {
    siteId: "1002",
    siteName: "Qoovest",
    houses: "2",
    alerts: 5,
    siteCode: "Qoov-Prod-Site-1",
    status: "Active",
    provider: "Huawei",
    createdAt: "2025-01-09",
    bill: 11671.0,
    balance: 547.0,
  },
  {
    siteId: "1003",
    siteName: "Qoonity",
    houses: "1",
    provider: "Huawei",
    siteCode: "Qoon-Prod-Site-1",
    alerts: 9,
    status: "Active",
    createdAt: "2025-01-09",
    bill: 87829.0,
    balance: 4877.0,
  },
  {
    siteId: "1004",
    provider: "AWS",
    siteCode: "NC-Prod-Site-1",
    siteName: "NCube",
    houses: "3",
    alerts: 15,
    status: "Active",
    createdAt: "2025-01-09",
    bill: 75488.0,
    balance: 2267.0,
  },
  {
    siteId: "1005",
    siteName: "Tymer",
    provider: "AWS",
    siteCode: "Tymer-Prod-Site-1",
    houses: "2",
    alerts: 6,
    status: "Suspended",
    createdAt: "2025-01-09",
    bill: 74891.0,
    balance: 6397.0,
  },
  {
    siteId: "1006",
    siteName: "Tymer",
    provider: "AWS",
    siteCode: "Tymer-Prod-Site-1",
    houses: "4",
    alerts: 6,
    status: "Suspended",
    createdAt: "2025-01-09",
    bill: 74891.0,
    balance: 6397.0,
  },
]

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
  alerts: number;
  region: string;
  status: string;
  createdAt: string;
  bill: number;
  balance: number;
  resources: ResourceType[];
}

export const resources: ResourceData[] = [
  {
    id: "1001",
    name: "Tymer",
    description: "Production environment for the Tymer application",
    alerts: 12,
    region: "US (California)",
    status: "Active",
    createdAt: "2025-01-09",
    bill: 76902.0,
    balance: 7718.0,
    resources: [
      {
        servers: [
          {
            id: "1001",
            name: "Server 1",
            type: "t3.medium",
            status: "ACTIVE",
          },
          {
            id: "1002",
            name: "Server 2",
            type: "t3.medium",
            status: "ACTIVE",
          },
        ],
        databases: [
          {
            id: "1003",
            name: "Database 1",
            type: "mysql",
            status: "ACTIVE",
          },
          {
            id: "1004",
            name: "Database 2",
            type: "mysql",
            status: "ACTIVE",
          },
        ],
        fileCabinets: [
          {
            id: "1005",
            name: "File Cabinet 1",
            type: "s3",
            status: "ACTIVE",
          },
        ],
        sanDisks: [
          {
            id: "1006",
            name: "SAN Disk 1",
            type: "ssd",
            status: "ACTIVE",
          },
        ],
        subnets: [
          {
            id: "1007",
            name: "Subnet 1",
            type: "subnet",
            status: "ACTIVE",
          },
        ],
        vpc: [
          {
            id: "1008",
            name: "VPC 1",
            type: "vpc",
            status: "ACTIVE",
          },
        ],
      },
    ],
  },
  {
    id: "1002",
    name: "Rubies Production Site",
    description:
      "Production environment for the Rubies Production Site application",
    alerts: 8,
    region: "US (Virginia)",
    status: "ACTIVE",
    createdAt: "2025-01-09",
    bill: 34460.0,
    balance: 661.0,
    resources: [
      {
        servers: [
          {
            id: "1001",
            name: "Server 1",
            type: "t3.medium",
            status: "ACTIVE",
          },
          {
            id: "1002",
            name: "Server 2",
            type: "t3.medium",
            status: "ACTIVE",
          },
        ],
        databases: [
          {
            id: "1003",
            name: "Database 1",
            type: "mysql",
            status: "ACTIVE",
          },
          {
            id: "1004",
            name: "Database 2",
            type: "mysql",
            status: "ACTIVE",
          },
        ],
        fileCabinets: [
          {
            id: "1005",
            name: "File Cabinet 1",
            type: "s3",
            status: "ACTIVE",
          },
        ],
        sanDisks: [],
        subnets: [
          {
            id: "1006",
            name: "Subnet 1",
            type: "subnet",
            status: "ACTIVE",
          },
        ],
        vpc: [
          {
            id: "1007",
            name: "VPC 1",
            type: "vpc",
            status: "ACTIVE",
          },
        ],
      },
    ],
  },
  {
    id: "1003",
    name: "Qoovest",
    description: "Development environment for the Qoovest project",
    alerts: 5,
    region: "UK",
    status: "ACTIVE",
    createdAt: "2025-01-09",
    bill: 11671.0,
    balance: 547.0,
    resources: [
      {
        servers: [
          {
            id: "1001",
            name: "Server 1",
            type: "t3.medium",
            status: "ACTIVE",
          },
          {
            id: "1002",
            name: "Server 2",
            type: "t3.medium",
            status: "ACTIVE",
          },
        ],
        databases: [
          {
            id: "1003",
            name: "Database 1",
            type: "mysql",
            status: "ACTIVE",
          },
          {
            id: "1004",
            name: "Database 2",
            type: "mysql",
            status: "ACTIVE",
          },
        ],
        fileCabinets: [
          {
            id: "1005",
            name: "File Cabinet 1",
            type: "s3",
            status: "ACTIVE",
          },
        ],
        sanDisks: [
          {
            id: "1006",
            name: "SAN Disk 1",
            type: "ssd",
            status: "ACTIVE",
          },
        ],
        subnets: [
          {
            id: "1007",
            name: "Subnet 1",
            type: "subnet",
            status: "ACTIVE",
          },
        ],
        vpc: [
          {
            id: "1008",
            name: "VPC 1",
            type: "vpc",
            status: "ACTIVE",
          },
        ],
      },
    ],
  },
  {
    id: "1004",
    name: "Qoonity",
    description: "Testing environment for the Qoonity service",
    alerts: 9,
    region: "France",
    status: "ACTIVE",
    createdAt: "2025-01-09",
    bill: 87829.0,
    balance: 4877.0,
    resources: [
      {
        servers: [
          {
            id: "1001",
            name: "Server 1",
            type: "t3.medium",
            status: "ACTIVE",
          },
          {
            id: "1002",
            name: "Server 2",
            type: "t3.medium",
            status: "ACTIVE",
          },
        ],
        databases: [
          {
            id: "1003",
            name: "Database 1",
            type: "mysql",
            status: "ACTIVE",
          },
          {
            id: "1004",
            name: "Database 2",
            type: "mysql",
            status: "ACTIVE",
          },
        ],
        fileCabinets: [
          {
            id: "1005",
            name: "File Cabinet 1",
            type: "s3",
            status: "ACTIVE",
          },
        ],
        sanDisks: [
          {
            id: "1006",
            name: "SAN Disk 1",
            type: "ssd",
            status: "ACTIVE",
          },
        ],
        subnets: [
          {
            id: "1007",
            name: "Subnet 1",
            type: "subnet",
            status: "ACTIVE",
          },
        ],
        vpc: [
          {
            id: "1008",
            name: "VPC 1",
            type: "vpc",
            status: "ACTIVE",
          },
        ],
      },
    ],
  },
  {
    id: "1005",
    name: "NCube",
    description: "Staging environment for the NCube platform",
    alerts: 15,
    region: "Germany",
    status: "ACTIVE",
    createdAt: "1945-02-07",
    bill: 75488.0,
    balance: 2267.0,
    resources: [
      {
        servers: [
          {
            id: "1001",
            name: "Server 1",
            type: "t3.medium",
            status: "ACTIVE",
          },
          {
            id: "1002",
            name: "Server 2",
            type: "t3.medium",
            status: "ACTIVE",
          },
        ],
        databases: [
          {
            id: "1003",
            name: "Database 1",
            type: "mysql",
            status: "ACTIVE",
          },
          {
            id: "1004",
            name: "Database 2",
            type: "mysql",
            status: "ACTIVE",
          },
        ],
        fileCabinets: [
          {
            id: "1005",
            name: "File Cabinet 1",
            type: "s3",
            status: "ACTIVE",
          },
        ],
        sanDisks: [
          {
            id: "1006",
            name: "SAN Disk 1",
            type: "ssd",
            status: "ACTIVE",
          },
        ],
        subnets: [
          {
            id: "1007",
            name: "Subnet 1",
            type: "subnet",
            status: "ACTIVE",
          },
        ],
        vpc: [
          {
            id: "1008",
            name: "VPC 1",
            type: "vpc",
            status: "ACTIVE",
          },
        ],
      },
    ],
  },
  {
    id: "1006",
    name: "Tymer",
    description: "Backup environment for Tymer",
    alerts: 6,
    region: "South Africa",
    status: "Suspended",
    createdAt: "2025-01-09",
    bill: 74891.0,
    balance: 6397.0,
    resources: [
      {
        servers: [
          {
            id: "1001",
            name: "Server 1",
            type: "t3.medium",
            status: "ACTIVE",
          },
          {
            id: "1002",
            name: "Server 2",
            type: "t3.medium",
            status: "ACTIVE",
          },
        ],
        databases: [
          {
            id: "1003",
            name: "Database 1",
            type: "mysql",
            status: "ACTIVE",
          },
          {
            id: "1004",
            name: "Database 2",
            type: "mysql",
            status: "ACTIVE",
          },
        ],
        fileCabinets: [
          {
            id: "1005",
            name: "File Cabinet 1",
            type: "s3",
            status: "ACTIVE",
          },
        ],
        sanDisks: [
          {
            id: "1006",
            name: "SAN Disk 1",
            type: "ssd",
            status: "ACTIVE",
          },
        ],
        subnets: [
          {
            id: "1007",
            name: "Subnet 1",
            type: "subnet",
            status: "ACTIVE",
          },
        ],
        vpc: [
          {
            id: "1008",
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
    header: "balance (USD)",
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

export const vpcData = [
  {
    vpcId: "vpc-001", // Unique identifier for the VPC
    whereDeployed: "AWS",
    cidrBlock: "10.0.0.0/16",
    id: 1,
    numberOfSubnets: 2, // Updated to reflect total number of subnets
    subnet: [
      {
        id: 1,
        subnet: "Public",
        availabilityZone: "us-east-1a",
        resourcesDeployed: [
          {
            id: 101,
            name: "Proxy",
            instanceType: "t2.micro", // Add instance type for resources
            status: "running", // Add status of resource
          },
        ],
        routeTable: "rtb-001", // Example route table associated with the subnet
        securityGroups: ["sg-001", "sg-002"], // Example security groups associated with the subnet
      },
      {
        id: 1,
        subnet: "Public",
        availabilityZone: "us-east-1a",
        resourcesDeployed: [
          {
            id: 101,
            name: "Proxy",
            instanceType: "t2.micro", // Add instance type for resources
            status: "running", // Add status of resource
          },

          {
            id: 101,
            name: "Proxy",
            instanceType: "t2.micro", // Add instance type for resources
            status: "running", // Add status of resource
          },
          {
            id: 102,
            name: "Proxy",
            instanceType: "t2.micro", // Add instance type for resources
            status: "running", // Add status of resource
          },
        ],
        routeTable: "rtb-001", // Example route table associated with the subnet
        securityGroups: ["sg-001", "sg-002"], // Example security groups associated with the subnet
      },
      {
        id: 2,
        subnet: "Private",
        availabilityZone: "us-east-1a",
        resourcesDeployed: [
          {
            id: 201,
            name: "API Server",
            instanceType: "t2.large",
            status: "running",
          },
          {
            id: 202,
            name: "File Cabinet",
            instanceType: "t2.medium",
            status: "stopped",
          },
        ],
        routeTable: "rtb-003",
        securityGroups: ["sg-004"],
      },
      {
        id: 3,
        subnet: "Private", // Changed id to 4 for consistency
        availabilityZone: "us-east-1b", // Fixed inconsistency in availability zones
        resourcesDeployed: [
          {
            id: 102,
            name: "Proxy",
            instanceType: "t2.micro", // Add instance type for resources
            status: "running", // Add status of resource
          },
        ],
        routeTable: "rtb-004",
        securityGroups: ["sg-005"],
      },
    ],
  },
  {
    vpcId: "vpc-001", // Unique identifier for the VPC
    whereDeployed: "AWS",
    cidrBlock: "10.0.0.0/16",
    id: 1,
    numberOfSubnets: 2, // Updated to reflect total number of subnets
    subnet: [
      {
        id: 1,
        subnet: "Public",
        availabilityZone: "us-east-1a",
        resourcesDeployed: [
          {
            id: 101,
            name: "Proxy",
            instanceType: "t2.micro", // Add instance type for resources
            status: "running", // Add status of resource
          },
        ],
        routeTable: "rtb-001", // Example route table associated with the subnet
        securityGroups: ["sg-001", "sg-002"], // Example security groups associated with the subnet
      },

      {
        id: 2,
        subnet: "Private",
        availabilityZone: "us-east-1a",
        resourcesDeployed: [
          {
            id: 201,
            name: "API Server",
            instanceType: "t2.large",
            status: "running",
          },
          {
            id: 202,
            name: "File Cabinet",
            instanceType: "t2.medium",
            status: "stopped",
          },
        ],
        routeTable: "rtb-003",
        securityGroups: ["sg-004"],
      },
      {
        id: 3,
        subnet: "Private", // Changed id to 4 for consistency
        availabilityZone: "us-east-1b", // Fixed inconsistency in availability zones
        resourcesDeployed: [
          {
            id: 203,
            name: "Database Server",
            instanceType: "t2.xlarge",
            status: "running",
          },
        ],
        routeTable: "rtb-004",
        securityGroups: ["sg-005"],
      },
    ],
  },

  // {
  //   vpcId: "vpc-001", // Unique identifier for the VPC
  //   whereDeployed:'AWS',
  //   cidrBlock: "10.0.0.0/16",
  //   id: 1,
  //   numberOfSubnets: 2, // Updated to reflect total number of subnets
  //   subnet: [
  //     {
  //       id: 1,
  //       subnet: "Public",
  //       availabilityZone: "us-east-1a",
  //       resourcesDeployed: [
  //         {
  //           id: 101,
  //           name: "Proxy",
  //           instanceType: "t2.micro", // Add instance type for resources
  //           status: "running", // Add status of resource
  //         },
  //       ],
  //       routeTable: "rtb-001", // Example route table associated with the subnet
  //       securityGroups: ["sg-001", "sg-002"], // Example security groups associated with the subnet
  //     },

  //     // {
  //     //   id: 2,
  //     //   subnet: "Private",
  //     //   availabilityZone: "us-east-1a",
  //     //   resourcesDeployed: [
  //     //     {
  //     //       id: 201,
  //     //       name: "API Server",
  //     //       instanceType: "t2.large",
  //     //       status: "running",
  //     //     },
  //     //     {
  //     //       id: 202,
  //     //       name: "File Cabinet",
  //     //       instanceType: "t2.medium",
  //     //       status: "stopped",
  //     //     },
  //     //   ],
  //     //   routeTable: "rtb-003",
  //     //   securityGroups: ["sg-004"],
  //     // },
  //     // {
  //     //   id: 3,
  //     //   subnet: "Private", // Changed id to 4 for consistency
  //     //   availabilityZone: "us-east-1b", // Fixed inconsistency in availability zones
  //     //   resourcesDeployed: [
  //     //     {
  //     //       id: 203,
  //     //       name: "Database Server",
  //     //       instanceType: "t2.xlarge",
  //     //       status: "running",
  //     //     },
  //     //   ],
  //     //   routeTable: "rtb-004",
  //     //   securityGroups: ["sg-005"],
  //     // },
  //   ],
  // },

  {
    vpcId: "vpc-002",
    cidrBlock: "192.168.0.0/16",
    whereDeployed: "Huawei",
    id: 2,
    numberOfSubnets: 2,
    subnet: [
      {
        id: 1,
        subnet: "Public",
        availabilityZone: "us-east-1b",
        resourcesDeployed: [
          {
            id: 301,
            name: "Proxy",
            instanceType: "t2.micro",
            status: "running",
          },
        ],
        routeTable: "rtb-005",
        securityGroups: ["sg-006"],
      },
      {
        id: 2,
        subnet: "Private",
        availabilityZone: "us-east-1a",
        resourcesDeployed: [
          {
            id: 201,
            name: "API Server",
            instanceType: "t2.large",
            status: "running",
          },
          {
            id: 202,
            name: "File Cabinet",
            instanceType: "t2.medium",
            status: "stopped",
          },
        ],
        routeTable: "rtb-006",
        securityGroups: ["sg-007"],
      },
    ],
  },
];

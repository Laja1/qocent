import type { HouseArchitectureData } from "@/pages/architectural-room/house-level";

export interface ServerRoomType {
  id: string;
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





export const serverRooms: ServerRoomType[] = [
  {
    id: "100001",
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
    id: "100002",
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
    id: "100003",
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
    id: "100004",
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
    id: "100005",
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
    id: "100006",
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
    id: "100001",
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
            id: "100001",
            name: "Server 1",
            type: "t3.medium",
            status: "ACTIVE",
          },
          {
            id: "100002",
            name: "Server 2",
            type: "t3.medium",
            status: "ACTIVE",
          },
        ],
        databases: [
          {
            id: "100003",
            name: "Database 1",
            type: "mysql",
            status: "ACTIVE",
          },
          {
            id: "100004",
            name: "Database 2",
            type: "mysql",
            status: "ACTIVE",
          },
        ],
        fileCabinets: [
          {
            id: "100005",
            name: "Server 1",
            type: "s3",
            status: "ACTIVE",
          },
        ],
        sanDisks: [
          {
            id: "100006",
            name: "SAN Disk 1",
            type: "ssd",
            status: "ACTIVE",
          },
        ],
        subnets: [
          {
            id: "100007",
            name: "Subnet 1",
            type: "subnet",
            status: "ACTIVE",
          },
        ],
        vpc: [
          {
            id: "100008",
            name: "VPC 1",
            type: "vpc",
            status: "ACTIVE",
          },
        ],
      },
    ],
  },
  {
    id: "100002",
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
            id: "100001",
            name: "Server 1",
            type: "t3.medium",
            status: "ACTIVE",
          },
          {
            id: "100002",
            name: "Server 2",
            type: "t3.medium",
            status: "ACTIVE",
          },
        ],
        databases: [
          {
            id: "100003",
            name: "Database 1",
            type: "mysql",
            status: "ACTIVE",
          },
          {
            id: "100004",
            name: "Database 2",
            type: "mysql",
            status: "ACTIVE",
          },
        ],
        fileCabinets: [
          {
            id: "100005",
            name: "Server 1",
            type: "s3",
            status: "ACTIVE",
          },
        ],
        sanDisks: [],
        subnets: [
          {
            id: "100006",
            name: "Subnet 1",
            type: "subnet",
            status: "ACTIVE",
          },
        ],
        vpc: [
          {
            id: "100007",
            name: "VPC 1",
            type: "vpc",
            status: "ACTIVE",
          },
        ],
      },
    ],
  },
  {
    id: "100003",
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
            id: "100001",
            name: "Server 1",
            type: "t3.medium",
            status: "ACTIVE",
          },
          {
            id: "100002",
            name: "Server 2",
            type: "t3.medium",
            status: "ACTIVE",
          },
        ],
        databases: [
          {
            id: "100003",
            name: "Database 1",
            type: "mysql",
            status: "ACTIVE",
          },
          {
            id: "100004",
            name: "Database 2",
            type: "mysql",
            status: "ACTIVE",
          },
        ],
        fileCabinets: [
          {
            id: "100005",
            name: "Server 1",
            type: "s3",
            status: "ACTIVE",
          },
        ],
        sanDisks: [
          {
            id: "100006",
            name: "SAN Disk 1",
            type: "ssd",
            status: "ACTIVE",
          },
        ],
        subnets: [
          {
            id: "100007",
            name: "Subnet 1",
            type: "subnet",
            status: "ACTIVE",
          },
        ],
        vpc: [
          {
            id: "100008",
            name: "VPC 1",
            type: "vpc",
            status: "ACTIVE",
          },
        ],
      },
    ],
  },
  {
    id: "100004",
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
            id: "100001",
            name: "Server 1",
            type: "t3.medium",
            status: "ACTIVE",
          },
          {
            id: "100002",
            name: "Server 2",
            type: "t3.medium",
            status: "ACTIVE",
          },
        ],
        databases: [
          {
            id: "100003",
            name: "Database 1",
            type: "mysql",
            status: "ACTIVE",
          },
          {
            id: "100004",
            name: "Database 2",
            type: "mysql",
            status: "ACTIVE",
          },
        ],
        fileCabinets: [
          {
            id: "100005",
            name: "Server 1",
            type: "s3",
            status: "ACTIVE",
          },
        ],
        sanDisks: [
          {
            id: "100006",
            name: "SAN Disk 1",
            type: "ssd",
            status: "ACTIVE",
          },
        ],
        subnets: [
          {
            id: "100007",
            name: "Subnet 1",
            type: "subnet",
            status: "ACTIVE",
          },
        ],
        vpc: [
          {
            id: "100008",
            name: "VPC 1",
            type: "vpc",
            status: "ACTIVE",
          },
        ],
      },
    ],
  },
  {
    id: "100005",
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
            id: "100001",
            name: "Server 1",
            type: "t3.medium",
            status: "ACTIVE",
          },
          {
            id: "100002",
            name: "Server 2",
            type: "t3.medium",
            status: "ACTIVE",
          },
        ],
        databases: [
          {
            id: "100003",
            name: "Database 1",
            type: "mysql",
            status: "ACTIVE",
          },
          {
            id: "100004",
            name: "Database 2",
            type: "mysql",
            status: "ACTIVE",
          },
        ],
        fileCabinets: [
          {
            id: "100005",
            name: "Server 1",
            type: "s3",
            status: "ACTIVE",
          },
        ],
        sanDisks: [
          {
            id: "100006",
            name: "SAN Disk 1",
            type: "ssd",
            status: "ACTIVE",
          },
        ],
        subnets: [
          {
            id: "100007",
            name: "Subnet 1",
            type: "subnet",
            status: "ACTIVE",
          },
        ],
        vpc: [
          {
            id: "100008",
            name: "VPC 1",
            type: "vpc",
            status: "ACTIVE",
          },
        ],
      },
    ],
  },
  {
    id: "100006",
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
            id: "100001",
            name: "Server 1",
            type: "t3.medium",
            status: "ACTIVE",
          },
          {
            id: "100002",
            name: "Server 2",
            type: "t3.medium",
            status: "ACTIVE",
          },
        ],
        databases: [
          {
            id: "100003",
            name: "Database 1",
            type: "mysql",
            status: "ACTIVE",
          },
          {
            id: "100004",
            name: "Database 2",
            type: "mysql",
            status: "ACTIVE",
          },
        ],
        fileCabinets: [
          {
            id: "100005",
            name: "Server 1",
            type: "s3",
            status: "ACTIVE",
          },
        ],
        sanDisks: [
          {
            id: "100006",
            name: "SAN Disk 1",
            type: "ssd",
            status: "ACTIVE",
          },
        ],
        subnets: [
          {
            id: "100007",
            name: "Subnet 1",
            type: "subnet",
            status: "ACTIVE",
          },
        ],
        vpc: [
          {
            id: "100008",
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
      id: "srv-00001",
      name: "Database",
      type: "t3.medium",
      status: "Running",
      ip: "10.0.1.5",
    },
    {
      id: "srv-00002",
      name: "Server",
      type: "r5.large",
      status: "Running",
      ip: "10.0.1.6",
    },
    {
      id: "srv-00003",
      name: "Web Server",
      type: "t3.small",
      status: "Running",
      ip: "10.0.1.7",
    },
  ],
  fileCabinets: [
    {
      id: "fc-00001",
      name: "User Uploads",
      size: "250GB",
      access: "Private",
    },
    {
      id: "fc-00002",
      name: "Static Assets",
      size: "120GB",
      access: "Public",
    },
  ],
  sanDisks: [
    {
      id: "san-00001",
      name: "Database Storage",
      size: "50000GB",
      type: "SSD",
      attached: "srv-00002",
    },
    {
      id: "san-00002",
      name: "Backup Storage",
      size: "1TB",
      type: "HDD",
      attached: "None",
    },
  ],
  outgoingProxies: [
    {
      id: "proxy-00001",
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
        name: "Database",
      },
      {
        id: 202,
        name: "Server",
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
        name: "Database",
      },
      {
        id: 202,
        name: "Server",
      },
    ],
  },
];

export const sitesData ={
  noOfVPCDeployed:3,
  whereDeployed: "AWS",
  parentId:"100001",
  parent:"Rubies Production Site",
  vpcDeployed:[
    {
    vpcId: "vpc-00001", 
    houseName:"Rubies House 1",
    cidrBlock: "10.0.0.0/16",
    subnet: [
      {
        id: 1,
        subnet: "Public",
        
        availabilityZone: "us-east-1a",
        resourcesDeployed: [
          {
            id: 301,
            name: "Proxy",
            instanceType: "t2.micro", 
            status: "running", 
          },
          {
            id: 102,
            name: "Server",
            instanceType: "t2.micro", // Add instance type for resources
            status: "running", // Add status of resource
          },
        ],
        routeTable: "rtb-00001",
        securityGroups: ["sg-00001", "sg-00002"], 
      },
      
      {
        id: 2,
        subnet: "Public",
        availabilityZone: "us-east-1a",
        resourcesDeployed: [
          {
            id: 111,
            name: "Server",
            instanceType: "t2.micro",
            status: "running",
          },

          {
            id: 201,
            name: "Database",
            instanceType: "t2.micro", // Add instance type for resources
            status: "running", // Add status of resource
          },
         
        ],
        routeTable: "rtb-00001", // Example route table associated with the subnet
        securityGroups: ["sg-00001", "sg-00002"], 
      },
      {
        id: 3,
        subnet: "Private",
        availabilityZone: "us-east-1a",
        resourcesDeployed: [
          {
            id: 201,
            name: "Database",
            instanceType: "t2.large",
            status: "running",
          },
          {
            id: 202,
            name: "Server",
            instanceType: "t2.medium",
            status: "stopped",
          },
        ],
        routeTable: "rtb-00003",
        securityGroups: ["sg-00004"],
      },
      {
        id: 4,
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
        routeTable: "rtb-00004",
        securityGroups: ["sg-00005"],
      },
    ],
  },
  
  
  {
    vpcId: "vpc-00201", 
    houseName:"Rubies House 2",
    cidrBlock: "10.0.0.0/16",
    id: 2,
  
    subnet: [
      {
        id: 1,
        subnet: "Public",
        availabilityZone: "us-east-1a",
        resourcesDeployed: [
          {
            id: 111,
            name: "Proxy",
            instanceType: "t2.micro", // Add instance type for resources
            status: "running", // Add status of resource
          },
        ],
        routeTable: "rtb-00001", // Example route table associated with the subnet
        securityGroups: ["sg-00001", "sg-00002"], 
      },
      {
        id: 1,
        subnet: "Public",
        availabilityZone: "us-east-1a",
        resourcesDeployed: [
          {
            id:190,
            name: "Proxy",
            instanceType: "t2.micro", // Add instance type for resources
            status: "running", // Add status of resource
          },
        ],
        routeTable: "rtb-00001", // Example route table associated with the subnet
        securityGroups: ["sg-00001", "sg-00002"], 
      },
      {
        id: 2,
        subnet: "Private",
        availabilityZone: "us-east-1a",
        resourcesDeployed: [
          {
            id: 201,
            name: "Database",
            instanceType: "t2.large",
            status: "running",
          },
          {
            id: 202,
            name: "Server",
            instanceType: "t2.medium",
            status: "stopped",
          },
        ],
        routeTable: "rtb-00003",
        securityGroups: ["sg-00004"],
      },
      {
        id: 3,
        subnet: "Private", // Changed id to 4 for consistency
        availabilityZone: "us-east-1b", // Fixed inconsistency in availability zones
        resourcesDeployed: [
          {
            id: 203,
            name: "Server",
            instanceType: "t2.xlarge",
            status: "running",
          },
        ],
        routeTable: "rtb-00004",
        securityGroups: ["sg-00005"],
      },
    ],
  },

  // {
  //   vpcId: "vpc-0201", 
   
  //   houseName:"Rubies House 3",
  //   cidrBlock: "10.0.0.0/16",
  //   id: 1,
    
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
  //       routeTable: "rtb-00001", // Example route table associated with the subnet
  //       securityGroups: ["sg-00001", "sg-00002"], 
  //     },
  //     {
  //       id: 2,
  //       subnet: "Private",
  //       availabilityZone: "us-east-1a",
  //       resourcesDeployed: [
  //         {
  //           id: 201,
  //           name: "Database",
  //           instanceType: "t2.large",
  //           status: "running",
  //         },
  //         {
  //           id: 202,
  //           name: "Server",
  //           instanceType: "t2.medium",
  //           status: "stopped",
  //         },
  //       ],
  //       routeTable: "rtb-00003",
  //       securityGroups: ["sg-00004"],
  //     },
  //     {
  //       id: 3,
  //       subnet: "Private", // Changed id to 4 for consistency
  //       availabilityZone: "us-east-1b", // Fixed inconsistency in availability zones
  //       resourcesDeployed: [
  //         {
  //           id: 203,
  //           name: "Server",
  //           instanceType: "t2.xlarge",
  //           status: "running",
  //         },
  //       ],
  //       routeTable: "rtb-00004",
  //       securityGroups: ["sg-00005"],
  //     },
  //   ],
  // },

  // {
  //   vpcId: "vpc-0202",
  //   cidrBlock: "192.168.0.0/16",
  //   houseName:"Rubies House 4",
  //   id: 32,
  //   numberOfSubnets: 2,
  //   subnet: [
  //     {
  //       id: 1,
  //       subnet: "Public",
  //       availabilityZone: "us-east-1b",
  //       resourcesDeployed: [
  //         {
  //           id: 301,
  //           name: "Proxy",
  //           instanceType: "t2.micro",
  //           status: "running",
  //         },
  //       ],
  //       routeTable: "rtb-005",
  //       securityGroups: ["sg-006"],
  //     },
  //     {
  //       id: 2,
  //       subnet: "Private",
  //       availabilityZone: "us-east-1a",
  //       resourcesDeployed: [
  //         {
  //           id: 201,
  //           name: "Database",
  //           instanceType: "t2.large",
  //           status: "running",
  //         },
  //         {
  //           id: 202,
  //           name: "Server",
  //           instanceType: "t2.medium",
  //           status: "stopped",
  //         },
  //       ],
  //       routeTable: "rtb-006",
  //       securityGroups: ["sg-007"],
  //     },
  //   ],
  // },

],
extraResources : {
  resources: [
   
    {
      name: 'R53',
      id: 1,
      type: 'Identity',
      status: 'active',
      createdAt: '2025-07-03T08:00:00Z',
      owner: 'admin',
    },
    {
      name: 'S3',
      id: 2,
      type: 'Storage',
      status: 'available',
      createdAt: '2025-07-02T15:30:00Z',
      owner: 'backup-service',
    },
    {
      name: 'CloudWatch',
      id: 3,
      type: 'Monitoring',
      status: 'enabled',
      createdAt: '2025-07-01T12:10:00Z',
      owner: 'devops',
    },
  ],
}

}

export const houseArchitectureData:HouseArchitectureData ={
  whereDeployed: "AWS",
  parentId:"100001",
  parent:"Rubies Production Site",
  vpcDeployed:
    {
    vpcId: "vpc-00001", 
    houseName:"Rubies House 1",
    cidrBlock: "10.0.0.0/16",
    subnet: [
      {
        id: 1,
        subnet: "Public",
        
        availabilityZone: "us-east-1a",
        resourcesDeployed: [
          {
            id: 181,
            name: "Proxy",
            instanceType: "t2.micro", 
            status: "running", 
          },
          {
            id: 102,
            name: "Server",
            instanceType: "t2.micro", // Add instance type for resources
            status: "running", // Add status of resource
          },
        ],
        routeTable: "rtb-00001",
        securityGroups: ["sg-00001", "sg-00002"], 
      },
      
      {
        id: 2,
        subnet: "Public",
        availabilityZone: "us-east-1a",
        resourcesDeployed: [
          {
            id: 142,
            name: "Server",
            instanceType: "t2.micro",
            status: "running",
          },

          {
            id: 111,
            name: "Database",
            instanceType: "t2.micro", // Add instance type for resources
            status: "running", // Add status of resource
          },
         
        ],
        routeTable: "rtb-00001", // Example route table associated with the subnet
        securityGroups: ["sg-00001", "sg-00002"], 
      },
      {
        id: 3,
        subnet: "Private",
        availabilityZone: "us-east-1a",
        resourcesDeployed: [
          {
            id: 201,
            name: "Database",
            instanceType: "t2.large",
            status: "running",
          },
          {
            id: 202,
            name: "Server",
            instanceType: "t2.medium",
            status: "stopped",
          },
        ],
        routeTable: "rtb-00003",
        securityGroups: ["sg-00004"],
      },
      {
        id: 4,
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
        routeTable: "rtb-00004",
        securityGroups: ["sg-00005"],
      },
    ],
  },
extraResources:{
  resources: [
   
    {
      name: 'R53',
      id: 1,
      type: 'Identity',
      status: 'active',
      createdAt: '2025-07-03T08:00:00Z',
      owner: 'admin',
    },
    {
      name: 'S3',
      id: 2,
      type: 'Storage',
      status: 'available',
      createdAt: '2025-07-02T15:30:00Z',
      owner: 'backup-service',
    },
    {
      name: 'CloudWatch',
      id: 3,
      type: 'Monitoring',
      status: 'enabled',
      createdAt: '2025-07-01T12:10:00Z',
      owner: 'devops',
    }
  ]
}}

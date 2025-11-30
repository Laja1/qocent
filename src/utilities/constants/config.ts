

export interface ServerRoomType {
  siteId: number;
  siteName: string;
  // houses: string;
  // alerts: number;
  siteProvider: string;
  siteCode: string;
  siteStatus: string;
  siteCreatedAt: string;
  // bill: number;
  // balance: number;
}



export const countryOptions = [
  { label: "Afghanistan", value: "Afghanistan" },
  { label: "Albania", value: "Albania" },
  { label: "Algeria", value: "Algeria" },
  { label: "Andorra", value: "Andorra" },
  { label: "Angola", value: "Angola" },
  { label: "Antigua and Barbuda", value: "Antigua and Barbuda" },
  { label: "Argentina", value: "Argentina" },
  { label: "Armenia", value: "Armenia" },
  { label: "Australia", value: "Australia" },
  { label: "Austria", value: "Austria" },
  { label: "Azerbaijan", value: "Azerbaijan" },
  { label: "Bahamas", value: "Bahamas" },
  { label: "Bahrain", value: "Bahrain" },
  { label: "Bangladesh", value: "Bangladesh" },
  { label: "Barbados", value: "Barbados" },
  { label: "Belarus", value: "Belarus" },
  { label: "Belgium", value: "Belgium" },
  { label: "Belize", value: "Belize" },
  { label: "Benin", value: "Benin" },
  { label: "Bhutan", value: "Bhutan" },
  { label: "Bolivia", value: "Bolivia" },
  { label: "Bosnia and Herzegovina", value: "Bosnia and Herzegovina" },
  { label: "Botswana", value: "Botswana" },
  { label: "Brazil", value: "Brazil" },
  { label: "Brunei", value: "Brunei" },
  { label: "Bulgaria", value: "Bulgaria" },
  { label: "Burkina Faso", value: "Burkina Faso" },
  { label: "Burundi", value: "Burundi" },
  { label: "Cabo Verde", value: "Cabo Verde" },
  { label: "Cambodia", value: "Cambodia" },
  { label: "Cameroon", value: "Cameroon" },
  { label: "Canada", value: "Canada" },
  { label: "Central African Republic", value: "Central African Republic" },
  { label: "Chad", value: "Chad" },
  { label: "Chile", value: "Chile" },
  { label: "China", value: "China" },
  { label: "Colombia", value: "Colombia" },
  { label: "Comoros", value: "Comoros" },
  { label: "Costa Rica", value: "Costa Rica" },
  { label: "Croatia", value: "Croatia" },
  { label: "Cuba", value: "Cuba" },
  { label: "Cyprus", value: "Cyprus" },
  { label: "Czech Republic", value: "Czech Republic" },
  { label: "Democratic Republic of the Congo", value: "Democratic Republic of the Congo" },
  { label: "Denmark", value: "Denmark" },
  { label: "Djibouti", value: "Djibouti" },
  { label: "Dominica", value: "Dominica" },
  { label: "Dominican Republic", value: "Dominican Republic" },
  { label: "Ecuador", value: "Ecuador" },
  { label: "Egypt", value: "Egypt" },
  { label: "El Salvador", value: "El Salvador" },
  { label: "Equatorial Guinea", value: "Equatorial Guinea" },
  { label: "Eritrea", value: "Eritrea" },
  { label: "Estonia", value: "Estonia" },
  { label: "Eswatini", value: "Eswatini" },
  { label: "Ethiopia", value: "Ethiopia" },
  { label: "Fiji", value: "Fiji" },
  { label: "Finland", value: "Finland" },
  { label: "France", value: "France" },
  { label: "Gabon", value: "Gabon" },
  { label: "Gambia", value: "Gambia" },
  { label: "Georgia", value: "Georgia" },
  { label: "Germany", value: "Germany" },
  { label: "Ghana", value: "Ghana" },
  { label: "Greece", value: "Greece" },
  { label: "Grenada", value: "Grenada" },
  { label: "Guatemala", value: "Guatemala" },
  { label: "Guinea", value: "Guinea" },
  { label: "Guinea-Bissau", value: "Guinea-Bissau" },
  { label: "Guyana", value: "Guyana" },
  { label: "Haiti", value: "Haiti" },
  { label: "Honduras", value: "Honduras" },
  { label: "Hungary", value: "Hungary" },
  { label: "Iceland", value: "Iceland" },
  { label: "India", value: "India" },
  { label: "Indonesia", value: "Indonesia" },
  { label: "Iran", value: "Iran" },
  { label: "Iraq", value: "Iraq" },
  { label: "Ireland", value: "Ireland" },
  { label: "Israel", value: "Israel" },
  { label: "Italy", value: "Italy" },
  { label: "Jamaica", value: "Jamaica" },
  { label: "Japan", value: "Japan" },
  { label: "Jordan", value: "Jordan" },
  { label: "Kazakhstan", value: "Kazakhstan" },
  { label: "Kenya", value: "Kenya" },
  { label: "Kiribati", value: "Kiribati" },
  { label: "Kuwait", value: "Kuwait" },
  { label: "Kyrgyzstan", value: "Kyrgyzstan" },
  { label: "Laos", value: "Laos" },
  { label: "Latvia", value: "Latvia" },
  { label: "Lebanon", value: "Lebanon" },
  { label: "Lesotho", value: "Lesotho" },
  { label: "Liberia", value: "Liberia" },
  { label: "Libya", value: "Libya" },
  { label: "Liechtenstein", value: "Liechtenstein" },
  { label: "Lithuania", value: "Lithuania" },
  { label: "Luxembourg", value: "Luxembourg" },
  { label: "Madagascar", value: "Madagascar" },
  { label: "Malawi", value: "Malawi" },
  { label: "Malaysia", value: "Malaysia" },
  { label: "Maldives", value: "Maldives" },
  { label: "Mali", value: "Mali" },
  { label: "Malta", value: "Malta" },
  { label: "Marshall Islands", value: "Marshall Islands" },
  { label: "Mauritania", value: "Mauritania" },
  { label: "Mauritius", value: "Mauritius" },
  { label: "Mexico", value: "Mexico" },
  { label: "Micronesia", value: "Micronesia" },
  { label: "Moldova", value: "Moldova" },
  { label: "Monaco", value: "Monaco" },
  { label: "Mongolia", value: "Mongolia" },
  { label: "Montenegro", value: "Montenegro" },
  { label: "Morocco", value: "Morocco" },
  { label: "Mozambique", value: "Mozambique" },
  { label: "Myanmar", value: "Myanmar" },
  { label: "Namibia", value: "Namibia" },
  { label: "Nauru", value: "Nauru" },
  { label: "Nepal", value: "Nepal" },
  { label: "Netherlands", value: "Netherlands" },
  { label: "New Zealand", value: "New Zealand" },
  { label: "Nicaragua", value: "Nicaragua" },
  { label: "Niger", value: "Niger" },
  { label: "Nigeria", value: "Nigeria" },
  { label: "North Korea", value: "North Korea" },
  { label: "North Macedonia", value: "North Macedonia" },
  { label: "Norway", value: "Norway" },
  { label: "Oman", value: "Oman" },
  { label: "Pakistan", value: "Pakistan" },
  { label: "Palau", value: "Palau" },
  { label: "Panama", value: "Panama" },
  { label: "Papua New Guinea", value: "Papua New Guinea" },
  { label: "Paraguay", value: "Paraguay" },
  { label: "Peru", value: "Peru" },
  { label: "Philippines", value: "Philippines" },
  { label: "Poland", value: "Poland" },
  { label: "Portugal", value: "Portugal" },
  { label: "Qatar", value: "Qatar" },
  { label: "Republic of the Congo", value: "Republic of the Congo" },
  { label: "Romania", value: "Romania" },
  { label: "Russia", value: "Russia" },
  { label: "Rwanda", value: "Rwanda" },
  { label: "Saint Kitts and Nevis", value: "Saint Kitts and Nevis" },
  { label: "Saint Lucia", value: "Saint Lucia" },
  { label: "Saint Vincent and the Grenadines", value: "Saint Vincent and the Grenadines" },
  { label: "Samoa", value: "Samoa" },
  { label: "San Marino", value: "San Marino" },
  { label: "Sao Tome and Principe", value: "Sao Tome and Principe" },
  { label: "Saudi Arabia", value: "Saudi Arabia" },
  { label: "Senegal", value: "Senegal" },
  { label: "Serbia", value: "Serbia" },
  { label: "Seychelles", value: "Seychelles" },
  { label: "Sierra Leone", value: "Sierra Leone" },
  { label: "Singapore", value: "Singapore" },
  { label: "Slovakia", value: "Slovakia" },
  { label: "Slovenia", value: "Slovenia" },
  { label: "Solomon Islands", value: "Solomon Islands" },
  { label: "Somalia", value: "Somalia" },
  { label: "South Africa", value: "South Africa" },
  { label: "South Korea", value: "South Korea" },
  { label: "South Sudan", value: "South Sudan" },
  { label: "Spain", value: "Spain" },
  { label: "Sri Lanka", value: "Sri Lanka" },
  { label: "Sudan", value: "Sudan" },
  { label: "Suriname", value: "Suriname" },
  { label: "Sweden", value: "Sweden" },
  { label: "Switzerland", value: "Switzerland" },
  { label: "Syria", value: "Syria" },
  { label: "Taiwan", value: "Taiwan" },
  { label: "Tajikistan", value: "Tajikistan" },
  { label: "Tanzania", value: "Tanzania" },
  { label: "Thailand", value: "Thailand" },
  { label: "Timor-Leste", value: "Timor-Leste" },
  { label: "Togo", value: "Togo" },
  { label: "Tonga", value: "Tonga" },
  { label: "Trinidad and Tobago", value: "Trinidad and Tobago" },
  { label: "Tunisia", value: "Tunisia" },
  { label: "Turkey", value: "Turkey" },
  { label: "Turkmenistan", value: "Turkmenistan" },
  { label: "Tuvalu", value: "Tuvalu" },
  { label: "Uganda", value: "Uganda" },
  { label: "Ukraine", value: "Ukraine" },
  { label: "United Arab Emirates", value: "United Arab Emirates" },
  { label: "United Kingdom", value: "United Kingdom" },
  { label: "United States of America", value: "United States of America" },
  { label: "Uruguay", value: "Uruguay" },
  { label: "Uzbekistan", value: "Uzbekistan" },
  { label: "Vanuatu", value: "Vanuatu" },
  { label: "Vatican City", value: "Vatican City" },
  { label: "Venezuela", value: "Venezuela" },
  { label: "Vietnam", value: "Vietnam" },
  { label: "Yemen", value: "Yemen" },
  { label: "Zambia", value: "Zambia" },
  { label: "Zimbabwe", value: "Zimbabwe" }
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

export const houseArchitectureData ={
  // whereDeployed: "AWS",
  // parentId:"100001",
  // parent:"Rubies Production Site",
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


export const dataFlowData = [
  { id: "server-1", resourceType: "Server Rooms", connectedTo: ["proxy-1"] },
  { id: "proxy-1", resourceType: "Proxy", connectedTo: ["s3-1"] },
  { id: "s3-1", resourceType: "S3" },
  { id: "igw-1", resourceType: "IGW", connectedTo: ["s3-1"] },
  { id: "api-1", resourceType: "API", connectedTo: ["s3-1"] },
  { id: "r53-1", resourceType: "API", connectedTo: ["s3-1"] },
  { id: "r53-2", resourceType: "API", connectedTo: ["s3-1"] },
  { id: "r53-9", resourceType: "API", connectedTo: ["s3-1"] },
  { id: "r53-10", resourceType: "API", connectedTo: ["s3-1"] },

  { id: "r53-3", resourceType: "API", connectedTo: ["s3-1"] },
  { id: "r53-4", resourceType: "API", connectedTo: ["s3-1"] }, 
   { id: "r53-5", resourceType: "API", connectedTo: ["r53-1"] },
   { id: "r53-6", resourceType: "IGW", connectedTo: ["r53-3"] },

];


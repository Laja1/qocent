export const backendResponse = {
  data: [
    {
      fieldName: "Resource Type",
      fieldInputType: "dropdown",
      fieldDescription: "Select a top-level AWS service to configure (e.g., Compute, Storage, Networking, Database).",
      fieldDropdowns: [
        {
          dropdownName: "Compute",
          dropdownValue: "compute",
          nestedFields: [
            {
              fieldName: "Select Compute Type",
              fieldInputType: "dropdown",
              fieldDescription: "Choose a specific compute service like EC2 or Lambda.",
              fieldDropdowns: [
                {
                  dropdownName: "EC2",
                  dropdownValue: "ec2",
                  nestedFields: [
                    {
                      fieldName: "Instance Type",
                      fieldInputType: "dropdown",
                      fieldDescription: "Select the EC2 instance type to launch.",
                      fieldDropdowns: [
                        { dropdownName: "t2.micro", dropdownValue: "t2.micro" },
                        { dropdownName: "t2.medium", dropdownValue: "t2.medium" },
                        { dropdownName: "t2.large", dropdownValue: "t2.large" },
                      ],
                    },
                    {
                      fieldName: "Key Pair Name",
                      fieldInputType: "text",
                      fieldDescription: "Enter the name of the EC2 key pair for SSH access.",
                      fieldDropdowns: [],
                    },
                  ],
                },
                {
                  dropdownName: "Lambda",
                  dropdownValue: "lambda",
                  nestedFields: [
                    {
                      fieldName: "Memory Size",
                      fieldInputType: "dropdown",
                      fieldDescription: "Select the memory allocation for the Lambda function.",
                      fieldDropdowns: [
                        { dropdownName: "128 MB", dropdownValue: "128" },
                        { dropdownName: "256 MB", dropdownValue: "256" },
                        { dropdownName: "512 MB", dropdownValue: "512" },
                      ],
                    },
                    {
                      fieldName: "Timeout",
                      fieldInputType: "number",
                      fieldDescription: "Set the Lambda function execution timeout (in seconds).",
                      fieldDropdowns: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          dropdownName: "Storage",
          dropdownValue: "storage",
          nestedFields: [
            {
              fieldName: "Select Storage Type",
              fieldInputType: "dropdown",
              fieldDescription: "Choose between S3 and EBS for storage services.",
              fieldDropdowns: [
                {
                  dropdownName: "S3",
                  dropdownValue: "s3",
                  nestedFields: [
                    {
                      fieldName: "Bucket Name",
                      fieldInputType: "text",
                      fieldDescription: "Provide a unique name for your S3 bucket.",
                      fieldDropdowns: [],
                    },
                    {
                      fieldName: "Region",
                      fieldInputType: "dropdown",
                      fieldDescription: "Select the AWS region for the S3 bucket.",
                      fieldDropdowns: [
                        { dropdownName: "US-East-1", dropdownValue: "us-east-1" },
                        { dropdownName: "EU-West-1", dropdownValue: "eu-west-1" },
                        { dropdownName: "AP-South-1", dropdownValue: "ap-south-1" },
                      ],
                    },
                  ],
                },
                {
                  dropdownName: "EBS",
                  dropdownValue: "ebs",
                  nestedFields: [
                    {
                      fieldName: "Volume Size",
                      fieldInputType: "number",
                      fieldDescription: "Specify the size (in GB) of the EBS volume.",
                      fieldDropdowns: [],
                    },
                    {
                      fieldName: "Volume Type",
                      fieldInputType: "dropdown",
                      fieldDescription: "Choose the performance type for the EBS volume.",
                      fieldDropdowns: [
                        { dropdownName: "gp2", dropdownValue: "gp2" },
                        { dropdownName: "io1", dropdownValue: "io1" },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          dropdownName: "Networking",
          dropdownValue: "networking",
          nestedFields: [
            {
              fieldName: "Select Networking Resource",
              fieldInputType: "dropdown",
              fieldDescription: "Choose a networking service like VPC or Route Tables.",
              fieldDropdowns: [
                {
                  dropdownName: "VPC",
                  dropdownValue: "vpc",
                  nestedFields: [
                    {
                      fieldName: "VPC CIDR Block",
                      fieldInputType: "text",
                      fieldDescription: "Enter the CIDR block (e.g., 10.0.0.0/16) for the VPC.",
                      fieldDropdowns: [],
                    },
                    {
                      fieldName: "Enable DNS Support",
                      fieldInputType: "dropdown",
                      fieldDescription: "Enable or disable DNS support within the VPC.",
                      fieldDropdowns: [
                        { dropdownName: "Yes", dropdownValue: "yes" },
                        { dropdownName: "No", dropdownValue: "no" },
                      ],
                    },
                  ],
                },
                {
                  dropdownName: "Route Tables",
                  dropdownValue: "routeTables",
                  nestedFields: [
                    {
                      fieldName: "Route Table Name",
                      fieldInputType: "text",
                      fieldDescription: "Provide a name for the route table.",
                      fieldDropdowns: [],
                    },
                    {
                      fieldName: "Associations",
                      fieldInputType: "dropdown",
                      fieldDescription: "Select what to associate with this route table.",
                      fieldDropdowns: [
                        { dropdownName: "Subnets", dropdownValue: "subnets" },
                        { dropdownName: "Internet Gateway", dropdownValue: "internetGateway" },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          dropdownName: "Database",
          dropdownValue: "database",
          nestedFields: [
            {
              fieldName: "Select Database Engine",
              fieldInputType: "dropdown",
              fieldDescription: "Choose between managed database services like RDS or DynamoDB.",
              fieldDropdowns: [
                {
                  dropdownName: "RDS",
                  dropdownValue: "rds",
                  nestedFields: [
                    {
                      fieldName: "Database Engine Type",
                      fieldInputType: "dropdown",
                      fieldDescription: "Choose the type of database engine (e.g., MySQL, PostgreSQL).",
                      fieldDropdowns: [
                        { dropdownName: "MySQL", dropdownValue: "mysql" },
                        { dropdownName: "PostgreSQL", dropdownValue: "postgresql" },
                        { dropdownName: "MariaDB", dropdownValue: "mariadb" },
                      ],
                    },
                    {
                      fieldName: "Instance Class",
                      fieldInputType: "dropdown",
                      fieldDescription: "Select the hardware class for your RDS instance.",
                      fieldDropdowns: [
                        { dropdownName: "db.t3.micro", dropdownValue: "db.t3.micro" },
                        { dropdownName: "db.m5.large", dropdownValue: "db.m5.large" },
                      ],
                    },
                  ],
                },
                {
                  dropdownName: "DynamoDB",
                  dropdownValue: "dynamodb",
                  nestedFields: [
                    {
                      fieldName: "Table Name",
                      fieldInputType: "text",
                      fieldDescription: "Name the DynamoDB table.",
                      fieldDropdowns: [],
                    },
                    {
                      fieldName: "Provisioned Throughput",
                      fieldInputType: "dropdown",
                      fieldDescription: "Choose between on-demand or provisioned throughput settings.",
                      fieldDropdowns: [
                        { dropdownName: "On-demand", dropdownValue: "on-demand" },
                        { dropdownName: "Provisioned", dropdownValue: "provisioned" },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

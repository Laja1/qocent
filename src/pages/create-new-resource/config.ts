export const backendResponse = {
  data: [
    {
      fieldName: "Choose AWS Resource",
      fieldInputType: "dropdown",
      fieldDropdowns: [
        {
          dropdownName: "Compute",
          dropdownValue: "compute",
          nestedFields: [
            {
              fieldName: "Select Compute Type",
              fieldInputType: "dropdown",
              fieldDropdowns: [
                {
                  dropdownName: "EC2",
                  dropdownValue: "ec2",
                  nestedFields: [
                    {
                      fieldName: "Instance Type",
                      fieldInputType: "dropdown",
                      fieldDropdowns: [
                        { dropdownName: "t2.micro", dropdownValue: "t2.micro" },
                        {
                          dropdownName: "t2.medium",
                          dropdownValue: "t2.medium",
                        },
                        { dropdownName: "t2.large", dropdownValue: "t2.large" },
                      ],
                    },
                    {
                      fieldName: "Key Pair Name",
                      fieldInputType: "text",
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
                      fieldDropdowns: [
                        { dropdownName: "128 MB", dropdownValue: "128" },
                        { dropdownName: "256 MB", dropdownValue: "256" },
                        { dropdownName: "512 MB", dropdownValue: "512" },
                      ],
                    },
                    {
                      fieldName: "Timeout",
                      fieldInputType: "number",
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
              fieldDropdowns: [
                {
                  dropdownName: "S3",
                  dropdownValue: "s3",
                  nestedFields: [
                    {
                      fieldName: "Bucket Name",
                      fieldInputType: "text",
                      fieldDropdowns: [],
                    },
                    {
                      fieldName: "Region",
                      fieldInputType: "dropdown",
                      fieldDropdowns: [
                        {
                          dropdownName: "US-East-1",
                          dropdownValue: "us-east-1",
                        },
                        {
                          dropdownName: "EU-West-1",
                          dropdownValue: "eu-west-1",
                        },
                        {
                          dropdownName: "AP-South-1",
                          dropdownValue: "ap-south-1",
                        },
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
                      fieldDropdowns: [],
                    },
                    {
                      fieldName: "Volume Type",
                      fieldInputType: "dropdown",
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
              fieldDropdowns: [
                {
                  dropdownName: "VPC",
                  dropdownValue: "vpc",
                  nestedFields: [
                    {
                      fieldName: "VPC CIDR Block",
                      fieldInputType: "text",
                      fieldDropdowns: [],
                    },
                    {
                      fieldName: "Enable DNS Support",
                      fieldInputType: "dropdown",
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
                      fieldDropdowns: [],
                    },
                    {
                      fieldName: "Associations",
                      fieldInputType: "dropdown",
                      fieldDropdowns: [
                        { dropdownName: "Subnets", dropdownValue: "subnets" },
                        {
                          dropdownName: "Internet Gateway",
                          dropdownValue: "internetGateway",
                        },
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
              fieldDropdowns: [
                {
                  dropdownName: "RDS",
                  dropdownValue: "rds",
                  nestedFields: [
                    {
                      fieldName: "Database Engine Type",
                      fieldInputType: "dropdown",
                      fieldDropdowns: [
                        { dropdownName: "MySQL", dropdownValue: "mysql" },
                        {
                          dropdownName: "PostgreSQL",
                          dropdownValue: "postgresql",
                        },
                        { dropdownName: "MariaDB", dropdownValue: "mariadb" },
                      ],
                    },
                    {
                      fieldName: "Instance Class",
                      fieldInputType: "dropdown",
                      fieldDropdowns: [
                        {
                          dropdownName: "db.t3.micro",
                          dropdownValue: "db.t3.micro",
                        },
                        {
                          dropdownName: "db.m5.large",
                          dropdownValue: "db.m5.large",
                        },
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
                      fieldDropdowns: [],
                    },
                    {
                      fieldName: "Provisioned Throughput",
                      fieldInputType: "dropdown",
                      fieldDropdowns: [
                        {
                          dropdownName: "On-demand",
                          dropdownValue: "on-demand",
                        },
                        {
                          dropdownName: "Provisioned",
                          dropdownValue: "provisioned",
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
    },
  ],
};

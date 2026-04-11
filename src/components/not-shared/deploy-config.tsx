import { FEATURE_SERVER_HOUSE_AND_ROOM } from "@/config/productFeatures";

const allResourceTypeOptions = [
  { label: "Compute", value: "compute" },
  { label: "Networking", value: "networking" },
  { label: "Storage", value: "storage" },
  { label: "Database", value: "database" },
  { label: "Cache", value: "cache" },
  { label: "Security", value: "security" },
  { label: "Monitoring", value: "monitoring" },
  { label: "Server Room", value: "serverRoom" },
  { label: "Server House", value: "serverHouse" },
  { label: "Server Site", value: "serverSite" },
];

export const resourceTypeOptions = FEATURE_SERVER_HOUSE_AND_ROOM
  ? allResourceTypeOptions
  : allResourceTypeOptions.filter(
      (o) => o.value !== "serverRoom" && o.value !== "serverHouse"
    );

export const resourceSiteCodeOptions = [
  { label: "Rubies Production Site A", value: "rubies-site-a" },
  { label: "Rubies Production Site B", value: "rubies-site-b" },
  { label: "Rubies Production Site C", value: "rubies-site-c" },
];

export const providerOptions = [
  { label: `AWS`, value: "aws" },
  { label: "Huawei", value: "huawei" },
];

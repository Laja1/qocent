import type { level1CostTableType, secutiyAnalysisType, } from "./type";







export const securityAnalysisData: secutiyAnalysisType[] = [
  {
    id: "101",
    category: "IAM",
    type: "Configuration",
    description: "Root user has active access keys that have not been rotated in over 90 days.",
    recommendation: "Delete or rotate root access keys and enforce MFA on the root account.",
    risk: "High",
  },
  {
    id: "102",
    category: "Data Protection",
    type: "Configuration",
    description: "S3 buckets are publicly accessible.",
    recommendation: "Update bucket policies to restrict public access and enable S3 Block Public Access.",
    risk: "High",
  },
  {
    id: "103",
    category: "Infrastructure Security",
    type: "Configuration",
    description: "Security groups allow unrestricted SSH access (0.0.0.0/0) to EC2 instances.",
    recommendation: "Restrict SSH access to trusted IP ranges only.",
    risk: "Medium",
  },
  {
    id: "104",
    category: "Application Security",
    type: "Best Practices",
    description: "Application endpoints lack rate limiting or throttling mechanisms.",
    recommendation: "Implement API throttling and DDoS protection using WAF or API Gateway.",
    risk: "Medium",
  },
  {
    id: "105",
    category: "Monitoring & Observability",
    type: "Configuration",
    description: "CloudTrail is not enabled in all regions.",
    recommendation: "Enable CloudTrail in all regions to ensure auditability of user actions.",
    risk: "Low",
  },
  {
    id: "106",
    category: "IAM",
    type: "Recommendation",
    description: "All IAM roles use AWS managed policies instead of custom scoped ones.",
    recommendation: "Create least privilege custom policies for better access control.",
    risk: "Medium",
  },
  {
    id: "107",
    category: "Data Protection",
    type: "Recommendation",
    description: "RDS snapshots are not encrypted.",
    recommendation: "Enable encryption on RDS snapshots and automate snapshot creation.",
    risk: "High",
  },
  {
    id: "108",
    category: "Monitoring & Observability",
    type: "Configuration",
    description: "No alarm thresholds set on critical metrics like CPU and memory usage.",
    recommendation: "Set CloudWatch alarms to proactively respond to resource stress.",
    risk: "Low",
  },
  {
    id: "109",
    category: "Application Security",
    type: "Configuration",
    description: "Web application does not use HTTPS.",
    recommendation: "Enforce HTTPS using load balancer listener rules or ACM certificates.",
    risk: "High",
  },
  {
    id: "110",
    category: "Infrastructure Security",
    type: "Recommendation",
    description: "No bastion host configured for production VPC.",
    recommendation: "Use a bastion host with logging and restricted access for better SSH security.",
    risk: "Medium",
  }
];

// Data definitions
export const allcategories: level1CostTableType = {
  id: "104",
  type: "All Resources",
  costs: {
    January: 2000,
    February: 2500,
    March: 100,
    April: 2200,
    May: 1900,
    June: 1200,
    July: 1500,
    August: 1600,
    September: 1700,
    October: 2100,
    November: 1950,
    December: 2300,
  },
};

export const categories: level1CostTableType[] = [
  {
    id: "104",
    type: "Compute",
    costs: {
      January: 2500,
      February: 2500,
      March: 1660,
      April: 2200,
      May: 1900,
      June: 1200,
      July: 1500,
      August: 1600,
      September: 1700,
      October: 2100,
      November: 1950,
      December: 2300,
    },
  },
  {
    id: "105",
    type: "Server",
    costs: {
      January: 2600,
      February: 2000,
      March: 100,
      April: 2200,
      May: 1200,
      June: 1200,
      July: 1500,
      August: 1600,
      September: 2700,
      October: 2100,
      November: 1950,
      December: 2300,
    },
  },
  {
    id: "106",
    type: "Networking",
    costs: {
      January: 2000,
      February: 1500,
      March: 1080,
      April: 2200,
      May: 2900,
      June: 1200,
      July: 1200,
      August: 1600,
      September: 1700,
      October: 1100,
      November: 1550,
      December: 2300,
    },
  },
  {
    id: "107",
    type: "Security",
    costs: {
      January: 2000,
      February: 1500,
      March: 1080,
      April: 1200,
      May: 2200,
      June: 1100,
      July: 1500,
      August: 1000,
      September: 1000,
      October: 1100,
      November: 1050,
      December: 1000,
    },
  },
];

export const allMonths = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];
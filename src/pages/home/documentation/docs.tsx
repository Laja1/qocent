import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Users,
  Network,
  Server,
  Terminal,
  Database,
  Shield,
  Globe,
  Zap,
} from "lucide-react";

const Developers = () => {
  const steps = [
    {
      number: "1",
      title: "Create Server Site",
      subtitle: "Your Cloud Account",
      icon: Users,
      description:
        "Sign up and create your Qocent account - your Server Site. This is your main cloud account that contains all your cloud resources.",

      details: [
        "Create your main cloud account",
        "Set up billing and payment methods",
        "Configure organization settings",
        "Invite team members and set permissions",
        "Access the Qocent Console dashboard",
      ],
    },
    {
      number: "2",
      title: "Setup Server House",
      subtitle: "Virtual Private Cloud (VPC)",
      icon: Network,
      description:
        "Create your isolated network environment - a Server House (VPC). This provides network isolation and security for your resources.",

      details: [
        "Create isolated network environment",
        "Configure CIDR blocks and IP ranges",
        "Set up internet gateways",
        "Configure route tables",
        "Enable DNS resolution and hostnames",
      ],
    },
    {
      number: "3",
      title: "Create Server Room",
      subtitle: "Subnet Configuration",
      icon: Globe,
      description:
        "Set up Server Rooms (subnets) within your Server House. These provide further network segmentation for different tiers of your application.",

      details: [
        "Create public and private subnets",
        "Configure availability zones",
        "Set up network ACLs",
        "Configure routing rules",
        "Enable auto-assign public IPs if needed",
      ],
    },
    {
      number: "4",
      title: "Deploy Resources",
      subtitle: "Launch Your Infrastructure",
      icon: Server,
      description:
        "Now deploy your compute instances, databases, and other resources within your Server Rooms. Start building your application infrastructure.",

      details: [
        "Launch compute instances",
        "Set up databases and storage",
        "Configure security groups",
        "Attach load balancers",
        "Monitor and scale resources",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-24 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Getting Started Guide
            </h1>
            <p className="text-sm text-muted-foreground mb-8 max-w-3xl mx-auto">
              Follow these steps to set up your cloud infrastructure
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="default" size="default">
                <Terminal className="h-5 w-5 mr-2" />
                Quick Start
              </Button>
            </div>
          </div>

          {/* Architecture Overview */}
          <div className="bg-cloud-surface-elevated rounded-lg shadow-soft p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              Qocent Infrastructure Hierarchy
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="h-8 w-8 text-black" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  Server Site
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your cloud account
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Network className="h-8 w-8 text-black" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  Server House
                </h3>
                <p className="text-sm text-muted-foreground">VPC environment</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Globe className="h-8 w-8 text-black" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  Server Room
                </h3>
                <p className="text-sm text-muted-foreground">Network subnet</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Server className="h-8 w-8 text-black" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  Resources
                </h3>
                <p className="text-sm text-muted-foreground">
                  Compute, storage, etc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Steps */}
      <section className="">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 h-full gap-8 items-center">
            {steps.map((step) => (
              <div
                className={`border bg-gray-100 h-full rounded-md text-center`}
                key={step.number}
              >
                <div className="flex items-center justify-between bg-gradient-to-br from-black to-gray-900 rounded-t-md text-white space-x-4 mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-primary  rounded-lg flex items-center justify-center">
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-base font-bold  text-white  ">
                      {step.title}
                    </h3>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs text-white  mr-1 rounded-full font-medium"
                  >
                    {step.number}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm text-left m-5">
                  {step.description}
                </p>
                <ul className="space-y-2 m-5">
                  {step.details.map((detail, detailIndex) => (
                    <li
                      key={detailIndex}
                      className="flex items-center text-xs space-x-2"
                    >
                      <div className="w-2 h-2 rounded-full bg-black"></div>
                      <span className="text-xs text-muted-foreground">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="bg-gradient-primary py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Help Getting Started?
          </h2>
          <p className="text-sm mb-8 max-w-2xl mx-auto">
            Our support team is here to help you succeed. Get expert guidance
            and technical assistance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              variant="outline"
              size="default"
              className="bg-primary-foreground text-cloud-primary border-primary-foreground hover:bg-primary-foreground/90"
            >
              <Shield className="h-5 w-5 mr-2" />
              Contact Support
            </Button>
            <Button
              variant="outline"
              size="default"
              className="  hover:bg-primary-foreground hover:text-cloud-primary"
            >
              <Database className="h-5 w-5 mr-2" />
              View Examples
            </Button>
            <Button
              variant="outline"
              size="default"
              className=" hover:bg-primary-foreground hover:text-cloud-primary"
            >
              <Zap className="h-5 w-5 mr-2" />
              Join Community
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Developers;

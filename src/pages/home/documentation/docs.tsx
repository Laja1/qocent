import { Users, Network, Server, Terminal, Globe } from "lucide-react";

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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r  py-24 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Getting Started Guide
            </h1>
            <p className="text-lg text-black mb-8 max-w-3xl mx-auto">
              Follow these steps to set up your cloud infrastructure
            </p>
            <div className="flex justify-center space-x-4">
              <button className=" text-black px-6 py-3 rounded-lg font-semibold      transition-colors flex items-center">
                <Terminal className="h-5 w-5 mr-2" />
                Quick Start
              </button>
            </div>
          </div>

          {/* Architecture Overview */}
          <div className=" bg-opacity-10 backdrop-blur-sm rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Qocent Infrastructure Hierarchy
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Server Site</h3>
                <p className="text-sm text-black">Your cloud account</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Network className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Server House</h3>
                <p className="text-sm text-black">VPC environment</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Server Room</h3>
                <p className="text-sm text-black">Network subnet</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Server className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Resources</h3>
                <p className="text-sm text-black">Compute, storage, etc.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Steps */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                key={step.number}
              >
                <div className="flex items-center justify-between bg-black rounded-t-lg text-white p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12  rounded-lg flex items-center justify-center">
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{step.title}</h3>
                      <p className="text-sm text-gray-300">{step.subtitle}</p>
                    </div>
                  </div>
                  <span className=" text-white px-3 py-1 rounded-full text-sm font-medium">
                    {step.number}
                  </span>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4">
                    {step.description}
                  </p>

                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li
                        key={detailIndex}
                        className="flex items-start text-sm space-x-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      {/* <section className="bg-gradient-to-r bg-gray-300 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Need Help Getting Started?
          </h2>
          <p className="text-lg text-black mb-8 max-w-2xl mx-auto">
            Our support team is here to help you succeed. Get expert guidance
            and technical assistance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
              <Shield className="size-4 mr-2" />
              Contact Support
            </button>
            <button className="border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center">
              <Database className="size-4 mr-2" />
              View Examples
            </button>
            <button className="border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center">
              <Zap className="size-4 mr-2" />
              Join Community
            </button>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Developers;

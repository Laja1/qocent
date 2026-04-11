const DocsOverview = () => {
  return (
    <article className="space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">Overview</h1>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-800">What is Qocent?</h2>
        <p className="text-gray-600 leading-relaxed">
          Qocent is a unified cloud management platform that enables you to deploy, manage, and
          optimize your infrastructure across cloud providers including AWS, GCP, Huawei Cloud, and
          more — all from a single, powerful console that delivers speed, savings, and simplicity.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Key Features</h2>
        <ul className="space-y-2">
          {[
            "Multi-cloud deployment automation",
            "Real-time cost monitoring and optimization",
            "Unified resource management dashboard",
            "Performance analytics and reporting",
            "Infrastructure orchestration",
            "Automated scaling and load balancing",
            "Security and compliance monitoring",
          ].map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-gray-600 text-sm">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Supported Cloud Providers</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Qocent works seamlessly with industry-leading platforms to give you maximum flexibility.
          Currently supported:
        </p>
        <ul className="space-y-1">
          {[
            { name: "AWS", available: true },
            { name: "Huawei", available: true },
            { name: "Azure", available: false },
            { name: "GCP", available: false },
          ].map((provider) => (
            <li key={provider.name} className="flex items-center gap-3 text-sm">
              <span
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  provider.available ? "bg-red-600" : "bg-gray-300"
                }`}
              />
              <span className={provider.available ? "text-gray-700" : "text-gray-400"}>
                {provider.name}
                {!provider.available && " — coming soon"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Core Value Propositions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            "Multi-cloud flexibility",
            "Simplicity",
            "Transparent pricing",
            "Global reach",
            "Developer-centric",
          ].map((value) => (
            <div
              key={value}
              className="border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50"
            >
              {value}
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2 border-l-2 border-red-500 pl-4">
          <h2 className="text-base font-semibold text-gray-800">Mission</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            To simplify access to cloud technology by delivering a user-friendly, affordable,
            multi-cloud, and reliable platform built on world-class infrastructure — empowering
            businesses of all sizes, especially in emerging markets, through transparent pricing,
            responsive support, and seamless digital experiences.
          </p>
        </div>
        <div className="space-y-2 border-l-2 border-gray-300 pl-4">
          <h2 className="text-base font-semibold text-gray-800">Vision</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            To become a global leader in cloud services by providing the most accessible,
            easy-to-use, multi-cloud, and cost-effective platform that helps organizations unlock
            the full potential of technology.
          </p>
        </div>
      </div>
    </article>
  );
};

export default DocsOverview;

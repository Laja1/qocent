const DocsTerminologies = () => {
  return (
    <article className="space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">Terminologies</h1>
      <p className="text-gray-600 leading-relaxed">
        To help you get the most out of Qocent, here is a glossary of key terms you will encounter
        as you use the platform.
      </p>

      {/* Infrastructure */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Infrastructure
        </p>
        {[
          {
            term: "Server Site",
            definition:
              "Your primary Qocent account. The central hub for all your cloud resources, team members, and organisational settings. When you sign up for Qocent, you are creating your Server Site.",
          },
          {
            term: "Server House",
            definition:
              "Your isolated network environment in Qocent, equivalent to a VPC. A private, secure network space where your resources operate independently, with complete control over IP addressing and routing.",
          },
          {
            term: "Server Room",
            definition:
              "A subnet created within your Server House for additional network segmentation. Allows you to separate web servers, application logic, and databases into distinct network zones with tailored security and routing.",
          },
          {
            term: "Resources",
            definition:
              "The actual cloud infrastructure components you deploy within your Server Rooms: compute instances, databases, storage volumes, and load balancers. The building blocks of your application infrastructure.",
          },
          {
            term: "Workspaces",
            definition:
              "Logical groupings that help you organise multiple cloud provider accounts within Qocent.",
          },
        ].map(({ term, definition }) => (
          <div key={term} className="border border-gray-200 rounded-lg px-5 py-4 bg-white space-y-1">
            <p className="text-sm font-semibold text-gray-900">{term}</p>
            <p className="text-sm text-gray-600 leading-relaxed">{definition}</p>
          </div>
        ))}
      </div>

      {/* Identifiers */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Identifiers
        </p>
        {[
          { term: "Site Code", definition: "A unique identifier for a Server Site." },
          { term: "House Code", definition: "A unique identifier for a Server House." },
          { term: "Room Code", definition: "A unique identifier for a Server Room." },
        ].map(({ term, definition }) => (
          <div key={term} className="border border-gray-200 rounded-lg px-5 py-4 bg-white space-y-1">
            <p className="text-sm font-semibold text-gray-900">{term}</p>
            <p className="text-sm text-gray-600 leading-relaxed">{definition}</p>
          </div>
        ))}
      </div>

      {/* Configuration & Lifecycle */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Configuration &amp; Lifecycle
        </p>

        <div className="border border-gray-200 rounded-lg px-5 py-4 bg-white space-y-1">
          <p className="text-sm font-semibold text-gray-900">Site Expiry Date</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            A user-defined date that marks the end of a Server Site's active lifecycle. Once
            reached, the configured Site EOL Action is automatically triggered.
          </p>
        </div>

        <div className="border border-gray-200 rounded-lg px-5 py-4 bg-white space-y-3">
          <p className="text-sm font-semibold text-gray-900">Site EOL Action</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Defines what happens to your Server Site after it expires. Options:
          </p>
          <ul className="space-y-2 pl-1">
            {[
              { name: "Rollover", desc: "Extends the expiry date automatically, keeping the Server Site active for another cycle." },
              { name: "Suspend", desc: "Pauses the site; resources remain intact but inactive until manually reactivated." },
              { name: "Email", desc: "Sends an expiry notification to administrators without affecting the Server Site." },
              { name: "Lambda Trigger", desc: "Executes a custom serverless function when expiration occurs — enabling automated workflows like data backups, resource cleanup, or external integrations." },
              { name: "Deactivate", desc: "Permanently terminates the Server Site and deletes all resources." },
            ].map(({ name, desc }) => (
              <li key={name} className="flex items-start gap-3 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                <span className="text-gray-600">
                  <span className="font-medium text-gray-800">{name}</span> — {desc}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {[
          {
            term: "House Location",
            definition: "The geographic region where your Server House is deployed. Works the same as selecting a region in AWS, GCP, or other providers.",
          },
          {
            term: "House IP Block",
            definition: "The IP address range for your Server House network, defining the pool of IPs available for subnetting and resource assignment.",
          },
          {
            term: "Room Location",
            definition: "The specific availability zone within your House Location where your Server Room is deployed. Spreading rooms across zones builds resilience into your application.",
          },
        ].map(({ term, definition }) => (
          <div key={term} className="border border-gray-200 rounded-lg px-5 py-4 bg-white space-y-1">
            <p className="text-sm font-semibold text-gray-900">{term}</p>
            <p className="text-sm text-gray-600 leading-relaxed">{definition}</p>
          </div>
        ))}
      </div>
    </article>
  );
};

export default DocsTerminologies;

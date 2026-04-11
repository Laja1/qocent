import { useEffect, useRef, useState } from "react";

// Step images — place files in /public/docs/ with these exact names.
// No imports needed: public-folder assets are served by path at runtime.
const img = (name: string) => `/docs/${name}`;

const navLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Terminologies", href: "#terminologies" },
  { label: "Quick Start Guide", href: "#quick-start" },
  { label: "Creating a Server Site", href: "#server-site" },
  { label: "Creating a Server House", href: "#server-house" },
  { label: "Creating a Server Room", href: "#server-room" },
  { label: "Inviting Accounts", href: "#inviting-accounts" },
];


const Docs = () => {
  const [activeId, setActiveId] = useState<string>("overview");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));

    // Track which sections are currently visible and pick the topmost one
    const visible = new Set<string>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        });
        // Highlight the first visible section in document order
        const current = sectionIds.find((id) => visible.has(id));
        if (current) setActiveId(current);
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 gap-12">
      {/* Sidebar */}
      <aside className="hidden md:block w-60 flex-shrink-0">
        <nav className="sticky top-24">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
            On this page
          </p>
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const isActive = activeId === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`block text-sm px-3 py-1.5 rounded-md transition-colors ${
                      isActive
                        ? "bg-gray-100 text-black font-medium"
                        : "text-gray-500 hover:text-black hover:bg-gray-100"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 space-y-20">
        <section id="overview" className="space-y-10">
          <h2 className="text-2xl font-bold text-gray-900">Overview</h2>

          {/* What is Qocent */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">What is Qocent?</h3>
            <p className="text-gray-600 leading-relaxed">
              Qocent is a unified cloud management platform that enables you to deploy, manage,
              and optimize your infrastructure across cloud providers including AWS, GCP, Huawei
              Cloud, and more — all from a single, powerful console that delivers speed, savings,
              and simplicity.
            </p>
          </div>

          {/* Key Features */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">Key Features</h3>
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

          {/* Supported Cloud Providers */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">Supported Cloud Providers</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Qocent works seamlessly with industry-leading platforms to give you maximum
              flexibility. Currently supported:
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
                      provider.available ? "bg-green-500" : "bg-gray-300"
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

          {/* Core Value Propositions */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">Core Value Propositions</h3>
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

          {/* Mission & Vision */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2 border-l-2 border-red-500 pl-4">
              <h3 className="text-base font-semibold text-gray-800">Mission</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                To simplify access to cloud technology by delivering a user-friendly, affordable,
                multi-cloud, and reliable platform built on world-class infrastructure —
                empowering businesses of all sizes, especially in emerging markets, through
                transparent pricing, responsive support, and seamless digital experiences.
              </p>
            </div>
            <div className="space-y-2 border-l-2 border-gray-300 pl-4">
              <h3 className="text-base font-semibold text-gray-800">Vision</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                To become a global leader in cloud services by providing the most accessible,
                easy-to-use, multi-cloud, and cost-effective platform that helps organizations
                unlock the full potential of technology.
              </p>
            </div>
          </div>
        </section>

        <section id="terminologies" className="space-y-10">
          <h2 className="text-2xl font-bold text-gray-900">Terminologies</h2>
          <p className="text-gray-600 leading-relaxed">
            To help you get the most out of Qocent, here is a glossary of key terms you will
            encounter as you use the platform.
          </p>

          {/* Group: Infrastructure */}
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
              <div
                key={term}
                className="border border-gray-200 rounded-lg px-5 py-4 bg-white space-y-1"
              >
                <p className="text-sm font-semibold text-gray-900">{term}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{definition}</p>
              </div>
            ))}
          </div>

          {/* Group: Identifiers */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Identifiers
            </p>
            {[
              { term: "Site Code", definition: "A unique identifier for a Server Site." },
              { term: "House Code", definition: "A unique identifier for a Server House." },
              { term: "Room Code", definition: "A unique identifier for a Server Room." },
            ].map(({ term, definition }) => (
              <div
                key={term}
                className="border border-gray-200 rounded-lg px-5 py-4 bg-white space-y-1"
              >
                <p className="text-sm font-semibold text-gray-900">{term}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{definition}</p>
              </div>
            ))}
          </div>

          {/* Group: Configuration & Lifecycle */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Configuration &amp; Lifecycle
            </p>

            {/* Site Expiry Date */}
            <div className="border border-gray-200 rounded-lg px-5 py-4 bg-white space-y-1">
              <p className="text-sm font-semibold text-gray-900">Site Expiry Date</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                A user-defined date that marks the end of a Server Site's active lifecycle. Once
                reached, the configured Site EOL Action is automatically triggered.
              </p>
            </div>

            {/* Site EOL Action — with nested sub-options */}
            <div className="border border-gray-200 rounded-lg px-5 py-4 bg-white space-y-3">
              <p className="text-sm font-semibold text-gray-900">Site EOL Action</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Defines what happens to your Server Site after it expires. Options:
              </p>
              <ul className="space-y-2 pl-1">
                {[
                  {
                    name: "Rollover",
                    desc: "Extends the expiry date automatically, keeping the Server Site active for another cycle.",
                  },
                  {
                    name: "Suspend",
                    desc: "Pauses the site; resources remain intact but inactive until manually reactivated.",
                  },
                  {
                    name: "Email",
                    desc: "Sends an expiry notification to administrators without affecting the Server Site.",
                  },
                  {
                    name: "Lambda Trigger",
                    desc: "Executes a custom serverless function when expiration occurs — enabling automated workflows like data backups, resource cleanup, or external integrations.",
                  },
                  {
                    name: "Deactivate",
                    desc: "Permanently terminates the Server Site and deletes all resources.",
                  },
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

            {/* Remaining config terms */}
            {[
              {
                term: "House Location",
                definition:
                  "The geographic region where your Server House is deployed. Works the same as selecting a region in AWS, GCP, or other providers.",
              },
              {
                term: "House IP Block",
                definition:
                  "The IP address range for your Server House network, defining the pool of IPs available for subnetting and resource assignment.",
              },
              {
                term: "Room Location",
                definition:
                  "The specific availability zone within your House Location where your Server Room is deployed. Spreading rooms across zones builds resilience into your application.",
              },
            ].map(({ term, definition }) => (
              <div
                key={term}
                className="border border-gray-200 rounded-lg px-5 py-4 bg-white space-y-1"
              >
                <p className="text-sm font-semibold text-gray-900">{term}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{definition}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="quick-start" className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">Quick Start Guide</h2>
          <p className="text-gray-600 leading-relaxed">
            Welcome to Qocent. This guide walks you through creating your account and accessing
            the platform for the first time.
          </p>

          <ol className="relative space-y-0">
            {/* Step 1 */}
            <li className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">1</div>
                <div className="w-px flex-1 bg-gray-200 my-1" />
              </div>
              <div className="pb-8">
                <p className="text-sm font-semibold text-gray-900 mt-1.5 mb-1">Navigate to Sign-Up</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  From the Qocent website, click the Login button on the homepage. On the login page, click Sign Up to access the registration form. A Continue with Google option is also available.
                </p>
                <div className="flex flex-col gap-3 mt-3">
                  <img src={img("quickstart-step1-login-button.png")} alt="Login button on the Qocent homepage" className="rounded-lg border border-gray-200 w-full max-w-xl" />
                  <img src={img("quickstart-step1-signup-form.png")} alt="Sign Up link on the login page" className="rounded-lg border border-gray-200 w-full max-w-xl" />
                </div>
              </div>
            </li>

            {/* Step 2 */}
            <li className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">2</div>
                <div className="w-px flex-1 bg-gray-200 my-1" />
              </div>
              <div className="pb-8">
                <p className="text-sm font-semibold text-gray-900 mt-1.5 mb-1">Provide Registration Details</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Fill in your personal registration details in the form provided. Once all required fields are complete, click the Continue button to proceed.
                </p>
                <img src={img("quickstart-step2-registration-form.png")} alt="Registration form with personal details" className="mt-3 rounded-lg border border-gray-200 w-full max-w-xl" />
              </div>
            </li>

            {/* Step 3 */}
            <li className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">3</div>
                <div className="w-px flex-1 bg-gray-200 my-1" />
              </div>
              <div className="pb-8">
                <p className="text-sm font-semibold text-gray-900 mt-1.5 mb-1">Review Your Information</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Double-check that all your details are correct, then click the Create Account button to continue.
                </p>
                <img src={img("quickstart-step3-review-account.png")} alt="Review and submit registration details" className="mt-3 rounded-lg border border-gray-200 w-full max-w-xl" />
              </div>
            </li>

            {/* Step 4 */}
            <li className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">4</div>
                <div className="w-px flex-1 bg-gray-200 my-1" />
              </div>
              <div className="pb-8">
                <p className="text-sm font-semibold text-gray-900 mt-1.5 mb-1">Verify Your Email Address</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  You will be directed to the OTP verification screen. Check your email for the verification code, enter it in the field provided, and click Verify OTP to complete verification.
                </p>
                <img src={img("quickstart-step4-otp-verification.png")} alt="OTP verification screen" className="mt-3 rounded-lg border border-gray-200 w-full max-w-xl" />
              </div>
            </li>

            {/* Step 5 */}
            <li className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">5</div>
              </div>
              <div className="pb-0">
                <p className="text-sm font-semibold text-gray-900 mt-1.5 mb-1">Sign In to Qocent</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Once your email is verified, you will be redirected to the login page. Enter your email address and password to access your Qocent dashboard. You will now have full access to all platform features.
                </p>
                <div className="flex flex-col gap-3 mt-3">
                  <img src={img("quickstart-step5-login-screen.png")} alt="Sign in screen after email verification" className="rounded-lg border border-gray-200 w-full max-w-xl" />
                  <img src={img("quickstart-step5-dashboard.png")} alt="Qocent dashboard after signing in" className="rounded-lg border border-gray-200 w-full max-w-xl" />
                </div>
              </div>
            </li>
          </ol>
        </section>

        <section id="server-site" className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">Creating a Server Site</h2>
          <p className="text-gray-600 leading-relaxed">
            Follow these steps to create and deploy a Server Site within your chosen cloud
            provider workspace.
          </p>
          <ol className="relative space-y-0">
            {[
              {
                title: "Select a HyperScaler",
                description: "Navigate to the Workspaces section on your dashboard, then select the cloud provider you want to use.",
                image: img("server-site-step1-hyperscaler.png"),
                alt: "Workspaces section showing HyperScaler selection",
              },
              {
                title: "Navigate to Server Sites",
                description: "Under the Resource Control dropdown, select Server Sites.",
                image: img("server-site-step2-resource-control.png"),
                alt: "Resource Control dropdown with Server Sites selected",
              },
              {
                title: "Select Create New Site",
                description: "On the screen displayed, click the Create New Site button.",
                image: img("server-site-step3-create-button.png"),
                alt: "Server Sites screen with Create New Site button highlighted",
              },
              {
                title: "Provide Required Information",
                description: "Fill in the configuration details for the Server Site you are creating, then click Proceed.",
                image: img("server-site-step4-config-form.png"),
                alt: "Server Site configuration form",
              },
              {
                title: "Review the Information",
                description: "Confirm that all details are correct, then click the Deploy Now button.",
                image: img("server-site-step5-review.png"),
                alt: "Review screen with Deploy Now button",
              },
              {
                title: "Provisioning in Progress",
                description: "Qocent will now provision your Server Site. This process typically takes a few minutes to complete.",
                image: img("server-site-step6-provisioning.png"),
                alt: "Server Site provisioning in progress",
              },
            ].map((step, index, arr) => (
              <li key={step.title} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  {index < arr.length - 1 && <div className="w-px flex-1 bg-gray-200 my-1" />}
                </div>
                <div className={index === arr.length - 1 ? "pb-0" : "pb-8"}>
                  <p className="text-sm font-semibold text-gray-900 mt-1.5 mb-1">{step.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                  <img src={step.image} alt={step.alt} className="mt-3 rounded-lg border border-gray-200 w-full max-w-xl" />
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="server-house" className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">Creating a Server House</h2>
          <p className="text-gray-600 leading-relaxed">
            Follow these steps to create and deploy a Server House within an existing Server Site.
          </p>
          <ol className="relative space-y-0">
            {[
              {
                title: "Select a HyperScaler",
                description: "Navigate to the Workspaces section on your dashboard, then select the cloud provider you want to use.",
                image: img("server-house-step1-hyperscaler.png"),
                alt: "Workspaces section showing HyperScaler selection",
              },
              {
                title: "Navigate to Server Houses",
                description: "Under the Resource Control dropdown, select Server Houses.",
                image: img("server-house-step2-resource-control.png"),
                alt: "Resource Control dropdown with Server Houses selected",
              },
              {
                title: "Select Create New House",
                description: "On the screen displayed, click the Create New House button.",
                image: img("server-house-step3-create-button.png"),
                alt: "Server Houses screen with Create New House button highlighted",
              },
              {
                title: "Provide Required Information",
                description: "Fill in the configuration details for the Server House you are creating, then click Proceed.",
                image: img("server-house-step4-config-form.png"),
                alt: "Server House configuration form",
              },
              {
                title: "Review the Information",
                description: "Confirm that all details are correct, then click the Deploy Now button.",
                image: img("server-house-step5-review.png"),
                alt: "Review screen with Deploy Now button",
              },
              {
                title: "Provisioning in Progress",
                description: "Qocent will now provision your Server House. This process typically takes a few minutes to complete.",
                image: img("server-house-step6-provisioning.png"),
                alt: "Server House provisioning in progress",
              },
            ].map((step, index, arr) => (
              <li key={step.title} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  {index < arr.length - 1 && <div className="w-px flex-1 bg-gray-200 my-1" />}
                </div>
                <div className={index === arr.length - 1 ? "pb-0" : "pb-8"}>
                  <p className="text-sm font-semibold text-gray-900 mt-1.5 mb-1">{step.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                  <img src={step.image} alt={step.alt} className="mt-3 rounded-lg border border-gray-200 w-full max-w-xl" />
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="server-room" className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">Creating a Server Room</h2>
          <p className="text-gray-600 leading-relaxed">
            Follow these steps to create and deploy a Server Room within an existing Server House.
          </p>
          <ol className="relative space-y-0">
            {[
              {
                title: "Select a HyperScaler",
                description: "Navigate to the Workspaces section on your dashboard, then select the cloud provider you want to use.",
                image: img("server-room-step1-hyperscaler.png"),
                alt: "Workspaces section showing HyperScaler selection",
              },
              {
                title: "Navigate to Server Rooms",
                description: "Under the Resource Control dropdown, select Server Rooms.",
                image: img("server-room-step2-resource-control.png"),
                alt: "Resource Control dropdown with Server Rooms selected",
              },
              {
                title: "Select Create New Room",
                description: "On the screen displayed, click the Create New Room button.",
                image: img("server-room-step3-create-button.png"),
                alt: "Server Rooms screen with Create New Room button highlighted",
              },
              {
                title: "Provide Required Information",
                description: "Fill in the configuration details for the Server Room you are creating, then click Proceed.",
                image: img("server-room-step4-config-form.png"),
                alt: "Server Room configuration form",
              },
              {
                title: "Review the Information",
                description: "Confirm that all details are correct, then click the Deploy Now button.",
                image: img("server-room-step5-review.png"),
                alt: "Review screen with Deploy Now button",
              },
              {
                title: "Provisioning in Progress",
                description: "Qocent will now provision your Server Room. This process typically takes a few minutes to complete.",
                image: img("server-room-step6-provisioning.png"),
                alt: "Server Room provisioning in progress",
              },
            ].map((step, index, arr) => (
              <li key={step.title} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  {index < arr.length - 1 && <div className="w-px flex-1 bg-gray-200 my-1" />}
                </div>
                <div className={index === arr.length - 1 ? "pb-0" : "pb-8"}>
                  <p className="text-sm font-semibold text-gray-900 mt-1.5 mb-1">{step.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                  <img src={step.image} alt={step.alt} className="mt-3 rounded-lg border border-gray-200 w-full max-w-xl" />
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="inviting-accounts" className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">Inviting Accounts</h2>
          <p className="text-gray-600 leading-relaxed">
            Qocent allows you to invite other Qocent users — team members or clients — to view
            and monitor a specific Server Site. The invited person must already have their own
            Qocent account. They will receive an email invitation, and once they accept, they can
            see and monitor that site based on the role you assigned.
          </p>

          <ol className="relative space-y-0">
            {/* Step 1 */}
            <li className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div className="w-px flex-1 bg-gray-200 my-1" />
              </div>
              <div className="pb-8">
                <p className="text-sm font-semibold text-gray-900 mt-1.5 mb-1">Go to Your Server Site</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Log in to your Qocent account and navigate to your list of Server Sites. Find
                  the site you want to share, click the three dots (...) next to the site name,
                  and select <span className="font-medium text-gray-800">Invite to Site</span> from
                  the menu.
                </p>
                <div className="flex flex-col gap-3 mt-3">
                  <img src={img("invite-step1-three-dots-menu.png")} alt="Three dots menu next to a Server Site" className="rounded-lg border border-gray-200 w-full max-w-xl" />
                  <img src={img("invite-step1-invite-option.png")} alt="Invite to Site option in the dropdown menu" className="rounded-lg border border-gray-200 w-full max-w-xl" />
                </div>
              </div>
            </li>

            {/* Step 2 */}
            <li className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div className="w-px flex-1 bg-gray-200 my-1" />
              </div>
              <div className="pb-8">
                <p className="text-sm font-semibold text-gray-900 mt-1.5 mb-1">Enter the Invitation Details</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  A pop-up window titled <span className="font-medium text-gray-800">Invite to Workspace</span> will
                  appear. Enter the email address of the person you want to invite — this must be
                  the email they used to create their Qocent account. In the Role dropdown, choose
                  their access level: <span className="font-medium text-gray-800">Member</span> (can
                  view and interact) or <span className="font-medium text-gray-800">Viewer</span> (read-only).
                  Click Invite to send. You will see a green confirmation message: "Invitation
                  created and sent successfully."
                </p>
                <div className="flex flex-col gap-3 mt-3">
                  <img src={img("invite-step2-invite-popup.png")} alt="Invite to Workspace popup with email and role fields" className="rounded-lg border border-gray-200 w-full max-w-xl" />
                  <img src={img("invite-step2-success-message.png")} alt="Green success message after invitation is sent" className="rounded-lg border border-gray-200 w-full max-w-xl" />
                </div>
              </div>
            </li>

            {/* Step 3 */}
            <li className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div className="w-px flex-1 bg-gray-200 my-1" />
              </div>
              <div className="pb-8">
                <p className="text-sm font-semibold text-gray-900 mt-1.5 mb-1">What the Invitee Receives</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  The invited person will receive an email showing who invited them, the site name,
                  and the assigned role. The email contains an{" "}
                  <span className="font-medium text-gray-800">Accept Invitation</span> button. The
                  invitation expires in 72 hours. When they click Accept Invitation, they are taken
                  to a Qocent page that explains what they will have access to. They must click the
                  green <span className="font-medium text-gray-800">Accept Invitation</span> button
                  on that page to confirm.
                </p>
                <div className="flex flex-col gap-3 mt-3">
                  <img src={img("invite-step3-email.png")} alt="Invitation email received by the invitee" className="rounded-lg border border-gray-200 w-full max-w-xl" />
                  <img src={img("invite-step3-accept-page.png")} alt="Qocent accept invitation confirmation page" className="rounded-lg border border-gray-200 w-full max-w-xl" />
                </div>
              </div>
            </li>

            {/* Step 4 */}
            <li className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">
                  4
                </div>
              </div>
              <div className="pb-0">
                <p className="text-sm font-semibold text-gray-900 mt-1.5 mb-1">After Accepting</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Once they accept, they will see a success message: "Invitation accepted
                  successfully. You now have access to the account." The shared Server Site will
                  immediately appear on their dashboard, and they can begin monitoring it based on
                  the role assigned.
                </p>
                <img src={img("invite-step4-success-dashboard.png")} alt="Dashboard showing the newly shared Server Site after accepting" className="mt-3 rounded-lg border border-gray-200 w-full max-w-xl" />
              </div>
            </li>
          </ol>
        </section>

      </main>
    </div>
  );
};

export default Docs;

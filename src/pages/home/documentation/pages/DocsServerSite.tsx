import { StepList } from "./DocsSteps";

const img = (name: string) => `/docs/${name}`;

const steps = [
  { title: "Select a HyperScaler", description: "Navigate to the Workspaces section on your dashboard, then select the cloud provider you want to use.", image: img("server-site-step1-hyperscaler.png"), alt: "Workspaces section showing HyperScaler selection" },
  { title: "Navigate to Server Sites", description: "Under the Resource Control dropdown, select Server Sites.", image: img("server-site-step2-resource-control.png"), alt: "Resource Control dropdown with Server Sites selected" },
  { title: "Select Create New Site", description: "On the screen displayed, click the Create New Site button.", image: img("server-site-step3-create-button.png"), alt: "Server Sites screen with Create New Site button highlighted" },
  { title: "Provide Required Information", description: "Fill in the configuration details for the Server Site you are creating, then click Proceed.", image: img("server-site-step4-config-form.png"), alt: "Server Site configuration form" },
  { title: "Review the Information", description: "Confirm that all details are correct, then click the Deploy Now button.", image: img("server-site-step5-review.png"), alt: "Review screen with Deploy Now button" },
  { title: "Provisioning in Progress", description: "Qocent will now provision your Server Site. This process typically takes a few minutes to complete.", image: img("server-site-step6-provisioning.png"), alt: "Server Site provisioning in progress" },
];

const DocsServerSite = () => (
  <article className="space-y-8">
    <h1 className="text-3xl font-bold text-gray-900">Creating a Server Site</h1>
    <p className="text-gray-600 leading-relaxed">
      Follow these steps to create and deploy a Server Site within your chosen cloud provider
      workspace.
    </p>
    <StepList steps={steps} />
  </article>
);

export default DocsServerSite;

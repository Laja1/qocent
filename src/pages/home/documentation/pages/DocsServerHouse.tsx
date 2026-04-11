import { StepList } from "./DocsSteps";

const img = (name: string) => `/docs/${name}`;

const steps = [
  { title: "Select a HyperScaler", description: "Navigate to the Workspaces section on your dashboard, then select the cloud provider you want to use.", image: img("server-house-step1-hyperscaler.png"), alt: "Workspaces section showing HyperScaler selection" },
  { title: "Navigate to Server Houses", description: "Under the Resource Control dropdown, select Server Houses.", image: img("server-house-step2-resource-control.png"), alt: "Resource Control dropdown with Server Houses selected" },
  { title: "Select Create New House", description: "On the screen displayed, click the Create New House button.", image: img("server-house-step3-create-button.png"), alt: "Server Houses screen with Create New House button highlighted" },
  { title: "Provide Required Information", description: "Fill in the configuration details for the Server House you are creating, then click Proceed.", image: img("server-house-step4-config-form.png"), alt: "Server House configuration form" },
  { title: "Review the Information", description: "Confirm that all details are correct, then click the Deploy Now button.", image: img("server-house-step5-review.png"), alt: "Review screen with Deploy Now button" },
  { title: "Provisioning in Progress", description: "Qocent will now provision your Server House. This process typically takes a few minutes to complete.", image: img("server-house-step6-provisioning.png"), alt: "Server House provisioning in progress" },
];

const DocsServerHouse = () => (
  <article className="space-y-8">
    <h1 className="text-3xl font-bold text-gray-900">Creating a Server House</h1>
    <p className="text-gray-600 leading-relaxed">
      Follow these steps to create and deploy a Server House within an existing Server Site.
    </p>
    <StepList steps={steps} />
  </article>
);

export default DocsServerHouse;

import { StepList } from "./DocsSteps";

const img = (name: string) => `/docs/${name}`;

const steps = [
  { title: "Select a HyperScaler", description: "Navigate to the Workspaces section on your dashboard, then select the cloud provider you want to use.", image: img("server-room-step1-hyperscaler.png"), alt: "Workspaces section showing HyperScaler selection" },
  { title: "Navigate to Server Rooms", description: "Under the Resource Control dropdown, select Server Rooms.", image: img("server-room-step2-resource-control.png"), alt: "Resource Control dropdown with Server Rooms selected" },
  { title: "Select Create New Room", description: "On the screen displayed, click the Create New Room button.", image: img("server-room-step3-create-button.png"), alt: "Server Rooms screen with Create New Room button highlighted" },
  { title: "Provide Required Information", description: "Fill in the configuration details for the Server Room you are creating, then click Proceed.", image: img("server-room-step4-config-form.png"), alt: "Server Room configuration form" },
  { title: "Review the Information", description: "Confirm that all details are correct, then click the Deploy Now button.", image: img("server-room-step5-review.png"), alt: "Review screen with Deploy Now button" },
  { title: "Provisioning in Progress", description: "Qocent will now provision your Server Room. This process typically takes a few minutes to complete.", image: img("server-room-step6-provisioning.png"), alt: "Server Room provisioning in progress" },
];

const DocsServerRoom = () => (
  <article className="space-y-8">
    <h1 className="text-3xl font-bold text-gray-900">Creating a Server Room</h1>
    <p className="text-gray-600 leading-relaxed">
      Follow these steps to create and deploy a Server Room within an existing Server House.
    </p>
    <StepList steps={steps} />
  </article>
);

export default DocsServerRoom;

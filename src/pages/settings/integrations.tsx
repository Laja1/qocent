import { Button } from "@/components/shared";
import { ArrowRight, Github } from "lucide-react";

export const Integrations=() =>{
//   const authGithub = () => {
//     window.location.href = `https://3gtiecsm6jguvxl777ino6jdqa0vftld.lambda-url.us-east-1.on.aws/auth/github/login`;
//   };
  const repositoryProviders = [
    {
      name: "GitHub",
      description:
        "Connect your GitHub repositories to get started with your projects",
      icon: Github,
      color: "bg-gray-900 hover:bg-gray-800",
      iconColor: "text-white",
    },
    // {
    //   name: "GitLab",
    //   description:
    //     "Import your GitLab projects and continue your development workflow",
    //   icon: Gitlab,
    //   color: "bg-orange-600 hover:bg-orange-700",
    //   iconColor: "text-white",
    // },
    // {
    //   name: "Bitbucket",
    //   description: "Seamlessly integrate with your Bitbucket repositories",
    //   icon: GitBranch,
    //   color: "bg-blue-600 hover:bg-blue-700",
    //   iconColor: "text-white",
    // },
  ];

  return (
    <div>
      <section className="app-content-dashboard">
        <div className="py-2 mx-auto">
          <div className="mb-8">
            <h1
              
              className="font-bold text-sm text-gray-900 mb-2"
            >
              Connect Your Code Repository
            </h1>
            <p className="text-gray-600 text-xs">
              Choose your preferred Git provider to import your existing
              projects or start fresh
            </p>
          </div>

          <div
           
            className=" gap-6  flex-row"
          >
            {repositoryProviders.map((provider) => (
              <div
                key={provider.name}
                className={`border rounded-xl p-5 w-[310px]  bg-white transition-all duration-200 `}
              >
                <div
                  style={{ display: "flex" }}
                  className="text-center items-center justify-center my-2  flex-col pb-4"
                >
                  <div className="inline-flex w-16 h-16 mb-4 rounded-full bg-gray-50 items-center justify-center">
                    <provider.icon size={32} className="text-gray-700" />
                  </div>

                  <div
                    className="text-lg font-semibold text-gray-900"
                  >
                    {provider.name}
                  </div>
                  <p
                    className="text-gray-600 text-xs leading-relaxed"
                  >
                    {provider.description}
                  </p>
                </div>

                <div className="justify-end flex w-full">
                    <Button
                  type="submit"
                  label="Connect"
                  className="w-full"
                  surfixIcon={<ArrowRight className="size-4"/>}
                  // loading={workspaceState.loading}
                  value={`Connect to ${provider.name}`}
                />
                    </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

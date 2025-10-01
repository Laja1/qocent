import type React from "react";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Server, Database, Layers, Network } from "lucide-react";
import { ModalConstant } from "@/components/shared/modal/register";
import NiceModal from "@ebay/nice-modal-react";
import { Header } from "@/components/shared/header";

type TierType = 1 | 2 | 3;

interface StarterPack {
  id: TierType;
  title: string;
  description: string;
  components: string[];
  icon: React.ReactNode;
  recommended?: boolean;
}

const starterPacks: StarterPack[] = [
  {
    id: 1,
    title: "1-Tier Architecture",
    description: "Simple single-server deployment for basic applications",
    components: ["Server House", "Server Room", "Server"],
    icon: <Server className="h-8 w-8" />,
  },
  {
    id: 2,
    title: "2-Tier Architecture",
    description: "Separate web and application layers for better scalability",
    components: ["Server House", "Server Room", "Web Server", "App Server"],
    icon: <Layers className="h-8 w-8" />,
    recommended: true,
  },
  {
    id: 3,
    title: "3-Tier Architecture",
    description: "Full-stack deployment with dedicated database layer",
    components: [
      "Server House",
      "Server Room",
      "Web Server",
      "App Server",
      "Database",
    ],
    icon: <Database className="h-8 w-8" />,
  },
];

export const StarterPacksGrid = () => {
  const handleTierSelect = (tier: TierType) => {
    NiceModal.show(ModalConstant.DeploymentDialog, { tier });
  };

  return (
    <>
      <Header
        title="Starter Packs"
        description="Choose a starter pack to get started"
      />

      <div className="grid gap-6 px-5 md:grid-cols-2 lg:grid-cols-3 mt-10 ">
        {starterPacks.map((pack) => (
          <div
            key={pack.id}
            className="group border p-3 hover:bg-[#fee2e2] rounded-md relative cursor-pointer transition-all hover:shadow-lg px-5  hover:border-[#fee2e2]"
            onClick={() => handleTierSelect(pack.id)}
          >
            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-[#fee2e2]">
                  {pack.icon}
                </div>
              </div>
              <CardTitle className="text-xl">{pack.title}</CardTitle>
              <CardDescription className="text-sm">
                {pack.description}
              </CardDescription>
            </div>
            <CardContent>
              <div className="space-y-3">
                <div className="flex my-2 items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Network className="h-4 w-4" />
                  <span>Includes:</span>
                </div>
                <ul className="space-y-2">
                  {pack.components.map((component, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-foreground text-xs">
                        {component}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </div>
        ))}
      </div>
    </>
  );
};
export default StarterPacksGrid;

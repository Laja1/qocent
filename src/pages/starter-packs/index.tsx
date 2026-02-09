import React, { useState } from "react";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Server, Database, Layers, ChevronRight } from "lucide-react";
import { ModalConstant } from "@/components/shared/modal/register";
import NiceModal from "@ebay/nice-modal-react";
import { Header } from "@/components/shared/header";
import { Button, Tabs } from "@/components/shared";
import { imgLinks } from "@/assets/assetLink";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

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
    icon: <Server className="size-4" />,
  },
  {
    id: 2,
    title: "2-Tier Architecture",
    description: "Separate web and application layers for better scalability",
    components: ["Server House", "Server Room", "Web Server", "App Server"],
    icon: <Layers className="size-4" />,
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
    icon: <Database className="size-4" />,
  },
];

export const StarterPacksGrid = () => {
  const [selectedPack, setSelectedPack] = useState<StarterPack | null>(null);
  const provider = useSelector((state: RootState) => state.dashboard.provider);
  const tierImages: Record<TierType, string> = {
    1: provider === "aws" ? imgLinks.awstier1 : imgLinks.huaweitier1,
    2: provider === "aws" ? imgLinks.awstier2 : imgLinks.huaweitier2,
    3: provider === "aws" ? imgLinks.awstier3 : imgLinks.huaweitier3,
  };
  const tabData =
    selectedPack !== null
      ? [
          {
            id: selectedPack.id,
            text: "Diagram",
            component: (
              <div className="flex px-10 pb-10 flex-col">
                <div className="justify-end items-end w-full flex">
                  <Button
                    label="Deploy"
                    surfixIcon={<ChevronRight size={18} />}
                    onClick={() =>
                      NiceModal.show(ModalConstant.DeploymentDialog, {
                        tier: selectedPack.id,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <img
                    src={tierImages[selectedPack.id] || imgLinks.awstier1}
                    className="rounded-sm"
                    alt={`${selectedPack.title} diagram`}
                  />
                </div>
              </div>
            ),
          },
        ]
      : [];

  return (
    <>
      <Header
        title="Starter Packs"
        description="Choose a starter pack to get started"
      />

      <div className="grid gap-3 px-5 md:grid-cols-2 lg:grid-cols-3 mt-10">
        {starterPacks.map((pack) => (
          <div
            key={pack.id}
            className={`group border p-3 rounded-md relative cursor-pointer transition-all hover:shadow-lg px-5 
              ${
                selectedPack?.id === pack.id
                  ? "border-red-400 bg-[#fee2e2]/50"
                  : "hover:bg-[#fee2e2]"
              }`}
            onClick={() => setSelectedPack(pack)}
          >
            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-[#fee2e2]">
                  {pack.icon}
                </div>
              </div>
              <CardTitle className="text-lg">{pack.title}</CardTitle>
              <CardDescription className="text-xs">
                {pack.description}
              </CardDescription>
            </div>
          </div>
        ))}
      </div>

      {selectedPack && (
        <div className="mx-5 mt-5 transition-all">
          <Tabs key={selectedPack.id} tabs={tabData} />
        </div>
      )}
    </>
  );
};

export default StarterPacksGrid;

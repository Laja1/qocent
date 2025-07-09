import { Button, Header, Tabs } from "@/components/shared";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { SiteLevel } from "../architectural-room/site-level";
import { AlertBox } from "@/components/shared/alerts";

import { Link } from "react-router-dom";
import { Profile } from "./profile";
import { sitesData } from "@/utilities/constants/config";

export const Settings = () => {
  const [showAlert, setShowAlert] = useState(true);

  const tabData = [
    {
      id: 1,
      text: "Profile",
      component: (
        <div className="flex w-full">
          <Profile />
        </div>
      ),
    },
    {
      id: 2,
      text: "Security",
      component: <div className=""></div>,
    },
    {
      id: 3,
      text: "Integrations",
      component: <SiteLevel sitesData={sitesData}/>,
    },
  ];

  return (
    <div className=" h-full mt-5 w-full">
      <Header title="Server Sites" description="Manage your server site">
        <Link to="/create-new-site">
          <Button
            intent="tertiary"
            label="Create New Site"
            prefixIcon={<PlusIcon className="size-4" />}
            size="small"
          />
        </Link>
      </Header>

      <div className="px-5 w-full">
        <Tabs tabs={tabData} />
      </div>

      <div className="flex gap-4  flex-col overflow-y-hidden h-full">
      
        <div className="mx-5 mt-5 "></div>
        <div className="mx-5 mb-20">
          {showAlert && (
            <AlertBox
              variant="default"
              title="AWS Notice"
              description="Server Room Provisioning in progress"
              onClose={() => setShowAlert(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

import { Header, Tabs } from "@/components/shared";
import { Profile } from "./profile";
import { Integrations } from "./integrations";
import { Security } from "./secuirty";
import { Payment } from "./payment";

export const Settings = () => {
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
      component: <div className=""><Security /></div>,
    },
    {
      id: 3,
      text: "Integrations",
      component: <Integrations />,
    },
    {
      id:4,
      text: "Payment Method",
      component: <Payment />,
    },
  ];

  return (
    <div className=" h-full mt-5 w-full">
      <Header
        title="Settings"
        description="Manage your settings and preferences"
      >
        
      </Header>

      <div className="px-5 w-full">
        <Tabs tabs={tabData} />
      </div>
    </div>
  );
};

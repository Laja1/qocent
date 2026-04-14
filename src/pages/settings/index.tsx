import { Header, Tabs } from "@/components/shared";
import { Profile } from "./profile";
import { Security } from "./secuirty";
import { Payment } from "./payment";
import { Subscription } from "./subscription";

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
      text: "Payment Method",
      component: <Payment />,
    },
    {
      id: 4,
      text: "Subscription",
      component: <Subscription />,
    },
  ];

  return (
    <div className="h-full w-full pb-6">
      <Header
        title="Settings"
        description="Manage your settings and preferences"
      />

      <div className="px-5 w-full">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <Tabs tabs={tabData} />
        </div>
      </div>
    </div>
  );
};

import { useState, type ReactElement } from "react";

type TabItem = {
  id: number;
  text: string;
  component: ReactElement;
};

type TabsProps = {
  tabs: TabItem[];
};

export const Tabs = ({ tabs }: TabsProps) => {
  const [currentTab, setCurrentTab] = useState(tabs[0]?.id || 0);

  const activeTab = tabs.find((tab) => tab.id === currentTab);

  return (
    <div>
      <div className="flex flex-wrap gap-2 rounded-2xl border border-border bg-card p-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id)}
            className={`rounded-xl px-4 py-2 hover:cursor-pointer transition duration-200 ease-in-out text-sm font-medium ${
              currentTab === tab.id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {tab.text}
          </button>
        ))}
      </div>

      <div className="mt-4">{activeTab?.component}</div>
    </div>
  );
};

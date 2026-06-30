import { useState, type ReactElement } from "react";

type TabItem = {
  id: number;
  text: string;
  component: ReactElement;
};

type TabsProps = {
  tabs: TabItem[];
  activeTab?: number;
  onTabChange?: (tabId: number) => void;
};

export const Tabs = ({ tabs, activeTab, onTabChange }: TabsProps) => {
  const [internalTab, setInternalTab] = useState(tabs[0]?.id || 0);
  const currentTab = activeTab ?? internalTab;

  const setCurrentTab = (tabId: number) => {
    onTabChange?.(tabId);
    if (activeTab === undefined) {
      setInternalTab(tabId);
    }
  };

  const activeTabContent = tabs.find((tab) => tab.id === currentTab);

  return (
    <div>
      <div className="flex w-fit flex-wrap gap-1 rounded-lg border border-border bg-card p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setCurrentTab(tab.id)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition duration-200 ease-in-out hover:cursor-pointer ${
              currentTab === tab.id
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {tab.text}
          </button>
        ))}
      </div>

      <div className="mt-4">{activeTabContent?.component}</div>
    </div>
  );
};

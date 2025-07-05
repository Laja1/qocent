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
      <div className="flex  gap-3 lg:gap-7 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id)}
            className={`relative pb-2  hover:cursor-pointer transition duration-200 ease-in-out text-sm font-medium ${
              currentTab === tab.id ? "text-red-600" : "text-gray-500"
            }`}
          >
            {tab.text}
            {currentTab === tab.id && (
              <span className="absolute left-0 bottom-0 w-10  h-0.5 bg-red-600  rounded"></span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-2">{activeTab?.component}</div>
    </div>
  );
};

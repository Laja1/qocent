import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import clsx from "clsx";
type FlexibleTabsProps = {
    tabs: { label: string; value: string }[];
    defaultValue?: string;
    className?: string;
    children: (value: string) => React.ReactNode;
  };
  

  export const FlexibleTabs = ({ tabs, defaultValue, className, children }: FlexibleTabsProps) => {
    const defaultTab = defaultValue || tabs[0]?.value;
    const flexibleTabStyle = clsx(
        'w-full ',className
    )
    return (
      <Tabs   defaultValue={defaultTab} className={flexibleTabStyle}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {children(tab.value)}
          </TabsContent>
        ))}
      </Tabs>
    );
  };
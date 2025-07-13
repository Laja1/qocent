import { TopBanner } from "@/components/shared";
import { Bot } from "lucide-react";
import { useState } from "react";
import {
  NotificationDropdown,
  type Notification,
} from "@/components/shared/notification";
import { AdsOverviewContainer } from "@/components/not-shared/console-card";
import { LatestChanges } from "./latest-changes";
import { ConsoleChart } from "./console-chart";
import { Monitoring } from "./monitoring";
import { ConsoleBot } from "./console-bot";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { IconLayoutDashboard } from "@tabler/icons-react";
import { ConsoleLeft } from "./console-left";

export const Console = () => {
  const user = useSelector((state: RootState) => state.auth);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "success",
      title: "Deployment Successful",
      message: "Your application has been deployed successfully to production.",
      timestamp: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "warning",
      title: "High CPU Usage",
      message:
        "Server instance i-1234567890abcdef0 is experiencing high CPU usage (85%).",
      timestamp: "15 minutes ago",
      read: false,
    },
    {
      id: 3,
      type: "info",
      title: "Scheduled Maintenance",
      message: "Maintenance window scheduled for tonight at 2:00 AM UTC.",
      timestamp: "1 hour ago",
      read: true,
    },
    {
      id: 4,
      type: "error",
      title: "Database Connection Failed",
      message:
        "Unable to connect to database cluster. Please check your connection.",
      timestamp: "3 hours ago",
      read: false,
    },
  ]);

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const handleDeleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleViewAll = () => {
    // Navigate to notifications page or open modal
    console.log("View all notifications");
  };



  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Top Header */}
      <header className="bg-stone-900 w-full text-white px-2 py-2 fixed top-0 z-20">
        <div className="flex justify-between">
          <div className="flex items-center">
            <IconLayoutDashboard className="size-4" /> Dashboard
          </div>
          <div className="flex items-center gap-2">
            <NotificationDropdown
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
              onDeleteNotification={handleDeleteNotification}
              onClearAll={handleClearAll}
              onViewAll={handleViewAll}
            />
            <p className="text-xs">
              {user?.userFirstName} {user?.userLastName}
            </p>
          </div>
        </div>
      </header>

      {/* Layout */}
      <div className="flex mt-12 h-[calc(100vh-3rem)]">
        <aside className="w-1/7 h-full bg-white border-r z-10">
          <ConsoleLeft />
        </aside>

        <main className=" w-6/7 h-full scrollbar-hide overflow-y-auto px-4 pb-20">
          <div className="my-2">
            <TopBanner />
          </div>

          <div className="grid grid-cols-[3.5fr_1fr] gap-10">
            <div className="space-y-3 flex flex-col">
              <AdsOverviewContainer />
              <ConsoleBot />
              <ConsoleChart />
            </div>
            <div className="space-y-4">
              <LatestChanges />
              <Monitoring />
            </div>
          </div>

          {/* Floating Bot Button */}
          <div className="fixed bottom-10 right-5 z-30">
            <div className="bg-green-900 inline-flex rounded-sm p-2 shadow-lg">
              <Bot className="text-white" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

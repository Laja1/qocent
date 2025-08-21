import { TopBanner } from "@/components/shared";
import { Bot, Menu, Server, Shield, TrendingUp, X } from "lucide-react";
import { useState } from "react";
import {
  NotificationDropdown,
  type Notification,
} from "@/components/shared/notification";
import { LatestChanges } from "./latest-changes";
import { ConsoleChart } from "./console-chart";
import { Monitoring } from "./monitoring";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { IconLayoutDashboard } from "@tabler/icons-react";
import { ConsoleLeft } from "./console-left";
import { AlertBox } from "@/components/shared/alerts";
import { MetricCard } from "@/components/not-shared/metric-card";

export const Console = () => {
  const user = useSelector((state: RootState) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

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
    console.log("View all notifications");
  };

  const initials = `${user?.userFirstName?.[0] ?? ""}${
    user?.userLastName?.[0] ?? ""
  }`.toUpperCase();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const metrics = [
    {
      title: "Total Instances",
      value: 24,
      change: "+12%",
      changeType: "positive" as const,
      icon: Server,
      description: "across all providers",
      trend: [40, 50, 35, 60, 55, 70, 65],
    },

    {
      title: "Revenue",
      value: "$12,847",
      change: "+23%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "this month",
      trend: [100, 120, 110, 130, 140, 135, 150],
    },
    {
      title: "Security Score",
      value: "98%",
      change: "+2%",
      changeType: "positive" as const,
      icon: Shield,
      description: "compliance rate",
      trend: [90, 92, 95, 94, 96, 97, 98],
    },
  ];
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-50 dark:bg-black">
      {/* Top Header */}
      <header className="bg-black border-b w-full text-white px-4 py-2 fixed top-0 z-10 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-1 hover:bg-gray-800 rounded-md transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="size-5" />
            </button>

            <div className="flex items-center gap-2">
              <IconLayoutDashboard className="size-5" />
              <span className="font-semibold">Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <NotificationDropdown
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
              onDeleteNotification={handleDeleteNotification}
              onClearAll={handleClearAll}
              onViewAll={handleViewAll}
            />

            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white text-gray-900 flex items-center justify-center text-xs font-semibold shadow-sm">
                {initials}
              </div>

              <div className="hidden sm:block">
                <p className="text-xs font-medium">
                  {user?.userFirstName} {user?.userLastName}
                </p>
                <p className="text-xs text-gray-300">{user?.userEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 mt-16"
          onClick={toggleSidebar}
        />
      )}

      {/* Layout */}
      <div className="flex pt-16 h-screen">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:relative top-16 lg:top-0 left-0 h-full w-80 lg:w-1/5 xl:w-1/6 
            bg-white border-r border-gray-200 dark:border-gray-800 z-40 transform transition-transform duration-300 ease-in-out
            ${
              isSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
        >
          {/* Mobile Close Button */}
          <div className="lg:hidden flex justify-end p-4 border-b border-gray-200">
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Close sidebar"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="h-full">
            <ConsoleLeft />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 h-full overflow-hidden">
          <div className="h-full overflow-y-auto scrollbar-hide">
            <div className="px-4  max-w-8xl mx-auto">
              {/* Top Banner */}
              <TopBanner />

              {/* Content Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-[3fr_1fr] gap-6">
                {/* Main Content Column */}
                <div className="space-y-6">
                  {/* <AdsOverviewContainer /> */}
                  {/* <ConsoleBot /> */}

                  {/* Chart Section - Stack on mobile */}
                  <div className="block">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-4 gap-6">
                      {metrics.map((metric, index) => (
                        <MetricCard key={index} {...metric} />
                      ))}
                    </div>
                    <ConsoleChart />

                    <div className=" my-5">
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

                {/* Sidebar Content Column */}
                <div className="space-y-6">
                  <LatestChanges />
                  <Monitoring />
                </div>
              </div>

              {/* Bottom Spacing for Mobile */}
              <div className="h-20 lg:h-8"></div>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Bot Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          className="bg-green-600 hover:bg-green-700 p-3 rounded-full shadow-lg hover:shadow-xl 
                     transition-all duration-200 transform hover:scale-105 active:scale-95"
          aria-label="Open AI Assistant"
        >
          <Bot className="text-white size-6" />
        </button>
      </div>
    </div>
  );
};
